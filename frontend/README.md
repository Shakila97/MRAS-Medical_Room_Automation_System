# MRAS Design System

> **Medical Room Automation System v3.0** — design language for an intelligent, predictive corporate health platform.

This is the design system for MRAS v3.0, a full-stack Python/React platform that transforms corporate medical rooms from reactive treatment centres into proactive, predictive wellness ecosystems. It serves four distinct roles — **doctor**, **employee**, **pharmacy staff**, and **admin** — across one shared interface.

---

## Sources

The only resource provided was a repo containing a single README:

- **GitHub:** [Shakila97/MRAS-Medical-Room-Automation-System-](https://github.com/Shakila97/MRAS-Medical-Room-Automation-System-) — `main` branch. Contains only a top-level `README.md` (no application code, components, screenshots, or design files at the time of capture).
- **No Figma file, screenshots, or implementation code were provided.**

As a result, every visual decision in this design system is **inferred**, not derived. The inference signal is:

1. The product's stated tech stack — **React 18 + TypeScript + MUI** — which fixes a Material-Design baseline.
2. The product's domain — **corporate occupational health**, with sub-domains for patient records, pharmacy/inventory, predictive forecasting, and mental-health risk scoring (JRISSI).
3. The four named user roles and the access patterns described in the README.
4. Healthcare-software conventions: high information density, calm and trustworthy palette, strong data legibility, conservative motion.

**If the team has an existing brand kit, Figma file, or live implementation, please attach it and we will re-derive from source.** Everything here can be replaced or recoloured cleanly because all tokens flow through CSS variables.

---

## What's in this folder

| File / folder | Purpose |
|---|---|
| `README.md` | This document — brand context, content fundamentals, visual foundations, iconography. |
| `SKILL.md` | Cross-compatible skill descriptor for Claude / Claude Code. |
| `colors_and_type.css` | All design tokens — colour, type, spacing, radius, shadow — as CSS custom properties. |
| `fonts/` | Self-hosted IBM Plex Sans + IBM Plex Mono (substitution flagged below). |
| `assets/` | Logos, illustrations, iconography. |
| `preview/` | Individual specimen cards rendered in the Design System tab. |
| `components/` | Live, exported React components (`Button`, `Chip`, `Banner`, `StatTile`, `JrissiGauge`, `RoleAvatar`) — each with a `.d.ts` and an `@dsCard` preview. |
| `src/` | The full UI-kit source: tokens, primitives, chrome, and every role screen, composed in `MRAS Design System.html`. |
| `handoff/` | Engineering handoff for the React 18 + TS + MUI build against the FastAPI backend — token reference, component specs, API contracts, dark-mode guide, and a drop-in MUI theme. |
| `MRAS Design System.html` | The complete interactive showcase — foundations, components, and 24 screens across five roles, with a dark-mode toggle. |

A full index is at the bottom of this file.

---

## Brand context

**Product:** MRAS v3.0 — Intelligent Predictive Health Platform
**Audience:** Corporate medical staff (doctors, pharmacy staff), employees who scan in for consultations, and facility admins.
**Tagline (inferred from README):** *Predict. Prevent. Personalise.*

Three signature capabilities anchor the brand:

- **Multi-Source Predictive Forecasting** — predicts illness 3–14 days before symptoms.
- **JRISSI Mental Health Score** — proprietary 0–100 risk score, doctor-only.
- **Closed-Loop Smart Notifications** — AI-generated interventions with automated escalation.

The product is academic in origin (University of Vocational Technology, 2026) but the brief targets enterprise medical facilities. The tone must feel **clinical-grade**, not student-grade: calm authority, no marketing flourish, no decorative gradients on critical data surfaces.

---

## Content fundamentals

> How copy is written, what the system says, how it addresses the reader.

### Voice

Three words: **clinical, plain, reassuring.** Like a senior nurse explaining a chart to a colleague — informed, concrete, never alarmist, never breezy.

### Person & address

- **Second-person for users** in their own surfaces: "Your next check-in is on Friday." "We've noticed your sleep score has dropped for 5 days."
- **Third-person for clinicians looking at patients**: "Patient is showing elevated JRISSI score over 14 days." Never refer to patients as "the user."
- **First-person plural for the system's own actions, sparingly**: "We've prepared a pre-visit briefing." Used only when the system actively did something on the user's behalf — never as filler.

### Casing

- **Sentence case** everywhere: page titles, section headers, buttons, menu items. ("Patient records", not "Patient Records".)
- **Acronyms preserved**: MRAS, JRISSI, GRN, FEFO, PHI, HR, QR.
- **Drug names** follow generic-lowercase / brand-Capitalised pharmacopoeia convention: "paracetamol", "Panadol".
- **Numbers**: spell zero through nine in prose; numerals for everything else and always for clinical values ("3 days", "120/80 mmHg", "BMI 24.1").

### Tone examples

| Context | ✅ Write this | ❌ Not this |
|---|---|---|
| Empty state | "No consultations recorded yet." | "Nothing to see here! 🎉" |
| Risk warning | "JRISSI sustained High for 14 days. Recommend consultation." | "Uh oh — looks like things are getting risky!" |
| Success toast | "Prescription saved." | "Awesome! Your prescription is saved." |
| Forecast | "Pollen levels are forecast to rise on Thursday. 3 employees with seasonal allergy history have been flagged." | "Heads up — bad allergy day coming!" |
| Error | "Couldn't reach the climate service. Forecast last updated 2 hours ago." | "Oops! Something went wrong." |

### Emoji

**Not used in product UI.** Emoji appear in the GitHub README and in casual documentation but never in the application surface — they conflict with the clinical register and create accessibility noise for screen readers reading aggregated health data.

The one allowed exception is internal-team channels and onboarding fluff (welcome screen, empty-state illustrations may include a single calm glyph) — never on dashboards, never on patient records, never on alerts.

### Numerical & clinical data

- Always show units: `72 bpm`, `36.6 °C`, `120/80 mmHg`, `7,432 steps`.
- Use tabular figures (`font-variant-numeric: tabular-nums`) for any column of numbers so digits align.
- Trend deltas use signed numerals with arrow glyphs: `↑ 4%`, `↓ 0.6 kg`. Never colourise gain green / loss red without context — for body weight a loss may be desirable; for activity a gain is desirable.

### Vibe summary

Calm, competent, evidence-led. The product knows things and shares them concisely. It never panics, never celebrates, and never tries to be your friend.

---

## Visual foundations

### Colour

**Hue strategy.** Anchored on **deep clinical teal** as primary — a colour associated with surgical scrubs, medical equipment, and digital health more recent than the usual NHS blue / Mayo navy. Teal carries the dual signal of "health" and "technology" without veering toward the fintech-cold of navy or the alarmism of red-orange.

- **Primary 600 — `#0F766E`** (Teal). Used for primary actions, links, focus rings, doctor-role accents.
- **Accent — `#F59E0B`** (Amber 500). Reserved for *predictive watch* states — JRISSI moderate risk, forecast warnings, "needs attention" without being a crisis.
- **Neutrals** — slate-blue cool greys (`#0F172A` → `#F8FAFC`). Slightly cooler than warm-grey to sit comfortably next to the teal.

Three semantic colours layer on top: `success` (#10B981, calm green for healthy ranges), `warning` (#F59E0B), `danger` (#EF4444, escalation-only — sparing use). All defined as variables in `colors_and_type.css`.

A dedicated **JRISSI scale** (`--risk-low`, `--risk-moderate`, `--risk-high`) maps to the same trio but is named distinctly so it can be retuned for accessibility (the doctor view may use patterns or icons in addition to colour).

### Type

Two families, both [IBM Plex](https://www.ibm.com/plex/) (Open Font License):

- **IBM Plex Sans** — body, headings, UI labels. Humanist proportions, large x-height, excellent at small sizes, designed by Mike Abbink with medical-records-grade legibility in mind.
- **IBM Plex Mono** — clinical values, IDs, dosages, code blocks. Tabular by default.

Display uses the same Plex Sans family at heavier weights — no separate display face, keeping the system honest and reducing payload.

**⚠️ Font substitution flag:** Self-hosted IBM Plex files are bundled in `fonts/`. If the team has a licensed alternative (Söhne, ABC Diatype, Aktiv Grotesk) we recommend the swap — Plex is excellent but very recognisable. Flagged for review.

### Spacing & layout

A **4 px base unit** (`--space-1: 4px`). Increments: 4, 8, 12, 16, 24, 32, 48, 64, 96. Dashboards lean on the 16–24 range; modal padding uses 24–32.

**Information density** is intentionally **medium-high** — clinicians are scanning charts, not strolling through a marketing page. Cards have tight padding (16 / 20 px), table rows are 44 px (touch target on tablets at the consultation desk), and we never use giant hero spacing inside the app.

The marketing surface (login screen, public dashboards if any) uses the same tokens at larger steps.

### Backgrounds

- **Surfaces are flat.** No gradients on cards, no gradient backgrounds on dashboards. Healthcare data is busy enough.
- **Page background:** `--bg-canvas` (#F8FAFC) — barely off-white, gives elevation to cards without shadow noise.
- **One legitimate gradient** exists: the login hero, a slow vertical fade from `--teal-700` to `--teal-900`. Nowhere else in the product.
- **No background images, illustrations, or patterns** behind data. Illustration appears only in empty states and onboarding (see iconography below).

### Borders, radii, shadows

- **Radii:** `--radius-sm: 6px`, `--radius-md: 10px`, `--radius-lg: 16px`, `--radius-pill: 999px`. Cards default to `md`. Pills are used for status chips.
- **Borders are the primary separator**, not shadows. `1px solid var(--border-1)` (#E2E8F0). Shadows are reserved for elevation transitions (menu open, dialog).
- **Shadow scale:** `--shadow-1` (resting card, optional), `--shadow-2` (menu/popover), `--shadow-3` (dialog/modal). All cool-grey, low opacity. No coloured shadows.
- **No inner shadows** anywhere in the system.

### Motion

Motion is **functional and small**. Material-Design-adjacent.

- **Duration:** 120 ms (micro — hover/press), 180 ms (default — show/hide), 260 ms (overlay). Never longer than 320 ms in product UI.
- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` (Material standard) for almost everything. Linear for skeletons/spinners only.
- **No bounce, no overshoot, no scale-from-zero pops.** Health data must not feel playful.
- **Skeleton loaders** are preferred over spinners for any list/table; spinners only for background sync.
- **Page transitions** are cross-fades, 180 ms, no slide.

### Interaction states

- **Hover (clickable):** background tints 4% darker for filled buttons, surface tints to `--bg-hover` (#F1F5F9) for table rows and list items.
- **Press:** background tints 8% darker. No scale transform — clinicians use trackpads and a scale jitter is distracting under fatigue.
- **Focus:** 2 px outline in `--primary-600` with 2 px offset on a transparent layer. Always visible, never removed.
- **Disabled:** 40% opacity, no pointer events, cursor not-allowed.
- **Selected (row, tab):** left-edge 3 px accent in `--primary-600` for rows; full underline 2 px for tabs.

### Transparency & blur

- Used **sparingly**: the global app-bar uses a 6 px backdrop blur over a `rgba(248, 250, 252, 0.85)` fill when content scrolls underneath; popovers and menus do not blur.
- **No frosted glass on cards.** Health data must render at full opacity.

### Imagery

The product has minimal photography. When photography is used (login background, marketing material), the treatment is:

- **Cool-leaning, neutral, low-saturation.** Light hospital interiors, gloved hands on tablets, no patient faces.
- **Slight cool grade** (slight teal cast) so it composites cleanly with the UI palette.
- **No grain, no duotone.** No "AI-generated medical photography" look.

### Cards

The default card is the most-used surface. Specification:

- White fill (`--surface-1`).
- 1 px border (`--border-1`).
- `--radius-md` (10 px) corners.
- No resting shadow (border-only). Optional `--shadow-1` if the card is a "lifted" widget on a dashboard.
- 20 px padding default; 16 px for dense cards in tables; 24–32 for primary content cards.
- Header row uses Plex Sans 14/600, eyebrow uppercase with `letter-spacing: 0.04em`. Body uses 14/400 or 16/400.

### Layout rules

- **Fixed top app-bar** (56 px), with a left-aligned product mark and right-aligned utility controls (notifications, profile).
- **Fixed left sidebar** for primary navigation on doctor/admin surfaces (240 px expanded, 64 px collapsed). Employee surface uses a top tab bar instead.
- **Content max-width** 1440 px on very wide screens; otherwise fluid with 32 px gutters.

---

## Iconography

The application uses **two icon strategies**, distinct but coordinated:

### 1. UI icons — Material Symbols (Rounded, weight 400, fill 0)

The README specifies MUI for the frontend, so we adopt the Material team's own icon family — **Material Symbols Rounded** — at weight 400 and fill 0. This:

- Matches the rounded humanist forms of IBM Plex Sans.
- Is freely available via Google Fonts (CDN-loaded — no local files needed).
- Covers every metaphor needed (health, charts, calendar, patients, pharmacy, alerts).

Loaded via:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0" />
```

Used as `<span class="ms">favorite</span>` (see `colors_and_type.css` for the `.ms` class).

**Sizing:** 20 px in dense UI (table rows, chips), 24 px default (buttons, app-bar), 32 px+ in empty states.
**Filled variants** are used only for **selected/active** states and a small fixed list of "status" icons (warning, error, completed).

> 🚩 **Substitution flag:** Material Symbols is a sensible default for an MUI codebase. If the team has standardised on a different set (Lucide, Phosphor, Heroicons, MUI's own SVGIcon set), point us at it and we'll swap.

### 2. Brand iconography — none custom

The product uses **no custom-drawn brand illustrations or hero icons**. Empty states use a small Material Symbol at 48 px in `--fg-3`, never a hand-drawn illustration. This is a deliberate choice — illustrated empty states clash with the clinical register and date quickly.

### Emoji

Not used in UI. See content fundamentals.

### Unicode glyphs

Two unicode arrows are used in trend cells: `↑` (U+2191) and `↓` (U+2193). Otherwise no unicode "icon" substitutions — Material Symbols covers it.

### Logos

A wordmark + monogram are provided in `assets/` (`mras-wordmark.svg`, `mras-mark.svg`). The mark is a stylised plus / pulse glyph in `--primary-600`. Both are designs *inferred* from the README brand — the team should replace with the real mark when available.

---

## Index — manifest

### Root files
- [`README.md`](README.md) — this document
- [`SKILL.md`](SKILL.md) — skill descriptor
- [`colors_and_type.css`](colors_and_type.css) — all design tokens

### `assets/`
- `mras-wordmark.svg` — placeholder wordmark
- `mras-mark.svg` — placeholder monogram
- `material-symbols.css` — convenience class for icon use

### `fonts/`
- IBM Plex Sans (400/500/600/700) — `.woff2`
- IBM Plex Mono (400/500) — `.woff2`

### `preview/`
Individual specimen cards rendered in the Design System tab.

### `components/`
Exported, renderable React components (pure JSX, no MUI dependency) consumable as `window.MRASDesignSystem_019e16.<Name>`:
- `Button`, `Chip`, `Banner` — core controls and callouts
- `StatTile` — clinical readout cell
- `JrissiGauge` — doctor-only mental-health risk dial
- `RoleAvatar` — accent-coloured initials avatar

Each lives in its own folder with a `.jsx` implementation, a `.d.ts` type contract, and an `@dsCard` HTML preview.

### `src/`
The full UI-kit source, loaded by `MRAS Design System.html`:
- `tokens.css` — design tokens incl. dark-mode (`[data-theme="dark"]`)
- `widgets.jsx`, `primitives.jsx` — the working component library (buttons, inputs, data table, charts, modals, drawer, toast, command palette, states, …)
- `foundations.jsx`, `components.jsx` — design-canvas specimen artboards
- `Chrome.jsx`, `ScreenFrame.jsx` — app-bar, sidebar, screen frame
- `screens/` — every role screen (doctor SOAP / prescription / JRISSI-AI / forecasting, employee wellness / scheduling / kiosk, pharmacy GRN / FEFO, admin users / audit / reports, shared notifications / settings, auth)

### `handoff/`
Claude-Code-ready engineering handoff:
- `README.md` — architecture + 8-step build plan
- `tokens.md`, `components.md`, `api-contracts.md`, `dark-mode.md`
- `mui/` — drop-in MUI theme + typed wrappers (shipped as `.txt` so the in-browser compiler skips them; remove the suffix on copy)

### `MRAS Design System.html`
The complete interactive showcase — pan/zoom design canvas covering foundations, components, and all role screens, with a live dark-mode toggle in the Tweaks panel.
