# Dark mode

MRAS ships with a complete dark theme. Activating it is **a single attribute on `<html>`**.

## Activation

```ts
// Anywhere in your app — usually in a settings/profile toggle
document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
```

Every token in `tokens.css` is re-declared under `[data-theme="dark"]`. Every CSS variable resolves to its dark-mode value automatically. There is **no JS re-render needed** for the colour swap — it's pure CSS.

Persist the user's choice:

```ts
// On change
localStorage.setItem('mras.theme', dark ? 'dark' : 'light');

// On boot — before React renders, to avoid flash
const saved = localStorage.getItem('mras.theme');
const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
document.documentElement.setAttribute(
  'data-theme',
  saved ?? (prefersDark ? 'dark' : 'light'),
);
```

## What moves

These tokens have **different values** in dark mode (see `tokens.md` for the full table):

- All surface tokens (`--bg-canvas`, `--surface-1`, `--surface-2`, `--bg-hover`, `--bg-selected`)
- All foreground tokens (`--fg-1` … `--fg-4`)
- Border tokens (`--border-1`, `--border-2`)
- The primary swap (teal-600 → teal-400) for legibility on dark
- Semantic background tints become translucent rgba (so they read on the deep-slate base)
- Role accents lift one step for contrast
- Shadows lose colour-mix opacity, gain inner-rim hint via box-shadow

Tokens that stay **the same** in both modes:
- Spacing
- Radii
- Motion (duration, easing)
- Type (size, weight, leading, tracking)
- Layout constants

## What you don't have to do

- **Don't write `[data-theme="dark"] .myCard { ... }` selectors.** Use the named tokens (`--surface-1` etc.) and they'll resolve correctly in both modes.
- **Don't hard-code `#fff` for "white" surfaces.** That doesn't flip. Use `var(--surface-1)`.
- **Don't hard-code `#000` for text.** Use `var(--fg-1)`.

## MUI integration

For MUI's `mode: 'light' | 'dark'`, build two themes and switch at the `<ThemeProvider>` level so MUI internals (e.g. `<TextField>` outline colour) follow:

```tsx
// src/theme/buildTheme.ts
import { createTheme } from '@mui/material/styles';
import { mrasTheme } from './theme';
import { componentOverrides } from './componentOverrides';

export function buildTheme(mode: 'light' | 'dark') {
  return createTheme({
    ...mrasTheme,
    palette: {
      ...mrasTheme.palette,
      mode,
      // The remaining palette values come from CSS variables now;
      // MUI components defer to .root CSS vars via componentOverrides.
    },
    components: componentOverrides,
  });
}
```

Then in your provider:

```tsx
const [mode, setMode] = useState<'light' | 'dark'>(() =>
  (localStorage.getItem('mras.theme') as any) ?? 'light',
);

useEffect(() => {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('mras.theme', mode);
}, [mode]);

return (
  <ThemeProvider theme={useMemo(() => buildTheme(mode), [mode])}>
    <CssBaseline />
    <ThemeToggleContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeToggleContext.Provider>
  </ThemeProvider>
);
```

## Transitions

All themed properties (background, border, color) transition over `--dur-fast` (180 ms) with the standard easing curve. The CSS rule lives in `tokens.css` and runs once per element on the swap — no JS scheduling needed.

## Things to QA when adding a new screen

- ✅ Does every surface use `var(--surface-1)` or a named token?
- ✅ Does every text colour use `var(--fg-*)`?
- ✅ Do hover / focus / active states still meet 4.5:1 contrast in dark?
- ✅ Do any inline SVG fills hard-code colour? Move to `currentColor` or a CSS variable.
- ✅ Do third-party libraries (charts, calendars) read your CSS vars or do they need a separate dark config?

## Auto-follow OS preference

If you want the theme to follow the OS without a manual toggle:

```ts
useEffect(() => {
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const apply = () =>
    document.documentElement.setAttribute('data-theme', mq.matches ? 'dark' : 'light');
  apply();
  mq.addEventListener('change', apply);
  return () => mq.removeEventListener('change', apply);
}, []);
```

We recommend a tri-state setting in production — **System / Light / Dark** — with System as the default.
