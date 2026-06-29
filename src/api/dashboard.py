"""
MRAS v3.0 — Dashboard API
Provides aggregate metrics for Admin, Doctor, and Pharmacy dashboards.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func, select, desc
from datetime import datetime, timedelta

from src.core.database import get_db
from src.models import (
    User, UserRole, Patient, InventoryItem, GRNLot, AuditLog, 
    JRISSIRecord, Appointment, RiskBand
)
from src.modules.auth_service import require_role

router = APIRouter(tags=["Dashboard"])

@router.get("/admin")
async def get_admin_dashboard(db: AsyncSession = Depends(get_db), current_user: User = Depends(require_role([UserRole.ADMIN]))):
    # Dummy service metrics
    services = [
        { "name": "FastAPI backend", "state": "up", "meta": "v3.0.4 · ECS" },
        { "name": "PostgreSQL · Timescale", "state": "up", "meta": "p95 42 ms" },
        { "name": "Claude API", "state": "up", "meta": "sonnet-4-6" },
        { "name": "OpenWeatherMap", "state": "degraded", "meta": "1 retry/h" },
        { "name": "Twilio WhatsApp", "state": "up", "meta": "99.99%" },
    ]

    # Role distribution
    roles = await db.execute(select(User.role, func.count(User.id)).group_by(User.role))
    role_counts = {role: count for role, count in roles.all()}
    total_users = sum(role_counts.values()) or 1
    role_distribution = [
        { "name": "Employee", "count": role_counts.get(UserRole.EMPLOYEE, 0), "pct": round(role_counts.get(UserRole.EMPLOYEE, 0) / total_users * 100, 1), "color": "var(--role-employee)" },
        { "name": "Doctor", "count": role_counts.get(UserRole.DOCTOR, 0), "pct": round(role_counts.get(UserRole.DOCTOR, 0) / total_users * 100, 1), "color": "var(--role-doctor)" },
        { "name": "Pharmacy", "count": role_counts.get(UserRole.PHARMACY, 0), "pct": round(role_counts.get(UserRole.PHARMACY, 0) / total_users * 100, 1), "color": "var(--role-pharmacy)" },
        { "name": "Admin", "count": role_counts.get(UserRole.ADMIN, 0), "pct": round(role_counts.get(UserRole.ADMIN, 0) / total_users * 100, 1), "color": "var(--role-admin)" },
    ]

    # Recent users
    recent_users_q = await db.execute(select(User).order_by(desc(User.created_at)).limit(6))
    users_data = []
    for u in recent_users_q.scalars().all():
        accent = f"var(--role-{u.role.value.lower()})"
        
        # Check if user has department attribute, else mock
        dept = getattr(u, 'department', None)
        if dept:
            dept_str = dept.value.capitalize()
        else:
            dept_str = "Administration"

        users_data.append({
            "name": f"{u.first_name} {u.last_name}",
            "role": u.role.value.capitalize(),
            "dept": dept_str,
            "status": "active" if u.is_active else "invited",
            "last": "recently",
            "accent": accent
        })

    # Recent audit
    audit_q = await db.execute(select(AuditLog).order_by(desc(AuditLog.created_at)).limit(8))
    audit_data = []
    for a in audit_q.scalars().all():
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
    security_events_q = await db.execute(select(func.count(AuditLog.id)).where(AuditLog.level.in_(["warn", "error"])))
    security_events_count = security_events_q.scalar() or 0

    stats = [
        { "icon": "group", "label": "Active users", "value": str(active_users), "delta": "+6 this week", "deltaTone": "good" },
        { "icon": "shield_person", "label": "Roles assigned", "value": f"{active_users} / {active_users}" },
        { "icon": "cloud_done", "label": "Service uptime", "value": "99.97", "unit": "%", "delta": "SLA 99.9%", "deltaTone": "good" },
        { "icon": "database", "label": "DB latency p95", "value": "42", "unit": "ms" },
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
async def get_doctor_dashboard(db: AsyncSession = Depends(get_db), current_user: User = Depends(require_role([UserRole.DOCTOR, UserRole.ADMIN]))):
    # Stats
    active_emp_q = await db.execute(select(func.count(User.id)).where(User.role == UserRole.EMPLOYEE))
    active_emp = active_emp_q.scalar() or 0
    
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    queue_q = await db.execute(
        select(Appointment)
        .where(Appointment.scheduled_at >= today_start)
        .order_by(Appointment.scheduled_at.asc())
    )
    today_appts = queue_q.scalars().all()
    today_queue = len(today_appts)

    jrissi_high_q = await db.execute(select(func.count(JRISSIRecord.id)).where(JRISSIRecord.risk_band == RiskBand.HIGH))
    jrissi_high = jrissi_high_q.scalar() or 0

    stats = [
        { "icon": "groups", "label": "Active employees", "value": str(active_emp) },
        { "icon": "event_available", "label": "Today's queue", "value": str(today_queue), "delta": "3 pre-visit briefings ready", "deltaTone": "good" },
        { "icon": "psychology", "label": "JRISSI High", "value": str(jrissi_high), "delta": "+1 vs last week", "deltaTone": "bad" },
        { "icon": "insights", "label": "Forecast watch", "value": "3", "delta": "Pollen rising Thu", "deltaTone": "neutral" },
        { "icon": "priority_high", "label": "Escalations", "value": "1" },
    ]

    # Patients with high JRISSI
    patients_q = await db.execute(
        select(Patient, JRISSIRecord)
        .join(JRISSIRecord, Patient.id == JRISSIRecord.patient_id)
        .order_by(desc(JRISSIRecord.mhrs))
        .limit(5)
    )
    patients_data = []
    for pat, jrissi in patients_q.all():
        dept = getattr(pat, 'department', None)
        dept_str = dept.value.capitalize() if dept else "Engineering"
        
        patients_data.append({
            "id": pat.id,
            "employee_id": pat.employee_id,
            "name": f"{pat.first_name[0]}. {pat.last_name}",
            "dept": dept_str,
            "jrissi": jrissi.mhrs,
            "jr_delta": "+0",
            "last": "recently",
            "flags": ["JRISSI High"] if jrissi.risk_band == RiskBand.HIGH else []
        })

    # Prepare queue data
    queue_data = []
    for appt in today_appts:
        # Fetch patient for the queue
        pat_q = await db.execute(select(Patient).where(Patient.id == appt.patient_id))
        pat = pat_q.scalar_one_or_none()
        name = f"{pat.first_name[0]}. {pat.last_name}" if pat else "Unknown"
        icon = "event_available" if appt.status == AppointmentStatus.CHECKED_IN else "schedule"
        
        queue_data.append({
            "id": appt.id,
            "patient_id": pat.id if pat else None,
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
async def get_pharmacy_dashboard(db: AsyncSession = Depends(get_db), current_user: User = Depends(require_role([UserRole.PHARMACY, UserRole.ADMIN]))):
    # Expiring soon
    now = datetime.utcnow().date()
    thirty_days = now + timedelta(days=30)
    expiring_q = await db.execute(
        select(GRNLot)
        .where(GRNLot.remaining_qty > 0)
        .order_by(GRNLot.expiry_date)
        .limit(5)
    )
    expiring_soon = []
    for lot in expiring_q.scalars().all():
        days_left = (lot.expiry_date - now).days
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
    skus_q = await db.execute(select(func.count(InventoryItem.id)).where(InventoryItem.total_quantity > 0))
    skus_in_stock = skus_q.scalar() or 0
    
    expiring_30d_q = await db.execute(select(func.count(GRNLot.id)).where(GRNLot.remaining_qty > 0, GRNLot.expiry_date <= thirty_days))
    expiring_30d = expiring_30d_q.scalar() or 0
    
    oos_q = await db.execute(select(func.count(InventoryItem.id)).where(InventoryItem.total_quantity <= 0))
    out_of_stock = oos_q.scalar() or 0

    stats = [
        { "icon": "inventory", "label": "SKUs in stock", "value": str(skus_in_stock) },
        { "icon": "schedule", "label": "Expiring < 30 d", "value": str(expiring_30d), "delta": "2 critical", "deltaTone": "bad" },
        { "icon": "block", "label": "Out of stock", "value": str(out_of_stock), "deltaTone": "bad" },
        { "icon": "pill", "label": "Dispensed today", "value": "47", "delta": "↑ 12 vs avg", "deltaTone": "neutral" },
        { "icon": "savings", "label": "Stock value", "value": "LKR 1.2 M" },
    ]
    
    audit_q = await db.execute(select(AuditLog).order_by(desc(AuditLog.created_at)).limit(4))
    grn_activity = []
    for a in audit_q.scalars().all():
        grn_activity.append({
            "t": a.created_at.strftime("%H:%M"),
            "who": a.actor_label,
            "action": a.action,
            "sub": a.target,
            "icon": "inventory_2" if "GRN" in a.action else "pill"
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
