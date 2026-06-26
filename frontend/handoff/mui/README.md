# MRAS theme → MUI handoff

Drop these four files into your React 18 + TypeScript + MUI codebase. They convert the visual design system in `/colors_and_type.css` into a proper MUI theme.

> **Note on extensions:** these files ship with a trailing `.txt` (e.g. `theme.ts.txt`) so the in-browser design-system compiler skips them. **Remove the `.txt`** when you copy them into your repo — `theme.ts.txt` → `theme.ts`.

## Files

| File | Where it goes | What it does |
|---|---|---|
| `theme.ts.txt` | `src/theme/theme.ts` | The `mrasTheme` — palette, typography, spacing, shape, shadows, transitions, plus a `theme.mras` extension for risk colours, role accents, and layout constants. |
| `theme.d.ts.txt` | `src/theme/theme.d.ts` | TS module augmentation so `useTheme().mras.risk.high.main` is typed. |
| `componentOverrides.ts.txt` | `src/theme/componentOverrides.ts` | MUI component defaults that match MRAS — flat cards, no-shadow buttons, clinical-density tables, blurred app-bar. Merge into the theme. |
| `MrasComponents.tsx.txt` | `src/components/mras/` (or anywhere) | Domain-specific components MUI doesn't ship: `JrissiChip`, `JrissiGauge`, `StatTile`, `SectionCard`, `RoleAvatar`. |

## Install

```bash
npm i @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Apply

```tsx
// src/main.tsx
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { mrasTheme } from './theme/theme';
import { componentOverrides } from './theme/componentOverrides';

const theme = createTheme({ ...mrasTheme, components: componentOverrides });

export default function Root() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
```

`CssBaseline` will load IBM Plex Sans/Mono and Material Symbols from Google Fonts. Self-host them later if you prefer.

## How the mockup components map

The dashboards in `ui_kits/dashboard/` use custom primitives. Here's the swap-table for production:

| Mock primitive (in `widgets.jsx`) | Real MUI equivalent |
|---|---|
| `<Button kind="primary">` | `<Button variant="contained">` |
| `<Button kind="secondary">` | `<Button variant="outlined">` |
| `<Button kind="ghost">` | `<Button variant="text">` |
| `<Button kind="danger">` | `<Button variant="contained" color="error">` |
| `<Card>` + `<CardHeader>` | `<SectionCard>` from `MrasComponents.tsx` |
| `<Chip tone="low/moderate/high">` | `<JrissiChip>` from `MrasComponents.tsx` |
| `<Chip tone="info/success/warning/danger">` | MUI `<Chip color="info/success/warning/error">` |
| `<Icon name="ecg_heart">` | `<span className="material-symbols-rounded">ecg_heart</span>` (or `@mui/icons-material`) |
| `<Avatar name="Dr. Withana" color="role-doctor">` | `<RoleAvatar role="doctor" name="…">` |
| `<StatTile>` | `<StatTile>` (same component, real TS version) |
| `<JrissiGauge score={48}>` | `<JrissiGauge score={48}>` |
| `<Banner tone="info" title="…">` | MUI `<Alert severity="info">` (default styling already aligns) |
| `<Sparkline data={[…]}>` | Reuse mock implementation or swap for `recharts`/`visx` |

## Tokens you'll reference often

```tsx
// In any component:
const theme = useTheme();

theme.palette.primary.main          // teal #0F766E
theme.palette.background.default    // canvas
theme.palette.divider               // standard border
theme.mras.risk.high.main           // JRISSI escalation red
theme.mras.role.doctor              // doctor accent
theme.mras.layout.sidebarWidth      // 240
theme.spacing(4)                    // 16px (4 × 4px base)
theme.shadows[1]                    // lifted card
theme.shadows[2]                    // popover
theme.shadows[3]                    // dialog
```

## Type the risk tone

```ts
import type { JrissiTone } from './components/mras/MrasComponents';

interface PatientSummary {
  id: string;
  jrissi: number;
  jrissiTone: JrissiTone; // 'low' | 'moderate' | 'high'
}
```

## Density note

The system targets clinical density. If your app feels too tight after dropping the theme in, check that you didn't override `MuiCssBaseline` — and remember Plex Sans is fractionally larger at the same px than Roboto, so the layout will breathe a little. Don't compensate by shrinking the type scale.

## What's not in this handoff

- **Login / register screens** — they're static HTML in `ui_kits/dashboard/login.html` and `register.html`. Re-implement in React using the theme; copy the visual structure 1:1.
- **Routing, state, auth** — out of scope for the design system. Use whatever your team picked (React Router, Zustand, RTK Query, etc.).
- **Dark mode** — not implemented. The palette has enough headroom for it; add a `mode: 'dark'` branch later.

## Quick checklist before you build

1. ☐ Add the four files to your codebase.
2. ☐ Wrap `<App />` in `<ThemeProvider theme={theme}>` + `<CssBaseline />`.
3. ☐ Rebuild one screen (the doctor dashboard is a good test) using the swap-table above.
4. ☐ Verify Plex Sans is actually loading (`document.fonts.check('16px "IBM Plex Sans"')`).
5. ☐ Check focus rings on inputs and buttons — they should be teal, 3 px halo.
6. ☐ Drop a `<JrissiChip score={48} />` somewhere and confirm it's amber.

Ping me back with screenshots of the real implementation once it's live — we can iterate the theme against your actual data and content.
