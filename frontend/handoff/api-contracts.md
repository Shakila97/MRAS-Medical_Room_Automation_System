# API contract notes — FastAPI ↔ frontend

This file pairs every screen in the UI kit with the FastAPI endpoints it consumes. Use it as the **contract** between frontend and backend. Pydantic schema names are suggested — adjust to your actual codebase.

> If your FastAPI app emits an OpenAPI spec (it does by default at `/openapi.json`), run **`openapi-typescript`** to generate types and skip half the manual work below.

## Conventions

- All routes mounted under **`/api/v1`**.
- All responses are JSON, camelCase keys (configure with `Field(alias=...)` or `model_config.serialize_by_alias`).
- **Auth** via short-lived JWT in `Authorization: Bearer <token>`, refresh cookie set by `/auth/login`.
- **Role gating** is enforced server-side. The UI hides controls that don't apply, but the server is the source of truth.
- All timestamps are ISO 8601 UTC. Format on display using `date-fns` and the user's timezone from session.
- Pagination is cursor- or page-based; we use `page` / `pageSize` here for simplicity.

## Frontend HTTP client

```ts
// src/api/client.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) location.href = '/login';
    return Promise.reject(err);
  },
);
```

```ts
// src/api/hooks/patients.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../client';

export const usePatient = (id: string) =>
  useQuery({
    queryKey: ['patient', id],
    queryFn: () => api.get(`/patients/${id}`).then((r) => r.data),
  });
```

---

## Auth & session

| Method | Path | Body / params | Returns | Used by |
|---|---|---|---|---|
| `POST` | `/auth/login` | `{ email, password }` | `{ accessToken, user, role, permissions[] }` | Login screen |
| `POST` | `/auth/refresh` | — (cookie) | `{ accessToken }` | Axios interceptor |
| `POST` | `/auth/logout` | — | `204` | App bar profile menu |
| `GET`  | `/auth/session` | — | `SessionResponse` | `<AuthProvider>` on boot |

```py
class SessionResponse(BaseModel):
    user: UserSummary
    role: Literal['doctor', 'employee', 'pharmacy', 'admin']
    permissions: list[str]      # 'rx.sign', 'jrissi.read', 'users.write', ...
    timezone: str
```

`permissions` powers the `<RequireRole>` and `<RequirePermission>` guards as well as conditional rendering inside features.

---

## Doctor surface

### Doctor dashboard
| Endpoint | Returns |
|---|---|
| `GET /doctor/dashboard?date=YYYY-MM-DD` | `DoctorDashboardResponse` |

```py
class DoctorDashboardResponse(BaseModel):
    stats: DashboardStats
    watchlist: list[PatientWatchlistItem]   # top JRISSI cases
    queue: list[ConsultationSlot]            # today's appointments
    forecasts: list[ForecastSignal]          # next 14 days
    escalations: list[EscalationSummary]     # pending acks
```

### Patient record
| Endpoint | Returns |
|---|---|
| `GET /patients?q=&dept=&riskMin=&page=` | `Page[PatientSummary]` |
| `GET /patients/{id}` | `PatientDetail` |
| `GET /patients/{id}/vitals?from=&to=` | `list[VitalReading]` |
| `GET /patients/{id}/consultations?page=` | `Page[ConsultationSummary]` |
| `GET /patients/{id}/medications?active=true` | `list[Medication]` |

`PatientDetail` deliberately **does not include the JRISSI numeric score**. JRISSI is a separate, doctor-only endpoint (see below).

### SOAP consultation editor
| Endpoint | Returns |
|---|---|
| `POST /consultations` | `Consultation` (draft created) |
| `PATCH /consultations/{id}` | `Consultation` (save draft) |
| `POST /consultations/{id}/sign` | `Consultation` (locked) |
| `GET /consultations/{id}` | `Consultation` |

```py
class Consultation(BaseModel):
    id: str
    patient_id: str
    doctor_id: str
    started_at: datetime
    signed_at: datetime | None
    subjective: str
    objective: str
    assessment: str
    plan: str
    vitals: list[VitalReading]
    jrissi_at_visit: int | None      # snapshot
    status: Literal['draft', 'signed', 'amended']
```

Auto-save fires on idle 4 s after the last keystroke (use `useDebouncedCallback`). Render "auto-saved 12 s ago" from the response's `updated_at`.

### Prescription writer
| Endpoint | Returns |
|---|---|
| `GET /drugs?q=&atc=` | `Page[Drug]` (catalog search) |
| `POST /prescriptions` | `Prescription` (draft) |
| `POST /prescriptions/{id}/check` | `InteractionCheckResult` |
| `POST /prescriptions/{id}/sign` | `Prescription` (locked + queued at pharmacy) |

```py
class InteractionCheckResult(BaseModel):
    interactions: list[Interaction]
    allergies: list[AllergyHit]
    duplicates: list[DuplicateHit]
    pregnancy_warnings: list[str]
    renal_warnings: list[str]
    severity: Literal['none', 'low', 'moderate', 'high']
```

The UI calls `/check` on every line-item change (debounced 300 ms). Render the green "No interactions" banner only when `severity == 'none'`.

### JRISSI deep-dive (doctor-only)
| Endpoint | Returns |
|---|---|
| `GET /jrissi/{patient_id}?window=14d` | `JrissiReport` |
| `POST /jrissi/{patient_id}/escalate` | `Escalation` |

```py
class JrissiReport(BaseModel):
    patient_id: str
    current_score: int
    avg_7d: int
    avg_30d: int
    highest: int
    trend: list[int]                  # window length
    subscores: list[Subscore]
    escalation_eligible: bool         # >=67 for 14d sustained
    interventions: list[Intervention]
    audit: list[AuditEntry]
```

Server **must** enforce `permissions: ['jrissi.read']`. The frontend additionally hides this route in the sidebar when the permission is missing.

### Forecasting
| Endpoint | Returns |
|---|---|
| `GET /forecasts?horizon=14` | `list[ForecastSignal]` |
| `POST /forecasts/{signal_id}/notify` | `204` (push pre-alerts to flagged employees) |

```py
class ForecastSignal(BaseModel):
    id: str
    kind: Literal['pollen', 'heat', 'air_quality', 'flu', 'other']
    risk: Literal['low', 'moderate', 'high']
    peak_day: date
    peak_label: str
    series: list[float]
    confidence: float            # 0..1
    affected_employees: list[str]    # IDs; cross-referenced with condition register
    related_conditions: list[str]
```

---

## Employee surface

### Wellness home
| Endpoint | Returns |
|---|---|
| `GET /me/wellness?window=7d` | `WellnessHome` |
| `GET /me/timeline?page=` | `Page[ActivityItem]` |
| `GET /me/goals` | `list[Goal]` |

```py
class WellnessHome(BaseModel):
    score: int
    score_delta: int               # vs previous window
    series: list[int]
    metrics: list[Metric]          # HR, SpO2, steps, sleep
    next_appointment: Appointment | None
```

### Appointment scheduling & QR check-in
| Endpoint | Returns |
|---|---|
| `GET /appointments/availability?date=&duration=` | `list[Slot]` |
| `POST /appointments` | `Appointment` (booked + QR token issued) |
| `PATCH /appointments/{id}` | `Appointment` (reschedule) |
| `DELETE /appointments/{id}` | `204` (cancel) |
| `POST /checkin` | `{ session_token, room, doctor }` (kiosk-side) |

QR payload is a short-lived signed token (JWT, ttl 15 min) containing `appointment_id` and `employee_id`. The kiosk scans → POSTs `/checkin` → the doctor's screen subscribes via SSE/WebSocket on `/checkin/stream` and auto-loads the record.

---

## Pharmacy surface

### Inventory
| Endpoint | Returns |
|---|---|
| `GET /inventory?q=&status=&expiringWithinDays=` | `Page[InventoryItem]` |
| `GET /inventory/{drug_id}` | `InventoryDetail` |
| `GET /inventory/expiring?days=90` | `list[ExpiryEntry]` |

### GRN receive
| Endpoint | Returns |
|---|---|
| `GET /purchase-orders/{po_id}` | `PurchaseOrder` |
| `POST /grn` | `Grn` (draft from PO) |
| `POST /grn/{id}/lots` | `Grn` (add/update lot) |
| `POST /grn/{id}/post` | `Grn` (post → updates inventory + FEFO order) |

```py
class GrnLot(BaseModel):
    lot_no: str
    drug_id: str
    manufacturer: str
    qty: int
    expiry: date
    fefo_rank: int          # 1 = dispense first within SKU
```

FEFO is **server-side** — frontend just renders the rank from the response.

### Prescription queue (dispense)
| Endpoint | Returns |
|---|---|
| `GET /prescriptions/queue?status=pending` | `Page[QueuedRx]` |
| `POST /prescriptions/{id}/dispense` | `DispenseResult` (decrements stock) |

---

## Admin surface

### Users & roles
| Endpoint | Returns |
|---|---|
| `GET /admin/users?q=&role=&status=&page=` | `Page[UserSummary]` |
| `POST /admin/users` | `User` (invite) |
| `PATCH /admin/users/{id}` | `User` |
| `POST /admin/users/{id}/suspend` | `User` |
| `GET /admin/roles` | `list[Role]` (with permissions) |
| `PATCH /admin/roles/{id}` | `Role` |

### Audit log
| Endpoint | Returns |
|---|---|
| `GET /admin/audit?from=&to=&actor=&action=&page=` | `Page[AuditEntry]` |
| `POST /admin/audit/export` | `{ url }` (signed CSV) |

```py
class AuditEntry(BaseModel):
    at: datetime
    actor: str               # 'system' | user.email
    action: str              # 'prescription.sign', 'jrissi.threshold', ...
    target: str              # entity reference
    ip: str | None
    level: Literal['info', 'warn', 'error']
    payload: dict | None     # action-specific
```

Audit entries are **append-only**. The server should write them inside the same transaction as the action they describe.

### Reports & analytics
| Endpoint | Returns |
|---|---|
| `GET /reports/summary?range=ytd` | `ReportSummary` |
| `GET /reports/jrissi/aggregate?groupBy=department` | aggregated distribution |
| `GET /reports/conditions/top?range=ytd&limit=10` | `list[ConditionStat]` |
| `GET /reports/scheduled` | `list[ScheduledReport]` |
| `POST /reports/scheduled` | `ScheduledReport` |

Admin reports must **never** include individual JRISSI scores — only aggregate buckets (low / moderate / high counts).

---

## Closed-loop notifications

The notifications center is fed by both REST (initial fetch) and WebSocket (live updates).

| Endpoint | Returns |
|---|---|
| `GET /notifications?status=open&page=` | `Page[Notification]` |
| `POST /notifications/{id}/ack` | `Notification` |
| `POST /notifications/{id}/resolve` | `Notification` |
| `GET /notifications/preferences` | `NotificationPrefs` |
| `WS /notifications/stream` | server-pushed updates |

```py
class Notification(BaseModel):
    id: str
    kind: Literal['jrissi_escalation', 'forecast_watch', 'stock_low', 'system']
    tone: Literal['info', 'warning', 'danger', 'success']
    title: str
    body: str
    target_role: list[str]
    stage: str
    stages: list[str]           # full pipeline labels
    stage_index: int            # 0-based
    cta: NotificationCta | None
    created_at: datetime
    acked_at: datetime | None
    resolved_at: datetime | None
```

---

## Things to enforce server-side

1. **JRISSI numeric scores** are only ever returned to users with `permissions: ['jrissi.read']`. Admin & employee responses elide the field.
2. **PHI fields** (DOB, full name, NIC) on patient endpoints respect the requester's role — pharmacy gets a redacted view.
3. **Prescription signing** must verify the doctor's `permissions: ['rx.sign']` and the prescription's draft state in the same transaction that flips to `signed`.
4. **FEFO order** is computed server-side from lot expiry. Never let the client reorder.
5. **Rate-limit** `/forecasts/.../notify` and `/notifications/{id}/ack` per user to prevent loops.

---

## Suggested codegen

```bash
# In your frontend
npx openapi-typescript http://localhost:8000/openapi.json -o src/api/schema.ts
```

Then in `client.ts`:

```ts
import type { paths } from './schema';

type GetPatient = paths['/api/v1/patients/{id}']['get'];
type Patient = GetPatient['responses']['200']['content']['application/json'];
```

…and you have end-to-end typing with zero hand-maintained schemas.
