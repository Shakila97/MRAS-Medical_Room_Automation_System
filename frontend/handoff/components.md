# Component spec

This document defines every component in the MRAS UI kit — props, anatomy, states, and do's & don'ts. Spec is design-system-first; implementation can use MUI primitives underneath wherever convenient.

Use the visual reference in `MRAS Design System.html` alongside this doc.

---

## Conventions

- **Props are TypeScript-first.** Where MUI has a matching primitive, MRAS components extend it.
- **Variants** are exposed via a single `variant` or `kind` prop, not via class names.
- **Tone** uses a closed set: `'low' | 'moderate' | 'high' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'`. JRISSI uses the first three; status uses the rest.
- **Icons** are Material Symbols Rounded by name (string). Render via `<span className="material-symbols-rounded">{name}</span>` or `@mui/icons-material`.

---

## 1. Button

```tsx
type ButtonProps = {
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;     // Material Symbols name
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};
```

- **primary** → `<Button variant="contained">`
- **secondary** → `<Button variant="outlined">`
- **ghost** → `<Button variant="text">`
- **danger** → `<Button variant="contained" color="error">`

Heights: `sm` 28 · `md` 36 · `lg` 44. Radius `--radius-sm` for `sm`, `--radius-md` otherwise.

**No scale transform on press.** Clinicians use trackpads; a scale jitter is distracting under fatigue. Use a `filter: brightness(0.92)` on `:active` instead.

---

## 2. Input

```tsx
type InputProps = {
  label?: string;
  hint?: string;
  error?: string;     // when set, replaces hint and turns border red
  leading?: string;   // icon name
  trailing?: string;  // icon name
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'password' | 'number';
  value: string;
  onChange: (value: string) => void;
};
```

Border `--border-2` resting; `--primary` + `--primary-tint` halo on focus; `--danger` if `error`. Height 38 px. Errors render below in `--danger-fg`.

Use MUI `<TextField>` underneath with `variant="outlined"`.

## 3. Select / Textarea / DateField

Same shape as Input. `Select` accepts `options: Array<{value, label}>`. `DateField` wraps an `<input type="date">` with the leading calendar icon — for date *picker* UX use `MiniCalendar`.

---

## 4. Toggle / Checkbox

```tsx
type ToggleProps   = { checked: boolean; onChange: (v: boolean) => void; label?: string; disabled?: boolean };
type CheckboxProps = ToggleProps & { indeterminate?: boolean };
```

Toggle is 36 × 20, primary fill when on. Checkbox is 16 × 16 with primary fill + white tick. Both have a 13 px label.

---

## 5. Tabs

```tsx
type TabsProps = {
  value: string;
  onChange: (v: string) => void;
  items: Array<{ value: string; label: string; icon?: string; count?: number }>;
};
```

Underline tab; active tab has a 2 px primary underline + 600 weight label. Optional count chip on the right.

---

## 6. Chip

```tsx
type ChipProps = {
  tone?: 'low' | 'moderate' | 'high' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: string;
  dot?: boolean;
  children: ReactNode;
};
```

Pill radius, 12 px / 500 label, 4 / 10 px padding. `dot` shows a colored leading dot. Use **low/moderate/high** exclusively for JRISSI — never for shipping status.

Re-implement in production as `<JrissiChip>` (see `MrasComponents.tsx`) so it stays a single seam to retune.

---

## 7. Banner / Alert

```tsx
type BannerProps = {
  tone: 'info' | 'warning' | 'danger' | 'success';
  title?: string;
  icon?: string;
  children: ReactNode;
};
```

Tinted background with matching border. Use MUI `<Alert>` underneath — the default styling already aligns.

---

## 8. Card / SectionCard

```tsx
type CardProps = {
  lifted?: boolean;     // adds shadow-1
  dense?: boolean;      // 14/16 padding instead of 20
  padding?: number;     // override
};
type SectionCardProps = CardProps & {
  eyebrow?: string;
  title?: string;
  action?: ReactNode;   // top-right slot
};
```

- White fill (`--surface-1`), 1 px border (`--border-1`), `--radius-md` corners.
- **No resting shadow** — border-only. Optional `--shadow-1` if `lifted`.
- 20 px padding default; 16 px when `dense`.
- Header row: `eyebrow` is 12/600/uppercase/0.04em tracking; `title` is `--fs-16/600`.

---

## 9. StatTile

```tsx
type StatTileProps = {
  icon?: string;
  label: string;
  value: string | number;
  unit?: string;          // rendered smaller, next to value
  delta?: string;         // "+ 4%", "↓ 0.6 kg"
  deltaTone?: 'good' | 'bad' | 'neutral';
};
```

Value uses **Plex Mono 22/500, tabular-nums**, letter-spacing `-0.01em`. Unit drops to Plex Sans 12. Delta is Plex Mono 12 in `--success-fg` / `--danger-fg` / `--fg-3`. **Direction ≠ tone for body weight** — pass `deltaTone` explicitly.

---

## 10. Avatar / RoleAvatar

```tsx
type AvatarProps = {
  name: string;
  size?: number;             // default 32
  color?: string;            // e.g. var(--role-doctor)
};
type RoleAvatarProps = AvatarProps & {
  role: 'doctor' | 'employee' | 'pharmacy' | 'admin';
};
```

Initials = first letters of first 2 name parts, uppercase. Background = role accent. Font weight 600, size 0.4 × avatar size.

---

## 11. Sparkline / LineChart / BarChart / Donut

Plain SVG. Pure components — props in, pixels out, no internal state.

```tsx
type LineChartProps = {
  data: number[];
  width?: number; height?: number;
  color?: string;
  fill?: boolean;          // gradient under line
  yMin?: number; yMax?: number;
  xLabels?: string[];
  refLines?: Array<{ value: number; label?: string; color?: string }>;
  unit?: string;           // y-axis suffix
};
```

For production, consider swapping to **`recharts`** when you need brush, zoom, or tooltips. Keep the visual contract identical: thin 2 px stroke, gradient underfill, dotted reference lines, dotted grid lines, tabular axis labels in Plex Mono 10.

---

## 12. DataTable

```tsx
type DataTableProps<T> = {
  columns: Array<{
    key: keyof T | string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'right' | 'center';
    width?: number;
    mono?: boolean;        // Plex Mono cell
    muted?: boolean;       // --fg-3
    render?: (value: any, row: T) => ReactNode;
  }>;
  rows: T[];
  selectable?: boolean;
  dense?: boolean;
  onRowClick?: (row: T) => void;
  totalLabel?: string;
  page?: number;
  pageCount?: number;
  onPage?: (page: number) => void;
};
```

- Header row sticky on scroll. Bg `--bg-canvas`, 11 px / 500 / uppercase / 0.04em label.
- Row height 44 px (touch target for tablets at the consultation desk).
- Hover: row bg → `--bg-hover`.
- Selection: leading checkbox column; header indeterminate state when partial.
- Sort: arrow icon next to label when active, click to toggle asc / desc / off.
- Pagination & total in footer; show only when `onPage` provided.

---

## 13. Modal

```tsx
type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  width?: number;          // default 480
  children: ReactNode;
  footer?: ReactNode;
};
```

Backdrop `rgba(15,23,42,0.5)` + 2 px blur. 12 px radius. `--shadow-3`. Header is 18 px / 600 with close button. Footer right-aligned buttons.

For destructive confirmations include a leading icon in `--danger-bg` round disc with `priority_high` glyph.

## 14. Drawer (side sheet)

Same shape as Modal, but slides from the right. Default width 440. Use for **patient quick-view**, **prescription draft**, and **filters**.

---

## 15. Toast

```tsx
type ToastProps = {
  tone: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  description?: string;
  icon?: string;
  onClose?: () => void;
};
```

Left-edge 3 px accent stripe; surface-1 fill; subtle `--shadow-2`. Stack from bottom-right. Default duration 4 s; persistent for `danger`.

In production, manage via a context (`useToast()`) so any component can fire `toast.success('Prescription saved.')`.

---

## 16. EmptyState / LoadingRows / ErrorState

```tsx
type EmptyStateProps = { icon?: string; title?: string; description?: string; action?: ReactNode };
type ErrorStateProps = { title?: string; description?: string; onRetry?: () => void };
```

- **Empty.** 64 px tinted icon disc; sentence-case title; body; optional action button. Never illustrations.
- **Loading.** `LoadingRows` shimmer-skeletons — avatar + 2 lines + status chip placeholder. Use over spinners for any list/table.
- **Error.** `--danger-bg` disc with `error` glyph; title in `--fg-1`; retry button.

Voice: "Couldn't reach the climate service. Forecast last updated 2 hours ago." Not "Oops!"

---

## 17. Stepper (form wizard)

```tsx
type StepperProps = { steps: string[]; current: number };
```

Horizontal pill. Done steps have filled primary disc + tick. Current step has an outline ring + tinted center. Future steps are border-only. Connector line filled to the current step.

---

## 18. FileUpload

```tsx
type FileUploadProps = {
  label?: string;
  hint?: string;
  accept?: string;
  files?: File[] | FileMeta[];
  onFiles: (files: File[]) => void;
};
```

Drop zone with dashed border; primary tint on hover. Listed files below with thumbnail / icon, name, size, remove button.

---

## 19. MiniCalendar

```tsx
type MiniCalendarProps = {
  value?: string;                       // ISO yyyy-mm-dd
  onChange: (value: string) => void;
  marks?: Record<string, boolean>;      // existing bookings, etc.
};
```

7-column grid. Today has outline ring; selected has solid primary fill; marked dates have a tiny primary dot below the number.

---

## 20. CommandPalette

```tsx
type CommandPaletteItem = {
  title: string;
  sub?: string;
  icon?: string;
  kbd?: string;
  onSelect: () => void;
};
type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
  items: CommandPaletteItem[];
  placeholder?: string;
};
```

⌘K opens. Fuzzy match on `title + sub`. ↑↓ navigate, ↵ open, Esc close. Default 560 width. Footer keyboard hint strip is mandatory.

---

## 21. JrissiGauge

```tsx
type JrissiGaugeProps = { score: number; size?: number };  // 0–100
```

Circular ring; segment colour from `--risk-low/moderate/high`. Center shows numeric score in Plex Mono 600 + risk label in uppercase eyebrow style.

---

## 22. Progress

```tsx
type ProgressProps = {
  value: number;            // 0–100
  tone?: 'primary' | 'success' | 'warning' | 'danger';
  height?: number;          // default 6
  label?: string;
};
```

---

## 23. ScreenFrame (layout)

```tsx
type ScreenFrameProps = {
  role: 'doctor' | 'employee' | 'pharmacy' | 'admin';
  screen?: string;          // nav highlight
  collapseSidebar?: boolean;
  children: ReactNode;
};
```

AppBar + Sidebar + scrollable `<main>` with 24 / 32 padding. The kit's screens render inside this frame. In production, replace with React Router outlets — the visual rules stay the same.

---

## What we deliberately omit

- **No Pagination component beyond the table footer.** Pagination is a property of containers, not a primitive.
- **No bespoke Tooltip.** Use MUI's `<Tooltip>` with `placement="top"` and a 200 ms delay.
- **No Tabbed content layouts.** Build per-page with the `Tabs` primitive + your own panels.
- **No Carousel, Hero, Marketing card.** Out of clinical register.
