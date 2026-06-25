---
name: mras-design
description: Use this skill to generate well-branded interfaces and assets for MRAS (Medical Room Automation System), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a clinical-grade predictive healthcare platform.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts *or* production code, depending on the need.

## Quick map

- `README.md` — brand context, content fundamentals, visual foundations, iconography
- `colors_and_type.css` — all design tokens (colour, type, spacing, radius, shadow, motion)
- `assets/` — wordmark and monogram (placeholder)
- `preview/` — individual specimen cards
- `ui_kits/dashboard/` — React/Babel recreation of the doctor / employee / pharmacy surfaces

## Non-negotiables

- Clinical, plain, reassuring voice. No emoji in product UI.
- Sentence case for everything; acronyms preserved (MRAS, JRISSI, GRN, FEFO).
- IBM Plex Sans for UI; IBM Plex Mono for clinical values, IDs, dosages.
- Teal (#0F766E) primary; amber (#F59E0B) accent; danger red used sparingly.
- JRISSI risk uses its own named scale (`--risk-low/moderate/high`) — doctor-only data.
- Flat surfaces. No gradients on data cards. Borders separate, shadows elevate.
- Material Symbols Rounded (weight 400, fill 0) for all icons.
