# MRAS — Frontend handoff

This folder contains everything you need to ship the MRAS v3.0 frontend on **React 18 + TypeScript + MUI**, against your **FastAPI 0.115+** backend.

## TL;DR

```bash
# In your React app
npm i @mui/material @emotion/react @emotion/styled @mui/icons-material
npm i react-router-dom @tanstack/react-query zod axios date-fns recharts
```

Copy (drop the trailing `.txt` when you do):
- `mui/theme.ts.txt` → `src/theme/theme.ts`
- `mui/theme.d.ts.txt` → `src/theme/theme.d.ts`
- `mui/componentOverrides.ts.txt` → `src/theme/componentOverrides.ts`
- `mui/MrasComponents.tsx.txt` → `src/components/mras/MrasComponents.tsx`

Wrap your root:

```tsx
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { mrasTheme } from './theme/theme';
import { componentOverrides } from './theme/componentOverrides';

const theme = createTheme({ ...mrasTheme, components: componentOverrides });

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}
```

You now have the MRAS visual language. Continue with the build plan below.

---

## Read order

1. **`README.md`** ← you are here · architecture overview, build plan
2. **`tokens.md`** · every CSS variable, MUI mapping, usage rules
3. **`components.md`** · component-by-component spec — props, anatomy, states
4. **`api-contracts.md`** · how the UI maps to FastAPI endpoints + Pydantic schemas
5. **`dark-mode.md`** · how the theme switches; tokens that move

---

## Architecture

```
src/
├── theme/                    # ← from this handoff
│   ├── theme.ts
│   ├── theme.d.ts
│   └── componentOverrides.ts
├── components/
│   ├── mras/                 # ← from this handoff
│   │   ├── MrasComponents.tsx
│   │   └── ...
│   └── shared/               # DataTable, Drawer, CommandPalette, etc.
├── features/                 # role-scoped feature folders
│   ├── doctor/
│   │   ├── DoctorDashboard.tsx
│   │   ├── PatientRecord.tsx
│   │   ├── SoapEditor.tsx
│   │   ├── PrescriptionWriter.tsx
│   │   ├── JrissiDeepDive.tsx
│   │   └── ForecastingView.tsx
│   ├── employee/
│   │   ├── WellnessHome.tsx
│   │   ├── AppointmentScheduling.tsx
│   │   └── KioskCheckIn.tsx
│   ├── pharmacy/
│   │   ├── PharmacyDashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── GrnReceive.tsx
│   │   └── ExpiryWatch.tsx
│   ├── admin/
│   │   ├── AdminConsole.tsx
│   │   ├── UsersAndRoles.tsx
│   │   ├── AuditLog.tsx
│   │   └── ReportsAnalytics.tsx
│   └── shared/
│       ├── NotificationsCenter.tsx
│       └── SettingsProfile.tsx
├── api/                      # generated from FastAPI OpenAPI (recommended)
│   ├── client.ts             # axios instance
│   ├── schemas.ts            # zod schemas mirroring Pydantic
│   └── hooks/                # react-query hooks per endpoint group
├── auth/
│   ├── AuthProvider.tsx      # session, role, refresh
│   └── RequireRole.tsx       # route guard
├── routes/
│   └── index.tsx             # role-aware routing
└── main.tsx
```

---

## Build plan (8 steps)

> Each step is small enough that **Claude Code** can execute it in one go. Pass each step as a single prompt.

### Step 1 — Theme & foundations
> *"Drop the four files from `handoff/mui/` into the project. Wire ThemeProvider in main.tsx. Verify Plex Sans renders by mounting a `<Typography variant="h1">Predict. Prevent. Personalise.</Typography>` on a blank page."*

### Step 2 — Shared components
> *"Implement `<SectionCard>`, `<JrissiChip>`, `<StatTile>`, `<RoleAvatar>` from `MrasComponents.tsx`. Then build `<DataTable>`, `<Drawer>` (right side-sheet), `<CommandPalette>` (Cmd-K), `<EmptyState>`, `<LoadingRows>`, and `<ErrorState>` following `components.md` specs."*

### Step 3 — Auth & routing
> *"Implement `<AuthProvider>` (session + role from `/api/v1/auth/session`), `<RequireRole>` route guard, and role-aware routes from `routes/index.tsx`. Doctor→`/d`, Employee→`/e`, Pharmacy→`/p`, Admin→`/a`."*

### Step 4 — Doctor surface
> *"Build `DoctorDashboard.tsx`, `PatientRecord.tsx`, `SoapEditor.tsx`, `PrescriptionWriter.tsx`, `JrissiDeepDive.tsx`, `ForecastingView.tsx`. Match the visuals in the MRAS Design System UI kit. Wire to react-query hooks generated from the FastAPI spec."*

### Step 5 — Employee surface
> *"Build `WellnessHome.tsx`, `AppointmentScheduling.tsx`, `KioskCheckIn.tsx`. Use the same data-table, drawer, and stat-tile primitives."*

### Step 6 — Pharmacy surface
> *"Build `PharmacyDashboard.tsx`, `Inventory.tsx`, `GrnReceive.tsx` (5-step stepper), `ExpiryWatch.tsx` (FEFO)."*

### Step 7 — Admin surface
> *"Build `AdminConsole.tsx`, `UsersAndRoles.tsx`, `AuditLog.tsx`, `ReportsAnalytics.tsx`. JRISSI individual scores must not appear in admin views — only aggregate."*

### Step 8 — Closed-loop notifications + dark mode
> *"Build `NotificationsCenter.tsx` with the escalation timeline. Wire WebSocket subscription. Add the dark-mode toggle from `dark-mode.md` to the settings page."*

---

## What this handoff does **not** cover

- **State management** at scale. We recommend `react-query` for server state and `zustand` for client state.
- **i18n.** Plex Sans includes Latin Extended; add `next-intl` or `react-i18next` when needed.
- **Tests.** Component tests with `@testing-library/react`, E2E with Playwright. Snapshot the dashboard screens before any major change.
- **Build pipeline.** Use Vite or Next.js — both work. The theme is build-agnostic.

---

## Versioning the visual system

Treat this design system as a **library**, not as code copied into the app. When we change a token (e.g. the `--primary` teal), every consumer should rebuild. Consider publishing this folder as `@mras/design-system` to an internal npm registry once it stabilises.

Ping the design team with screenshots once the first surface is live — we'll iterate on density, focus rings, and risk thresholds against your real data.
