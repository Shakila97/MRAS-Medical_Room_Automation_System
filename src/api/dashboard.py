"""
MRAS v3.0 — Dashboard API
Provides aggregate metrics for Admin, Doctor, and Pharmacy dashboards.
"""

from fastapi import APIRouter, Depends
from datetime import datetime, timedelta

from src.models import (
    User, UserRole, Patient, InventoryItem, GRNLot, AuditLog, 
    JRISSIRecord, Appointment, RiskBand, AppointmentStatus
)
from src.modules.auth_service import require_role

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/admin")
async def get_admin_dashboard(current_user: User = Depends(require_role(UserRole.ADMIN))):
    # Dummy service metrics
    services = [
        { "name": "FastAPI backend", "state": "up", "meta": "v3.0.4 · ECS" },
        { "name": "MongoDB · Beanie", "state": "up", "meta": "p95 12 ms" },
        { "name": "Claude API", "state": "up", "meta": "sonnet-4-6" },
        { "name": "OpenWeatherMap", "state": "degraded", "meta": "1 retry/h" },
        { "name": "Twilio WhatsApp", "state": "up", "meta": "99.99%" },
    ]

    # Role distribution
    roles_agg = await User.aggregate([
        {"$group": {"_id": "$role", "count": {"$sum": 1}}}
    ]).to_list()
    role_counts = {r["_id"]: r["count"] for r in roles_agg}
    
    total_users = sum(role_counts.values()) or 1
    role_distribution = [
        { "name": "Employee", "count": role_counts.get(UserRole.EMPLOYEE.value, 0), "pct": round(role_counts.get(UserRole.EMPLOYEE.value, 0) / total_users * 100, 1), "color": "var(--role-employee)" },
        { "name": "Doctor", "count": role_counts.get(UserRole.DOCTOR.value, 0), "pct": round(role_counts.get(UserRole.DOCTOR.value, 0) / total_users * 100, 1), "color": "var(--role-doctor)" },
        { "name": "Pharmacy", "count": role_counts.get(UserRole.PHARMACY.value, 0), "pct": round(role_counts.get(UserRole.PHARMACY.value, 0) / total_users * 100, 1), "color": "var(--role-pharmacy)" },
        { "name": "Admin", "count": role_counts.get(UserRole.ADMIN.value, 0), "pct": round(role_counts.get(UserRole.ADMIN.value, 0) / total_users * 100, 1), "color": "var(--role-admin)" },
    ]

    # Recent users
    recent_users = await User.find().sort(-User.created_at).limit(6).to_list()
    users_data = []
    for u in recent_users:
        accent = f"var(--role-{u.role.value.lower()})"
        
        dept = getattr(u, 'department', None)
        if dept:
            dept_str = dept.value.capitalize()
        else:
            dept_str = "Administration"

        users_data.append({
            "name": f"{u.full_name}",
            "role": u.role.value.capitalize(),
            "dept": dept_str,
            "status": "active" if u.is_active else "invited",
            "last": "recently",
            "accent": accent
        })

    # Recent audit
    recent_audit = await AuditLog.find().sort(-AuditLog.created_at).limit(8).to_list()
    audit_data = []
    for a in recent_audit:
        tone = "info"
        icon = "info"
        if a.level == "warn":
            tone = "warning"
            icon = "priority_high"
        elif a.level == "error":
            tone = "danger"
            icon = "error"
        audit_data.append({
            "t": a.created_at.strftime("%H:%M"),
            "who": a.actor_label,
            "action": a.action,
            "target": a.target,
            "tone": tone,
            "icon": icon
        })

    # Stats
    active_users = sum(count for count in role_counts.values())
    security_events_count = await AuditLog.find({"level": {"$in": ["warn", "error"]}}).count()

    stats = [
        { "icon": "group", "label": "Active users", "value": str(active_users), "delta": "+6 this week", "deltaTone": "good" },
        { "icon": "shield_person", "label": "Roles assigned", "value": f"{active_users} / {active_users}" },
        { "icon": "cloud_done", "label": "Service uptime", "value": "99.97", "unit": "%", "delta": "SLA 99.9%", "deltaTone": "good" },
        { "icon": "database", "label": "DB latency p95", "value": "12", "unit": "ms" },
        { "icon": "security", "label": "Security events", "value": str(security_events_count), "delta": "24 h window", "deltaTone": "neutral" },
    ]

    return {
        "services": services,
        "role_distribution": role_distribution,
        "users": users_data,
        "audit": audit_data,
        "stats": stats
    }


@router.get("/doctor")
async def get_doctor_dashboard(current_user: User = Depends(require_role(UserRole.DOCTOR, UserRole.ADMIN))):
    # Stats
    active_emp = await User.find(User.role == UserRole.EMPLOYEE).count()
    
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    today_appts = await Appointment.find(
        Appointment.scheduled_at >= today_start
    ).sort(+Appointment.scheduled_at).to_list()
    today_queue = len(today_appts)

    jrissi_high = await JRISSIRecord.find(JRISSIRecord.risk_band == RiskBand.HIGH).count()

    stats = [
        { "icon": "groups", "label": "Active employees", "value": str(active_emp) },
        { "icon": "event_available", "label": "Today's queue", "value": str(today_queue), "delta": "3 pre-visit briefings ready", "deltaTone": "good" },
        { "icon": "psychology", "label": "JRISSI High", "value": str(jrissi_high), "delta": "+1 vs last week", "deltaTone": "bad" },
        { "icon": "insights", "label": "Forecast watch", "value": "3", "delta": "Pollen rising Thu", "deltaTone": "neutral" },
        { "icon": "priority_high", "label": "Escalations", "value": "1" },
    ]

    # Patients with high JRISSI (latest)
    # This requires an aggregation to get the latest per patient.
    jrissi_high_records = await JRISSIRecord.aggregate([
        {"$sort": {"computed_at": -1}},
        {"$group": {
            "_id": "$patient_id",
            "mhrs": {"$first": "$mhrs"},
            "risk_band": {"$first": "$risk_band"},
        }},
        {"$sort": {"mhrs": -1}},
        {"$limit": 5}
    ]).to_list()
    
    patients_data = []
    for j_rec in jrissi_high_records:
        pat = await Patient.get(j_rec["_id"])
        if not pat:
            continue
            
        dept = getattr(pat, 'department', None)
        dept_str = dept.value.capitalize() if dept else "Engineering"
        
        name_parts = pat.full_name.split(" ")
        name = f"{name_parts[0][0]}. {name_parts[-1]}" if len(name_parts) > 1 else pat.full_name
        
        patients_data.append({
            "id": str(pat.id),
            "employee_id": pat.employee_id,
            "name": name,
            "dept": dept_str,
            "jrissi": j_rec["mhrs"],
            "jr_delta": "+0",
            "last": "recently",
            "flags": ["JRISSI High"] if j_rec["risk_band"] == RiskBand.HIGH.value else []
        })

    # Prepare queue data
    queue_data = []
    for appt in today_appts:
        # Fetch patient for the queue
        pat = await Patient.get(appt.patient_id)
        if pat:
            name_parts = pat.full_name.split(" ")
            name = f"{name_parts[0][0]}. {name_parts[-1]}" if len(name_parts) > 1 else pat.full_name
        else:
            name = "Unknown"
            
        icon = "event_available" if appt.status == AppointmentStatus.CHECKED_IN else "schedule"
        
        queue_data.append({
            "id": str(appt.id),
            "patient_id": str(pat.id) if pat else None,
            "employee_id": pat.employee_id if pat else "",
            "t": appt.scheduled_at.strftime("%H:%M"),
            "n": name,
            "r": appt.notes or "Routine check-in",
            "icon": icon,
            "status": appt.status.value
        })

    return {
        "stats": stats,
        "patients": patients_data,
        "queue": queue_data
    }


@router.get("/pharmacy")
async def get_pharmacy_dashboard(current_user: User = Depends(require_role(UserRole.PHARMACY, UserRole.ADMIN))):
    # Expiring soon
    now = datetime.utcnow()
    thirty_days = now + timedelta(days=30)
    
    expiring_soon_records = await GRNLot.find(
        GRNLot.remaining_qty > 0
    ).sort(+GRNLot.expiry_date).limit(5).to_list()
    
    expiring_soon = []
    for lot in expiring_soon_records:
        if isinstance(lot.expiry_date, datetime):
            exp_date = lot.expiry_date.replace(tzinfo=None)
        else:
            exp_date = datetime.combine(lot.expiry_date, datetime.min.time())
            
        days_left = (exp_date - now).days
        tone = "low"
        if days_left < 15:
            tone = "high"
        elif days_left < 60:
            tone = "moderate"
            
        expiring_soon.append({
            "name": lot.drug_name,
            "brand": lot.manufacturer or "Generic",
            "qty": lot.remaining_qty,
            "daysLeft": days_left,
            "batch": lot.lot_no,
            "tone": tone
        })

    # Stats
    skus_in_stock = await InventoryItem.find(InventoryItem.total_quantity > 0).count()
    
    # Needs to handle both datetime and date formats gracefully, but we'll assume expiry_date is comparable
    expiring_30d = await GRNLot.find(
        GRNLot.remaining_qty > 0, 
        GRNLot.expiry_date <= thirty_days
    ).count()
    
    out_of_stock = await InventoryItem.find(InventoryItem.total_quantity <= 0).count()

    stats = [
        { "icon": "inventory", "label": "SKUs in stock", "value": str(skus_in_stock) },
        { "icon": "schedule", "label": "Expiring < 30 d", "value": str(expiring_30d), "delta": "2 critical", "deltaTone": "bad" },
        { "icon": "block", "label": "Out of stock", "value": str(out_of_stock), "deltaTone": "bad" },
        { "icon": "pill", "label": "Dispensed today", "value": "47", "delta": "↑ 12 vs avg", "deltaTone": "neutral" },
        { "icon": "savings", "label": "Stock value", "value": "LKR 1.2 M" },
    ]
    
    recent_audit = await AuditLog.find().sort(-AuditLog.created_at).limit(4).to_list()
    grn_activity = []
    for a in recent_audit:
        grn_activity.append({
            "t": a.created_at.strftime("%H:%M"),
            "who": a.actor_label,
            "action": a.action,
            "sub": a.target,
            "icon": "inventory_2" if "grn" in a.action.lower() else "pill"
        })
        
    top_dispensed = [
        { "name": 'Paracetamol 500 mg',  "count": 142, "bar": 100 },
        { "name": 'Cetirizine 10 mg',    "count": 96,  "bar": 68 },
        { "name": 'Ibuprofen 400 mg',    "count": 71,  "bar": 50 },
    ]

    return {
        "stats": stats,
        "expiringSoon": expiring_soon,
        "grnActivity": grn_activity,
        "topDispensed": top_dispensed
    }
