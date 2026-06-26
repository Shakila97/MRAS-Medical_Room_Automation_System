# Token reference

Every visual primitive in MRAS flows from one CSS variable map (see `tokens.css`) and one MUI theme (`mui/theme.ts`). This file lists every token, what it's for, and how to read it in code.

## How to consume

### CSS — direct
```css
.my-card {
  background: var(--surface-1);
  border: 1px solid var(--border-1);
  border-radius: var(--radius-md);
  padding: var(--space-5);
}
```

### React — through MUI
```tsx
const theme = useTheme();
sx={{
  bgcolor: 'background.paper',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius / 8, // sx uses theme units
  p: 5, // 4px × 5 = 20px
}}
```

### React — JRISSI / role / layout (MRAS-only)
```tsx
theme.mras.risk.high.main           // #EF4444
theme.mras.role.doctor              // #0F766E
theme.mras.layout.sidebarWidth      // 240
```

---

## Colour

### Primitives — teal
| Token | Value | Use |
|---|---|---|
| `--teal-50`  | `#F0FDFA` | Tint backgrounds, selected row in light |
| `--teal-100` | `#CCFBF1` | Subtle teal fills |
| `--teal-200` | `#99F6E4` | Borders on tinted teal blocks |
| `--teal-300` | `#5EEAD4` | Primary on dark surfaces |
| `--teal-400` | `#2DD4BF` | Primary in dark mode |
| `--teal-500` | `#14B8A6` | Reserved |
| `--teal-600` | `#0F766E` | **Primary** in light mode |
| `--teal-700` | `#115E59` | Primary hover |
| `--teal-800` | `#134E4A` | Primary press / hero gradient start |
| `--teal-900` | `#0B3F3C` | Hero gradient end |

### Primitives — slate
Standard 11-step cool-grey ramp. `--slate-50` is page background; `--slate-900` is primary text.

### Semantic primitives
`--green-100/500/700` · `--amber-100/500/700` · `--red-100/500/700` · `--blue-100/500/700`. These compose into the named status tokens below — **prefer named tokens** in product code.

### Semantic roles (use these in product code)
| Token | Light | Dark | Notes |
|---|---|---|---|
| `--primary` | teal-600 | teal-400 | Buttons, focus rings, links |
| `--primary-hover` | teal-700 | teal-300 | |
| `--primary-press` | teal-800 | teal-500 | |
| `--primary-tint` | teal-50 | `rgba(20,184,166,0.12)` | Selected rows, halos |
| `--accent` | amber-500 | amber-500 | Predictive watch only |
| `--accent-tint` | amber-100 | `rgba(245,158,11,0.16)` | |
| `--fg-1` | slate-900 | `#E6ECF5` | Headings, primary text |
| `--fg-2` | slate-700 | `#B6C2D6` | Body |
| `--fg-3` | slate-500 | `#8A97AE` | Labels, captions |
| `--fg-4` | slate-400 | `#5A6781` | Disabled |
| `--fg-on-primary` | `#FFFFFF` | `#06231F` | Text on primary fill |
| `--bg-canvas` | slate-50 | `#0B1220` | Page background |
| `--bg-hover` | slate-100 | `#1A2236` | Row hover |
| `--bg-selected` | teal-50 | `#0E2F2B` | Selected row |
| `--surface-1` | white | `#111A2E` | Cards, panels |
| `--surface-2` | slate-50 | `#0E1626` | Nested / inset |
| `--border-1` | slate-200 | `#1F2A40` | Default border |
| `--border-2` | slate-300 | `#2A3650` | Stronger divider |
| `--border-focus` | teal-600 | teal-400 | Focus ring |

### Status
| Token | Use |
|---|---|
| `--success` / `--success-bg` / `--success-fg` | Healthy ranges, positive deltas |
| `--warning` / `--warning-bg` / `--warning-fg` | Predictive watch, expires-soon |
| `--danger` / `--danger-bg` / `--danger-fg` | Escalation only — sparing use |
| `--info` / `--info-bg` / `--info-fg` | Informational |

### JRISSI risk (named distinctly from status so it can be retuned)
| Token | Range | Meaning |
|---|---|---|
| `--risk-low` / `--risk-low-bg` | 0–33 | Continue monitoring |
| `--risk-moderate` / `--risk-moderate-bg` | 34–66 | Pre-visit briefing |
| `--risk-high` / `--risk-high-bg` | 67–100 | Consultation; 14 d sustained → escalate |

### Role accents
| Token | Light | Dark | Use |
|---|---|---|---|
| `--role-doctor` | teal-600 | teal-400 | Doctor sidebar stripe, avatars |
| `--role-employee` | blue-500 | `#60A5FA` | Employee accent |
| `--role-pharmacy` | `#7C3AED` | `#A78BFA` | Pharmacy accent |
| `--role-admin` | slate-700 | `#94A3B8` | Admin accent |

---

## Type

| Token | Value | Use |
|---|---|---|
| `--font-sans` | `IBM Plex Sans, system-ui, ...` | All UI |
| `--font-mono` | `IBM Plex Mono, ui-monospace, ...` | Clinical values, IDs, code |

### Scale (px)
`--fs-12` through `--fs-48`. Use the semantic classes (`type-h1`, `type-body`, etc.) rather than picking sizes directly — semantic classes set weight, leading and tracking too.

### Line height & letter spacing
`--lh-tight` 1.15 · `--lh-snug` 1.3 · `--lh-normal` 1.5 · `--lh-loose` 1.65
`--ls-tight` -0.01em · `--ls-normal` 0 · `--ls-eyebrow` 0.04em (uppercase)

### Tabular figures
Any column of numbers should set `font-variant-numeric: tabular-nums`. `.type-mono` and `.type-clinical` already do this.

---

## Spacing

| Token | px | Typical use |
|---|---|---|
| `--space-1` | 4 | Icon-to-text |
| `--space-2` | 8 | Tight gaps |
| `--space-3` | 12 | Card-internal stack |
| `--space-4` | 16 | Card padding (dense) |
| `--space-5` | 20 | Card padding (default) |
| `--space-6` | 24 | Section gap |
| `--space-8` | 32 | Page gutter |
| `--space-10` | 40 | Large section gap |
| `--space-12` | 48 | Hero spacing |
| `--space-16` | 64 | — |
| `--space-20` | 80 | — |
| `--space-24` | 96 | — |

MUI: `theme.spacing(n)` returns `n × 4px`. So `p: 5` in `sx` ≡ `padding: 20px`.

---

## Radius

| Token | px | Use |
|---|---|---|
| `--radius-sm` | 6 | Inputs, chips |
| `--radius-md` | 10 | **Cards (default)**, buttons |
| `--radius-lg` | 16 | Dialogs, feature cards |
| `--radius-xl` | 24 | Hero blocks |
| `--radius-pill` | 999 | Status pills |

`theme.shape.borderRadius` = 10.

---

## Shadow

Borders are the primary separator. Shadows are reserved for **elevation transitions**.

| Token | Use |
|---|---|
| `--shadow-1` | Lifted card · subtle elevation |
| `--shadow-2` | Menus · popovers |
| `--shadow-3` | Dialogs · drawers |
| `--shadow-focus` | Composite focus ring (border + halo) |

MUI: `theme.shadows[1]` / `[2]` / `[3]`.

---

## Motion

| Token | Value | Use |
|---|---|---|
| `--dur-micro` | 120 ms | Hover, press |
| `--dur-fast` | 180 ms | Show / hide |
| `--dur-medium` | 260 ms | Overlay enter |
| `--ease-std` | `cubic-bezier(0.2, 0, 0, 1)` | Almost everything |
| `--ease-linear` | `linear` | Skeletons, spinners only |

**No bounce, no overshoot, no scale-from-zero pops.** Health data must not feel playful.

---

## Layout constants

| Token | px | Use |
|---|---|---|
| `--appbar-h` | 56 | Top app bar height |
| `--sidebar-w` | 240 | Sidebar (expanded) |
| `--sidebar-w-c` | 64 | Sidebar (collapsed) |
| `--content-max` | 1440 | Max content width |

MUI: `theme.mras.layout.*`.

---

## Don't invent

If you need a colour, type size, radius, or duration that isn't in this list, propose it to the design team first. Single source of truth is what lets dark-mode and re-skin happen in one place.
