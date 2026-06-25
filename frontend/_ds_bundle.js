/* @ds-bundle: {"format":3,"namespace":"MRASDesignSystem_019e16","components":[{"name":"Banner","sourcePath":"components/Banner/Banner.jsx"},{"name":"Button","sourcePath":"components/Button/Button.jsx"},{"name":"Chip","sourcePath":"components/Chip/Chip.jsx"},{"name":"JrissiGauge","sourcePath":"components/JrissiGauge/JrissiGauge.jsx"},{"name":"RoleAvatar","sourcePath":"components/RoleAvatar/RoleAvatar.jsx"},{"name":"StatTile","sourcePath":"components/StatTile/StatTile.jsx"}],"sourceHashes":{"components/Banner/Banner.jsx":"af4f4995bc0f","components/Button/Button.jsx":"8f77d182fc24","components/Chip/Chip.jsx":"796d345a8917","components/JrissiGauge/JrissiGauge.jsx":"8b45ea32fad2","components/RoleAvatar/RoleAvatar.jsx":"a518205732fa","components/StatTile/StatTile.jsx":"741b2aa493fc","src/App.jsx":"4eabda555292","src/Chrome.jsx":"7636f46a8f20","src/ScreenFrame.jsx":"8fe4ca3644a3","src/components.jsx":"ec9485d80985","src/design-canvas.jsx":"c9095ef15594","src/foundations.jsx":"00da1453b841","src/primitives.jsx":"1062169f5b58","src/screens/AdminDashboard.jsx":"657eaa7d4730","src/screens/AdminScreens.jsx":"76004123c285","src/screens/AuthScreens.jsx":"a4245d334a33","src/screens/DoctorDashboard.jsx":"f9fc3d7b8fc9","src/screens/DoctorScreens.jsx":"fa8d32972867","src/screens/EmployeeHome.jsx":"deccf82c2813","src/screens/EmployeeScreens.jsx":"b6d39675489f","src/screens/PatientRecord.jsx":"64490d27e59c","src/screens/PharmacyDashboard.jsx":"b017d4894f35","src/screens/PharmacyInventory.jsx":"9a9e157730a5","src/screens/PharmacyScreens.jsx":"661532af2442","src/screens/SharedScreens.jsx":"d0d77e22b334","src/tweaks-panel.jsx":"22c052960f83","src/widgets.jsx":"9ecbfaa7c957"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MRASDesignSystem_019e16 = window.MRASDesignSystem_019e16 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/Banner/Banner.jsx
try { (() => {
// MRAS · Banner — page-level callout.

function Banner({
  tone = 'info',
  icon,
  title,
  children,
  style
}) {
  const map = {
    info: {
      bg: 'var(--info-bg)',
      bd: '#BFDBFE',
      fg: 'var(--info-fg)',
      ic: 'var(--info)',
      di: icon || 'info'
    },
    warning: {
      bg: 'var(--warning-bg)',
      bd: '#FDE68A',
      fg: 'var(--warning-fg)',
      ic: 'var(--warning)',
      di: icon || 'warning'
    },
    danger: {
      bg: 'var(--danger-bg)',
      bd: '#FECACA',
      fg: 'var(--danger-fg)',
      ic: 'var(--danger)',
      di: icon || 'priority_high'
    },
    success: {
      bg: 'var(--success-bg)',
      bd: '#A7F3D0',
      fg: 'var(--success-fg)',
      ic: 'var(--success)',
      di: icon || 'check_circle'
    }
  };
  const t = map[tone] || map.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: t.bg,
      border: `1px solid ${t.bd}`,
      color: t.fg,
      font: '400 13px var(--font-sans)',
      lineHeight: 1.45,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ms is-20",
    style: {
      color: t.ic,
      marginTop: 1,
      flex: '0 0 auto'
    }
  }, t.di), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)',
      fontWeight: 600
    }
  }, title), title && ' ', children));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Banner/Banner.jsx", error: String((e && e.message) || e) }); }

// components/Button/Button.jsx
try { (() => {
// MRAS · Button — primary action control.
// Pure JSX (no MUI). Renders from design tokens in colors_and_type.css.

function Button({
  kind = 'primary',
  size = 'md',
  icon,
  children,
  disabled,
  onClick,
  style
}) {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    font: '500 14px var(--font-sans)',
    borderRadius: 'var(--radius-md)',
    padding: '0 16px',
    height: 36,
    whiteSpace: 'nowrap',
    transition: 'background var(--dur-micro) var(--ease-std), filter var(--dur-micro) var(--ease-std)',
    opacity: disabled ? 0.4 : 1
  };
  const kinds = {
    primary: {
      background: 'var(--primary)',
      color: 'var(--fg-on-primary)'
    },
    secondary: {
      background: 'var(--surface-1)',
      color: 'var(--fg-1)',
      border: '1px solid var(--border-2)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--primary)'
    },
    danger: {
      background: 'var(--danger)',
      color: '#fff'
    }
  };
  const sizes = {
    sm: {
      height: 28,
      fontSize: 13,
      padding: '0 12px',
      borderRadius: 'var(--radius-sm)'
    },
    md: {},
    lg: {
      height: 44,
      fontSize: 15,
      padding: '0 20px'
    }
  };
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    style: {
      ...base,
      ...kinds[kind],
      ...sizes[size],
      ...style
    },
    onMouseDown: e => {
      if (!disabled) e.currentTarget.style.filter = 'brightness(0.92)';
    },
    onMouseUp: e => {
      e.currentTarget.style.filter = '';
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = '';
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "ms is-20"
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Button/Button.jsx", error: String((e && e.message) || e) }); }

// components/Chip/Chip.jsx
try { (() => {
// MRAS · Chip — compact status / risk pill.

function Chip({
  tone = 'neutral',
  icon,
  dot,
  children,
  style
}) {
  const map = {
    low: {
      bg: 'var(--risk-low-bg)',
      fg: 'var(--success-fg)',
      dotC: 'var(--risk-low)'
    },
    moderate: {
      bg: 'var(--risk-moderate-bg)',
      fg: 'var(--warning-fg)',
      dotC: 'var(--risk-moderate)'
    },
    high: {
      bg: 'var(--risk-high-bg)',
      fg: 'var(--danger-fg)',
      dotC: 'var(--risk-high)'
    },
    info: {
      bg: 'var(--info-bg)',
      fg: 'var(--info-fg)',
      dotC: 'var(--info)'
    },
    success: {
      bg: 'var(--success-bg)',
      fg: 'var(--success-fg)',
      dotC: 'var(--success)'
    },
    warning: {
      bg: 'var(--warning-bg)',
      fg: 'var(--warning-fg)',
      dotC: 'var(--warning)'
    },
    danger: {
      bg: 'var(--danger-bg)',
      fg: 'var(--danger-fg)',
      dotC: 'var(--danger)'
    },
    neutral: {
      bg: 'var(--slate-100)',
      fg: 'var(--fg-2)',
      dotC: 'var(--slate-400)'
    }
  };
  const t = map[tone] || map.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '500 12px var(--font-sans)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: t.dotC
    }
  }), icon && /*#__PURE__*/React.createElement("span", {
    className: "ms is-20",
    style: {
      fontSize: 14,
      color: t.dotC
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/Chip/Chip.jsx", error: String((e && e.message) || e) }); }

// components/JrissiGauge/JrissiGauge.jsx
try { (() => {
// MRAS · JrissiGauge — doctor-only circular mental-health risk dial (0–100).

function JrissiGauge({
  score,
  size = 160
}) {
  const tone = score < 34 ? 'low' : score < 67 ? 'moderate' : 'high';
  const colorMap = {
    low: 'var(--risk-low)',
    moderate: 'var(--risk-moderate)',
    high: 'var(--risk-high)'
  };
  const labelMap = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High'
  };
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: "var(--border-1)",
    strokeWidth: "12",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: colorMap[tone],
    strokeWidth: "12",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: off
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 34px var(--font-mono)',
      color: 'var(--fg-1)',
      lineHeight: 1
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 10px var(--font-sans)',
      color: colorMap[tone],
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 4
    }
  }, labelMap[tone])));
}
Object.assign(__ds_scope, { JrissiGauge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/JrissiGauge/JrissiGauge.jsx", error: String((e && e.message) || e) }); }

// components/RoleAvatar/RoleAvatar.jsx
try { (() => {
// MRAS · RoleAvatar — accent-coloured initials avatar for role attribution.

function RoleAvatar({
  name,
  role = 'doctor',
  size = 32,
  style
}) {
  const roleColor = {
    doctor: 'var(--role-doctor)',
    employee: 'var(--role-employee)',
    pharmacy: 'var(--role-pharmacy)',
    admin: 'var(--role-admin)'
  }[role] || 'var(--primary)';
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      background: roleColor,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: `600 ${Math.round(size * 0.4)}px var(--font-sans)`,
      flex: '0 0 auto',
      ...style
    }
  }, initials);
}
Object.assign(__ds_scope, { RoleAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/RoleAvatar/RoleAvatar.jsx", error: String((e && e.message) || e) }); }

// components/StatTile/StatTile.jsx
try { (() => {
// MRAS · StatTile — clinical readout cell used across dashboards.

function StatTile({
  icon,
  label,
  value,
  unit,
  delta,
  deltaTone = 'neutral',
  style
}) {
  const dc = deltaTone === 'good' ? 'var(--success-fg)' : deltaTone === 'bad' ? 'var(--danger-fg)' : 'var(--fg-3)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '600 12px var(--font-sans)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--fg-3)'
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "ms is-20",
    style: {
      fontSize: 16,
      color: 'var(--primary)'
    }
  }, icon), label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 22px var(--font-mono)',
      color: 'var(--fg-1)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-sans)',
      color: 'var(--fg-3)',
      marginLeft: 3
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px var(--font-mono)',
      color: dc
    }
  }, delta));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/StatTile/StatTile.jsx", error: String((e && e.message) || e) }); }

// src/App.jsx
try { (() => {
/* eslint-disable */
// MRAS Design System — main showcase composition

// ---------- Tweaks defaults (persisted via __edit_mode_set_keys) -------------
const MRAS_TWEAKS = /*EDITMODE-BEGIN*/{
  "darkMode": false
} /*EDITMODE-END*/;

// ---------- Theme controller (toggles [data-theme] on the root) --------------
function useThemeController(dark) {
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
}

// ---------- Tweaks panel binding --------------------------------------------
function MrasTweaksPanel() {
  // useTweaks is provided by tweaks-panel.jsx
  const [t, setTweak] = useTweaks(MRAS_TWEAKS);
  useThemeController(t.darkMode);
  return /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    title: "Theme"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Dark mode",
    value: t.darkMode,
    onChange: v => setTweak('darkMode', v)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: 10,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      font: '400 12px var(--font-sans)',
      color: 'var(--fg-3)',
      lineHeight: 1.45
    }
  }, "Toggles ", /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--fg-2)'
    }
  }, "[data-theme]"), " on the root. All tokens flow from a single CSS variable map \u2014 colours, borders, shadows reassign in one place.")));
}

// ---------- Light wrapper to give each artboard correct background ----------
const ABG = {
  background: 'var(--bg-canvas)',
  borderRadius: 12,
  border: '1px solid var(--border-1)',
  overflow: 'hidden'
};

// ---------- App --------------------------------------------------------------
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalAnims, null), /*#__PURE__*/React.createElement(MrasTweaksPanel, null), /*#__PURE__*/React.createElement(DesignCanvas, null, /*#__PURE__*/React.createElement(DCSection, {
    id: "intro",
    title: "MRAS v3.0 \u2014 Design System & UI Kit",
    subtitle: "Intelligent Predictive Health Platform \xB7 React 18 + TypeScript + MUI handoff \xB7 FastAPI 0.115+ backend"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "cover",
    label: "Cover \xB7 brand",
    width: 1280,
    height: 520
  }, /*#__PURE__*/React.createElement(CoverArtboard, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "contents",
    label: "What\\u2019s inside",
    width: 720,
    height: 520
  }, /*#__PURE__*/React.createElement(ContentsArtboard, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "brand",
    title: "Brand & content",
    subtitle: "Logo, content voice, copywriting do\\u2019s & don\\u2019ts"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "logo",
    label: "Wordmark & monogram",
    width: 760,
    height: 560
  }, /*#__PURE__*/React.createElement(BrandLogo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "voice",
    label: "Voice & tone",
    width: 840,
    height: 560
  }, /*#__PURE__*/React.createElement(ContentVoice, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "color",
    title: "Colour",
    subtitle: "Tokens \xB7 semantic roles \xB7 JRISSI risk \xB7 persona accents"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "teal",
    label: "Primary \xB7 teal",
    width: 920,
    height: 260
  }, /*#__PURE__*/React.createElement(ColorScale, {
    name: "Teal \xB7 primary",
    stops: [{
      step: 50,
      value: '#F0FDFA'
    }, {
      step: 100,
      value: '#CCFBF1'
    }, {
      step: 200,
      value: '#99F6E4'
    }, {
      step: 300,
      value: '#5EEAD4'
    }, {
      step: 400,
      value: '#2DD4BF'
    }, {
      step: 500,
      value: '#14B8A6'
    }, {
      step: 600,
      value: '#0F766E'
    }, {
      step: 700,
      value: '#115E59'
    }, {
      step: 800,
      value: '#134E4A'
    }, {
      step: 900,
      value: '#0B3F3C'
    }]
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "slate",
    label: "Neutrals \xB7 slate",
    width: 920,
    height: 260
  }, /*#__PURE__*/React.createElement(ColorScale, {
    name: "Slate \xB7 neutrals",
    stops: [{
      step: 0,
      value: '#FFFFFF'
    }, {
      step: 50,
      value: '#F8FAFC'
    }, {
      step: 100,
      value: '#F1F5F9'
    }, {
      step: 200,
      value: '#E2E8F0'
    }, {
      step: 300,
      value: '#CBD5E1'
    }, {
      step: 400,
      value: '#94A3B8'
    }, {
      step: 500,
      value: '#64748B'
    }, {
      step: 600,
      value: '#475569'
    }, {
      step: 700,
      value: '#334155'
    }, {
      step: 800,
      value: '#1E293B'
    }]
  })), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "semantic",
    label: "Semantic roles",
    width: 920,
    height: 420
  }, /*#__PURE__*/React.createElement(SemanticColors, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "roles",
    label: "Persona accents",
    width: 760,
    height: 300
  }, /*#__PURE__*/React.createElement(RoleColors, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "risk",
    label: "JRISSI risk scale",
    width: 760,
    height: 360
  }, /*#__PURE__*/React.createElement(RiskScale, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "type",
    title: "Type",
    subtitle: "IBM Plex Sans + Mono \xB7 clinical-data-grade legibility"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "typescale",
    label: "Type scale",
    width: 1100,
    height: 760
  }, /*#__PURE__*/React.createElement(TypeSpecimen, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "layout",
    title: "Spacing, radius, shadow, motion",
    subtitle: "Layout primitives"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "spacing",
    label: "Spacing \xB7 4 px base",
    width: 520,
    height: 580
  }, /*#__PURE__*/React.createElement(SpacingScale, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "radius",
    label: "Radius",
    width: 760,
    height: 300
  }, /*#__PURE__*/React.createElement(RadiusScale, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "shadow",
    label: "Shadow scale",
    width: 760,
    height: 340
  }, /*#__PURE__*/React.createElement(ShadowScale, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "motion",
    label: "Motion \xB7 duration & easing",
    width: 760,
    height: 320
  }, /*#__PURE__*/React.createElement(MotionTokens, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "icons",
    title: "Iconography",
    subtitle: "Material Symbols Rounded \xB7 weight 400 \xB7 fill 0"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ms",
    label: "Material Symbols (sample)",
    width: 1100,
    height: 460
  }, /*#__PURE__*/React.createElement(IconographyShowcase, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comp-action",
    title: "Components \xB7 actions",
    subtitle: "Buttons, chips, banners, cards"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "buttons",
    label: "Buttons",
    width: 1000,
    height: 460
  }, /*#__PURE__*/React.createElement(ButtonsDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "chips",
    label: "Chips & banners",
    width: 760,
    height: 560
  }, /*#__PURE__*/React.createElement(ChipsBanners, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "cards",
    label: "Cards",
    width: 1100,
    height: 460
  }, /*#__PURE__*/React.createElement(CardsDemo, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comp-input",
    title: "Components \xB7 inputs & forms",
    subtitle: "Text inputs, selects, toggles, tabs, dates, file upload"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "inputs",
    label: "Inputs & controls",
    width: 1000,
    height: 680
  }, /*#__PURE__*/React.createElement(FormControlsDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "dates",
    label: "Date picker",
    width: 840,
    height: 480
  }, /*#__PURE__*/React.createElement(CalendarDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "upload",
    label: "File upload",
    width: 620,
    height: 460
  }, /*#__PURE__*/React.createElement(FileUploadDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "stepper",
    label: "Multi-step wizard",
    width: 840,
    height: 420
  }, /*#__PURE__*/React.createElement(StepperDemo, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comp-data",
    title: "Components \xB7 data",
    subtitle: "Tables & charts"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "table",
    label: "Data table \xB7 sortable, filter, pagination",
    width: 1200,
    height: 560
  }, /*#__PURE__*/React.createElement(DataTableDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "charts",
    label: "Charts \xB7 lines, bars, donut, sparklines",
    width: 1200,
    height: 620
  }, /*#__PURE__*/React.createElement(ChartsDemo, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comp-over",
    title: "Components \xB7 overlays & feedback",
    subtitle: "Modals, drawers, toasts, command palette"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "modal",
    label: "Confirmation modal",
    width: 760,
    height: 520
  }, /*#__PURE__*/React.createElement(ModalDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "drawer",
    label: "Side drawer \xB7 patient quick-view",
    width: 760,
    height: 580
  }, /*#__PURE__*/React.createElement(DrawerDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "toast",
    label: "Toasts",
    width: 920,
    height: 360
  }, /*#__PURE__*/React.createElement(ToastsDemo, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "cmdk",
    label: "Command palette",
    width: 760,
    height: 540
  }, /*#__PURE__*/React.createElement(CommandPaletteDemo, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "comp-states",
    title: "Components \xB7 states",
    subtitle: "Empty \xB7 loading \xB7 error \xB7 skeleton"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "states",
    label: "State patterns",
    width: 1200,
    height: 420
  }, /*#__PURE__*/React.createElement(StatesDemo, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "doctor",
    title: "Screens \xB7 doctor",
    subtitle: "Lead clinician \u2014 dashboard, patient record, SOAP, prescription, JRISSI, forecasting"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-dash",
    label: "Dashboard",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "dashboard",
    height: 900
  }, /*#__PURE__*/React.createElement(DoctorDashboard, {
    onOpenPatient: () => {}
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-rec",
    label: "Patient record",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "patients",
    height: 900
  }, /*#__PURE__*/React.createElement(PatientRecord, {
    patientId: "E-002417",
    onBack: () => {}
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-soap",
    label: "SOAP consultation editor",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "consultations",
    height: 900
  }, /*#__PURE__*/React.createElement(SoapEditor, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-rx",
    label: "Prescription writer \xB7 interaction check",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "consultations",
    height: 900
  }, /*#__PURE__*/React.createElement(PrescriptionWriter, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-jr",
    label: "JRISSI deep-dive",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "jrissi",
    height: 1100
  }, /*#__PURE__*/React.createElement(JrissiDeepDive, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-ai",
    label: "JRISSI / AI \xB7 scores & predictions",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "ai",
    height: 1100
  }, /*#__PURE__*/React.createElement(JrissiAiOverview, {
    onOpenPatient: () => {}
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "doc-fc",
    label: "Predictive forecasting",
    width: 1440,
    height: 1000
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "forecasts",
    height: 1000
  }, /*#__PURE__*/React.createElement(ForecastingView, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "employee",
    title: "Screens \xB7 employee",
    subtitle: "Self-service \u2014 wellness home, scheduling, QR check-in, kiosk"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "emp-home",
    label: "Wellness home \xB7 timeline",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "employee",
    screen: "home",
    height: 1100
  }, /*#__PURE__*/React.createElement(EmployeeWellness, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "emp-sched",
    label: "Appointment scheduling",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "employee",
    screen: "checkin",
    height: 900
  }, /*#__PURE__*/React.createElement(AppointmentScheduling, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "emp-kiosk",
    label: "Kiosk \xB7 QR check-in (large display)",
    width: 920,
    height: 720
  }, /*#__PURE__*/React.createElement(KioskCheckIn, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "emp-orig",
    label: "Employee home (original)",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "employee",
    screen: "home",
    height: 900
  }, /*#__PURE__*/React.createElement(EmployeeHome, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "pharmacy",
    title: "Screens \xB7 pharmacy",
    subtitle: "Stock & dispensing \u2014 dashboard, inventory, GRN receive, FEFO expiry watch"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ph-dash",
    label: "Dashboard",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "pharmacy",
    screen: "dashboard",
    height: 900
  }, /*#__PURE__*/React.createElement(PharmacyDashboard, {
    onOpenInventory: () => {}
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ph-inv",
    label: "Inventory",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "pharmacy",
    screen: "inventory",
    height: 900
  }, /*#__PURE__*/React.createElement(PharmacyInventory, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ph-grn",
    label: "GRN \xB7 receive stock (5-step)",
    width: 1440,
    height: 1000
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "pharmacy",
    screen: "grn",
    height: 1000
  }, /*#__PURE__*/React.createElement(GrnReceive, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ph-exp",
    label: "Expiry watch \xB7 FEFO",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "pharmacy",
    screen: "expiry",
    height: 900
  }, /*#__PURE__*/React.createElement(ExpiryWatch, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "admin",
    title: "Screens \xB7 admin",
    subtitle: "System owner \u2014 console, users & roles, audit log, reports"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ad-con",
    label: "Console",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "admin",
    screen: "console",
    height: 900
  }, /*#__PURE__*/React.createElement(AdminDashboard, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ad-users",
    label: "Users & roles",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "admin",
    screen: "users",
    height: 900
  }, /*#__PURE__*/React.createElement(AdminUsers, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ad-audit",
    label: "Audit log",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "admin",
    screen: "audit",
    height: 900
  }, /*#__PURE__*/React.createElement(AuditLog, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "ad-rep",
    label: "Reports & analytics",
    width: 1440,
    height: 1000
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "admin",
    screen: "services",
    height: 1000
  }, /*#__PURE__*/React.createElement(ReportsAnalytics, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "shared",
    title: "Screens \xB7 shared",
    subtitle: "Notifications center, settings, account"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-notif",
    label: "Notifications \xB7 closed-loop",
    width: 1440,
    height: 1000
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "dashboard",
    height: 1000
  }, /*#__PURE__*/React.createElement(NotificationsCenter, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set",
    label: "Settings \xB7 profile",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 1100
  }, /*#__PURE__*/React.createElement(SettingsProfile, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set-sec",
    label: "Settings \xB7 security",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 1100
  }, /*#__PURE__*/React.createElement(SettingsScreenWith, {
    tab: "security"
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set-not",
    label: "Settings \xB7 notifications",
    width: 1440,
    height: 1000
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 1000
  }, /*#__PURE__*/React.createElement(SettingsScreenWith, {
    tab: "notifications"
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set-priv",
    label: "Settings \xB7 privacy & PHI",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 1100
  }, /*#__PURE__*/React.createElement(SettingsScreenWith, {
    tab: "privacy"
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set-int",
    label: "Settings \xB7 integrations",
    width: 1440,
    height: 900
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 900
  }, /*#__PURE__*/React.createElement(SettingsScreenWith, {
    tab: "integrations"
  }))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "sh-set-pref",
    label: "Settings \xB7 preferences",
    width: 1440,
    height: 1100
  }, /*#__PURE__*/React.createElement(ScreenFrame, {
    role: "doctor",
    screen: "reports",
    height: 1100
  }, /*#__PURE__*/React.createElement(SettingsScreenWith, {
    tab: "preferences"
  })))), /*#__PURE__*/React.createElement(DCSection, {
    id: "auth",
    title: "Screens \xB7 authentication",
    subtitle: "Login, sign-up & first-run onboarding \xB7 both modes"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-login",
    label: "Sign in",
    width: 1280,
    height: 780
  }, /*#__PURE__*/React.createElement("div", {
    style: ABG
  }, /*#__PURE__*/React.createElement(MrasLogin, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-signup",
    label: "Create account \xB7 with validation",
    width: 1280,
    height: 820
  }, /*#__PURE__*/React.createElement("div", {
    style: ABG
  }, /*#__PURE__*/React.createElement(MrasSignUp, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-reg",
    label: "Onboarding \xB7 register (4-step)",
    width: 1280,
    height: 900
  }, /*#__PURE__*/React.createElement("div", {
    style: ABG
  }, /*#__PURE__*/React.createElement(MrasRegister, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-signup-dark",
    label: "Create account \xB7 forced dark",
    width: 1280,
    height: 820
  }, /*#__PURE__*/React.createElement("div", {
    "data-theme": "dark",
    style: ABG
  }, /*#__PURE__*/React.createElement(MrasSignUp, null))), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "auth-login-dark",
    label: "Sign in \xB7 forced dark",
    width: 1280,
    height: 780
  }, /*#__PURE__*/React.createElement("div", {
    "data-theme": "dark",
    style: ABG
  }, /*#__PURE__*/React.createElement(MrasLogin, null)))), /*#__PURE__*/React.createElement(DCSection, {
    id: "handoff",
    title: "Handoff \u2014 for Claude Code & your repo",
    subtitle: "Component specs, token reference, MUI theme, FastAPI \u2194 frontend contract notes"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "hi",
    label: "Read me first",
    width: 1080,
    height: 620
  }, /*#__PURE__*/React.createElement(HandoffIntro, null)))));
}

// ---------- Intro artboards --------------------------------------------------
function CoverArtboard() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--teal-800) 0%, var(--teal-900) 60%, #062321 100%)',
      color: '#fff',
      padding: 48,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.06
    },
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "cg",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 0L0 0 0 40",
    stroke: "white",
    strokeWidth: "0.5",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#cg)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -120,
      top: -120,
      width: 480,
      height: 480,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasMark || "assets/mras-mark.svg",
    alt: "",
    style: {
      height: 36,
      filter: 'brightness(0) invert(1)'
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.16em',
      opacity: 0.7
    }
  }, "MRAS v3.0 \xB7 Design System"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 14px var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: 'var(--teal-300)'
    }
  }, "Predict. Prevent. Personalise."), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: '600 56px var(--font-sans)',
      lineHeight: 1.05,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 900
    }
  }, "Intelligent predictive health, for the corporate medical room."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 17px var(--font-sans)',
      lineHeight: 1.5,
      color: 'rgba(255,255,255,0.75)',
      maxWidth: 720,
      margin: 0
    }
  }, "Tokens, components and full UI kit for four roles \u2014 doctor, employee, pharmacy, admin \u2014 over one shared interface. Tuned for React 18 + TypeScript + MUI, wired for a FastAPI 0.115+ backend.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, [{
    k: 'Foundation',
    v: '124 tokens',
    s: 'Colour · type · spacing · radius · shadow · motion'
  }, {
    k: 'Components',
    v: '30+ patterns',
    s: 'Buttons through command palette · React + MUI handoff'
  }, {
    k: 'Screens',
    v: '16 surfaces',
    s: 'Four roles · dashboards · flows · kiosk'
  }, {
    k: 'Theme',
    v: 'Light + dark',
    s: 'Single CSS-var swap · WCAG AA on both'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '14px 16px',
      borderRadius: 10,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      backdropFilter: 'blur(8px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 11px var(--font-mono)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      opacity: 0.65
    }
  }, s.k), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 18px var(--font-sans)',
      marginTop: 6
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '400 12px var(--font-sans)',
      marginTop: 4,
      opacity: 0.7,
      lineHeight: 1.4
    }
  }, s.s)))));
}
function ContentsArtboard() {
  const sections = [{
    n: '01',
    t: 'Brand &amp; content',
    s: 'Logo · voice · do\u2019s &amp; don\u2019ts'
  }, {
    n: '02',
    t: 'Colour',
    s: 'Teal · slate · semantic · JRISSI risk'
  }, {
    n: '03',
    t: 'Type',
    s: 'IBM Plex Sans &amp; Mono · 11-step scale'
  }, {
    n: '04',
    t: 'Spacing, radius, shadow, motion',
    s: '4 px base · Material easing'
  }, {
    n: '05',
    t: 'Iconography',
    s: 'Material Symbols Rounded'
  }, {
    n: '06',
    t: 'Components',
    s: '30+ — actions, inputs, data, overlays, states'
  }, {
    n: '07',
    t: 'Doctor screens',
    s: 'Dashboard · SOAP · Rx · JRISSI · forecasting'
  }, {
    n: '08',
    t: 'Employee screens',
    s: 'Wellness · scheduling · kiosk'
  }, {
    n: '09',
    t: 'Pharmacy screens',
    s: 'Inventory · GRN · FEFO expiry watch'
  }, {
    n: '10',
    t: 'Admin screens',
    s: 'Console · users · audit · reports'
  }, {
    n: '11',
    t: 'Shared',
    s: 'Notifications · settings'
  }, {
    n: '12',
    t: 'Handoff',
    s: 'Specs · tokens · MUI theme · FastAPI contract'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 36,
      background: 'var(--bg-canvas)',
      height: '100%',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Contents"), /*#__PURE__*/React.createElement("h2", {
    className: "type-display-m",
    style: {
      marginBottom: 28
    }
  }, "What\\u2019s inside"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, sections.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      padding: '12px 14px',
      borderRadius: 8,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--primary)',
      fontSize: 13,
      minWidth: 24
    }
  }, s.n), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    },
    dangerouslySetInnerHTML: {
      __html: s.t
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    },
    dangerouslySetInnerHTML: {
      __html: s.s
    }
  }))))));
}
function HandoffIntro() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 32,
      background: 'var(--bg-canvas)',
      height: '100%',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "For engineering"), /*#__PURE__*/React.createElement("h2", {
    className: "type-h1",
    style: {
      marginBottom: 8
    }
  }, "Handoff package"), /*#__PURE__*/React.createElement("p", {
    className: "type-body-l",
    style: {
      marginBottom: 24,
      maxWidth: 720
    }
  }, "Everything you need to wire this UI kit into your React 18 + TypeScript + MUI codebase, against the FastAPI 0.115+ backend. Read in order."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, [{
    i: 'menu_book',
    t: 'README.md',
    d: 'Architecture overview, install steps, file map. Start here.',
    f: 'handoff/README.md'
  }, {
    i: 'palette',
    t: 'tokens.md',
    d: 'Every CSS variable with description, scale step, and MUI mapping.',
    f: 'handoff/tokens.md'
  }, {
    i: 'widgets',
    t: 'components.md',
    d: 'Component-by-component spec: props, anatomy, states, do\u2019s and don\u2019ts.',
    f: 'handoff/components.md'
  }, {
    i: 'cable',
    t: 'api-contracts.md',
    d: 'Frontend ↔ FastAPI contract notes. Endpoints, schemas, role gating.',
    f: 'handoff/api-contracts.md'
  }, {
    i: 'palette',
    t: 'theme.ts (MUI)',
    d: 'Drop-in MUI theme: palette, typography, shape, components overrides.',
    f: 'handoff/mui/theme.ts.txt'
  }, {
    i: 'inventory_2',
    t: 'MrasComponents.tsx',
    d: 'Typed wrappers (Chip, Banner, JrissiGauge, DataTable…) over MUI primitives.',
    f: 'handoff/mui/MrasComponents.tsx.txt'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      padding: 16,
      borderRadius: 10,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: 'var(--primary-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.i,
    size: 24,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, r.t), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginTop: 4
    }
  }, r.d), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)',
      marginTop: 6
    }
  }, r.f))))), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    title: "Designed for Claude Code."
  }, "Open the ", /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      font: '500 12px var(--font-mono)'
    }
  }, "handoff/"), " folder in Claude Code with this prompt:", /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      display: 'block',
      marginTop: 6,
      padding: 8,
      borderRadius: 6,
      background: 'var(--surface-1)',
      color: 'var(--fg-1)'
    }
  }, "Read handoff/README.md and follow the build plan. Generate the MUI theme & wrappers, scaffold the role-aware routing, and stub out a couple of FastAPI fetchers.")));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/App.jsx", error: String((e && e.message) || e) }); }

// src/Chrome.jsx
try { (() => {
/* eslint-disable */
// MRAS Dashboard chrome — app bar, sidebar, role switcher

const NAV_BY_ROLE = {
  doctor: [{
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  }, {
    id: 'patients',
    icon: 'groups',
    label: 'Patients'
  }, {
    id: 'consultations',
    icon: 'stethoscope',
    label: 'Consultations'
  }, {
    id: 'jrissi',
    icon: 'psychology',
    label: 'JRISSI watch'
  }, {
    id: 'ai',
    icon: 'auto_awesome',
    label: 'JRISSI / AI'
  }, {
    id: 'forecasts',
    icon: 'insights',
    label: 'Forecasts'
  }, {
    id: 'reports',
    icon: 'description',
    label: 'Reports'
  }],
  employee: [{
    id: 'home',
    icon: 'home',
    label: 'Home'
  }, {
    id: 'checkin',
    icon: 'qr_code_2',
    label: 'Check-in'
  }, {
    id: 'health',
    icon: 'monitor_heart',
    label: 'My health'
  }, {
    id: 'history',
    icon: 'history',
    label: 'History'
  }],
  pharmacy: [{
    id: 'dashboard',
    icon: 'dashboard',
    label: 'Dashboard'
  }, {
    id: 'inventory',
    icon: 'pill',
    label: 'Inventory'
  }, {
    id: 'grn',
    icon: 'inventory_2',
    label: 'GRN'
  }, {
    id: 'expiry',
    icon: 'schedule',
    label: 'Expiry watch'
  }, {
    id: 'reports',
    icon: 'description',
    label: 'Reports'
  }],
  admin: [{
    id: 'console',
    icon: 'dashboard',
    label: 'Console'
  }, {
    id: 'users',
    icon: 'group',
    label: 'Users & roles'
  }, {
    id: 'audit',
    icon: 'fact_check',
    label: 'Audit log'
  }, {
    id: 'services',
    icon: 'cloud',
    label: 'Services'
  }, {
    id: 'settings',
    icon: 'settings',
    label: 'Settings'
  }]
};
const ROLE_META = {
  doctor: {
    name: 'Dr. Withana',
    accent: 'var(--role-doctor)',
    sub: 'Lead clinician'
  },
  employee: {
    name: 'B.W.S.S. Nawarathna',
    accent: 'var(--role-employee)',
    sub: 'Engineering · SIS/24/B2/39'
  },
  pharmacy: {
    name: 'L. Koralage',
    accent: 'var(--role-pharmacy)',
    sub: 'Pharmacy staff'
  },
  admin: {
    name: 'D. Anuradha',
    accent: 'var(--role-admin)',
    sub: 'System administrator'
  }
};
function AppBar({
  role,
  onRoleChange,
  onMenu
}) {
  const meta = ROLE_META[role];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'var(--appbar-h)',
      borderBottom: '1px solid var(--border-1)',
      background: 'rgba(248, 250, 252, 0.85)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onMenu,
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      width: 36,
      height: 36,
      borderRadius: 8,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "menu",
    size: 20
  })), /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 8,
      padding: '0 12px',
      width: 280,
      height: 34
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search patients, drugs, IDs\u2026",
    style: {
      border: 0,
      outline: 'none',
      flex: 1,
      font: '400 13px var(--font-sans)',
      background: 'transparent',
      color: 'var(--fg-1)'
    }
  }), /*#__PURE__*/React.createElement("kbd", {
    style: {
      font: '500 10px var(--font-mono)',
      color: 'var(--fg-3)',
      border: '1px solid var(--border-1)',
      borderRadius: 4,
      padding: '1px 5px'
    }
  }, "\u2318K")), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      width: 36,
      height: 36,
      borderRadius: 8,
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "notifications",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 6,
      right: 7,
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--danger)',
      boxShadow: '0 0 0 2px var(--bg-canvas)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: role,
    onChange: e => onRoleChange(e.target.value),
    style: {
      border: '1px solid var(--border-2)',
      borderRadius: 8,
      padding: '6px 10px',
      font: '500 12px var(--font-sans)',
      color: 'var(--fg-2)',
      background: 'var(--surface-1)',
      outline: 'none'
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "doctor"
  }, "Doctor view"), /*#__PURE__*/React.createElement("option", {
    value: "employee"
  }, "Employee view"), /*#__PURE__*/React.createElement("option", {
    value: "pharmacy"
  }, "Pharmacy view"), /*#__PURE__*/React.createElement("option", {
    value: "admin"
  }, "Admin view")), /*#__PURE__*/React.createElement(Avatar, {
    name: meta.name,
    size: 32,
    color: meta.accent
  })));
}
function Sidebar({
  role,
  screen,
  onNavigate,
  collapsed
}) {
  const items = NAV_BY_ROLE[role];
  const meta = ROLE_META[role];
  const w = collapsed ? 'var(--sidebar-w-c)' : 'var(--sidebar-w)';
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: w,
      flex: `0 0 ${w}`,
      borderRight: '1px solid var(--border-1)',
      background: 'var(--surface-1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'width var(--dur-medium) var(--ease-std)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 12px 4px',
      padding: collapsed ? '8px 8px' : '10px 12px',
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      minHeight: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      alignSelf: 'stretch',
      borderRadius: 3,
      background: meta.accent
    }
  }), !collapsed && /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, meta.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, meta.sub))), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 8px',
      gap: 2,
      flex: 1
    }
  }, items.map(it => {
    const active = it.id === screen;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onNavigate(it.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: collapsed ? '10px 0' : '10px 12px',
        justifyContent: collapsed ? 'center' : 'flex-start',
        border: 0,
        background: active ? 'var(--bg-selected)' : 'transparent',
        borderRadius: 8,
        cursor: 'pointer',
        color: active ? 'var(--primary-hover)' : 'var(--fg-2)',
        font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
        textAlign: 'left',
        position: 'relative',
        transition: 'background var(--dur-micro) var(--ease-std)'
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = 'var(--bg-hover)';
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = 'transparent';
      }
    }, active && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        top: 8,
        bottom: 8,
        width: 3,
        borderRadius: 3,
        background: 'var(--primary)'
      }
    }), /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 20,
      style: {
        color: active ? 'var(--primary)' : 'var(--fg-3)'
      }
    }), !collapsed && /*#__PURE__*/React.createElement("span", null, it.label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 12,
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: collapsed ? 'center' : 'flex-start',
      gap: 10,
      padding: collapsed ? 10 : '10px 12px',
      border: 0,
      borderRadius: 8,
      background: 'transparent',
      cursor: 'pointer',
      color: 'var(--fg-3)',
      font: '500 13px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 20
  }), !collapsed && 'Settings')));
}
Object.assign(window, {
  AppBar,
  Sidebar,
  NAV_BY_ROLE,
  ROLE_META
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/Chrome.jsx", error: String((e && e.message) || e) }); }

// src/ScreenFrame.jsx
try { (() => {
/* eslint-disable */
// Reusable frame: AppBar + Sidebar + scrollable body, sized for a fixed artboard.

function ScreenFrame({
  role = 'doctor',
  screen,
  children,
  height = 760,
  collapseSidebar = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg-canvas)',
      overflow: 'hidden',
      borderRadius: 12,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(AppBar, {
    role: role,
    onRoleChange: () => {},
    onMenu: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    role: role,
    screen: screen,
    onNavigate: () => {},
    collapsed: collapseSidebar
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      overflow: 'auto',
      padding: '24px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--content-max)',
      margin: '0 auto'
    }
  }, children))));
}

// Compact body — no sidebar, useful for modal-like screens in the canvas
function PlainFrame({
  children,
  height = 760
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      background: 'var(--bg-canvas)',
      borderRadius: 12,
      border: '1px solid var(--border-1)',
      overflow: 'auto'
    }
  }, children);
}
Object.assign(window, {
  ScreenFrame,
  PlainFrame
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/ScreenFrame.jsx", error: String((e && e.message) || e) }); }

// src/components.jsx
try { (() => {
/* eslint-disable */
// MRAS — component showcase artboards (for the design canvas)

// ---------------------------------------------------------------- Buttons demo
function ButtonsDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Action"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Buttons"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 18
    }
  }, [{
    kind: 'primary',
    label: 'Primary'
  }, {
    kind: 'secondary',
    label: 'Secondary'
  }, {
    kind: 'ghost',
    label: 'Ghost'
  }, {
    kind: 'danger',
    label: 'Danger'
  }].map((b, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, b.label), /*#__PURE__*/React.createElement(Button, {
    kind: b.kind,
    size: "sm",
    icon: "add"
  }, "Small"), /*#__PURE__*/React.createElement(Button, {
    kind: b.kind,
    icon: "add"
  }, "Default"), /*#__PURE__*/React.createElement(Button, {
    kind: b.kind,
    size: "lg",
    icon: "add"
  }, "Large")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 20,
      borderTop: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "In context"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "add"
  }, "New consultation"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "open_in_new"
  }, "Open record"), /*#__PURE__*/React.createElement(Button, {
    kind: "danger",
    icon: "cancel"
  }, "Escalate"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "check",
    size: "sm"
  }, "Sign"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm"
  }, "Cancel"))));
}

// ---------------------------------------------------------------- Chips & Banners
function ChipsBanners() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Status"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Chips & banners"), /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Risk chips"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "low",
    dot: true
  }, "Low \xB7 19"), /*#__PURE__*/React.createElement(Chip, {
    tone: "moderate",
    dot: true
  }, "Moderate \xB7 52"), /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "High \xB7 78")), /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Status chips"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "success",
    icon: "check_circle"
  }, "Healthy"), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning",
    icon: "schedule"
  }, "Expires 14d"), /*#__PURE__*/React.createElement(Chip, {
    tone: "danger",
    icon: "priority_high"
  }, "Stock-out"), /*#__PURE__*/React.createElement(Chip, {
    tone: "info",
    icon: "info"
  }, "Pre-visit ready"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "Draft")), /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Banners"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    title: "3 pre-visit briefings ready."
  }, "Open the queue to review before the 09:30 consultations begin."), /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    title: "Pollen levels forecast to rise Thursday."
  }, "3 employees with seasonal allergy history have been flagged."), /*#__PURE__*/React.createElement(Banner, {
    tone: "danger",
    title: "JRISSI sustained High for 14 days."
  }, "A. Perera (E-002417) requires escalation."), /*#__PURE__*/React.createElement(Banner, {
    tone: "success",
    title: "Prescription saved."
  }, "Sent to pharmacy queue.")));
}

// ---------------------------------------------------------------- Form controls
function FormControlsDemo() {
  const [t1, setT1] = React.useState('A. Perera');
  const [t2, setT2] = React.useState('');
  const [sel, setSel] = React.useState('engineering');
  const [tog, setTog] = React.useState(true);
  const [chk, setChk] = React.useState(true);
  const [date, setDate] = React.useState('2026-05-14');
  const [tab, setTab] = React.useState('subjective');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Forms"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Inputs & controls"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Patient name",
    value: t1,
    onChange: setT1,
    leading: "person",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Employee ID",
    value: "E-002417",
    leading: "badge",
    hint: "Auto-filled from scan"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Department",
    value: sel,
    onChange: setSel,
    options: [{
      value: 'engineering',
      label: 'Engineering'
    }, {
      value: 'hr',
      label: 'HR'
    }, {
      value: 'finance',
      label: 'Finance'
    }, {
      value: 'ops',
      label: 'Operations'
    }]
  }), /*#__PURE__*/React.createElement(DateField, {
    label: "Consultation date",
    value: date,
    onChange: setDate
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Dose",
    value: "",
    placeholder: "500 mg",
    leading: "medication",
    error: "Required for prescription",
    onChange: setT2
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Disabled",
    value: "Read-only",
    disabled: true
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "Plan",
    placeholder: "Continue antihistamine. Review JRISSI in 7 days.",
    rows: 3
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 28,
      marginTop: 24,
      paddingTop: 20,
      borderTop: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Toggle"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: tog,
    onChange: setTog,
    label: "Auto-send to pharmacy"
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: !tog,
    onChange: v => setTog(!v),
    label: "Compact rows"
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: false,
    disabled: true,
    label: "Two-factor (admin only)"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Checkbox"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: chk,
    onChange: setChk,
    label: "Acknowledge JRISSI alert"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: false,
    indeterminate: true,
    label: "3 of 8 patients selected"
  }), /*#__PURE__*/React.createElement(Checkbox, {
    checked: false,
    label: "Include in monthly report"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Tabs"), /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      value: 'subjective',
      label: 'Subjective',
      icon: 'edit_note',
      count: 1
    }, {
      value: 'objective',
      label: 'Objective',
      icon: 'monitor_heart'
    }, {
      value: 'assessment',
      label: 'Assessment',
      icon: 'psychology'
    }, {
      value: 'plan',
      label: 'Plan',
      icon: 'task_alt'
    }]
  }))));
}

// ---------------------------------------------------------------- DataTable demo
function DataTableDemo() {
  const rows = [{
    id: 'E-002417',
    name: 'A. Perera',
    dept: 'Engineering',
    jrissi: 78,
    last: '2026-05-12',
    flag: 'High'
  }, {
    id: 'E-002104',
    name: 'S. Fernando',
    dept: 'HR',
    jrissi: 52,
    last: '2026-05-09',
    flag: 'Moderate'
  }, {
    id: 'E-001998',
    name: 'D. Anuradha',
    dept: 'Engineering',
    jrissi: 31,
    last: '2026-05-13',
    flag: 'Low'
  }, {
    id: 'E-001890',
    name: 'P. Jayasinghe',
    dept: 'Operations',
    jrissi: 44,
    last: '2026-05-11',
    flag: 'Moderate'
  }, {
    id: 'E-001705',
    name: 'K. Silva',
    dept: 'Finance',
    jrissi: 19,
    last: '2026-05-14',
    flag: 'Low'
  }, {
    id: 'E-001602',
    name: 'M. Karunaratne',
    dept: 'Engineering',
    jrissi: 66,
    last: '2026-05-08',
    flag: 'Moderate'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 24px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Data"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, "Data table")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: "",
    placeholder: "Search\u2026",
    leading: "search",
    style: {
      width: 220
    },
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "filter_list"
  }, "Filter"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "add"
  }, "New"))), /*#__PURE__*/React.createElement(DataTable, {
    selectable: true,
    columns: [{
      key: 'id',
      label: 'Employee ID',
      sortable: true,
      mono: true,
      width: 130
    }, {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (v, r) => /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 10
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: v,
        size: 28,
        color: "var(--slate-500)"
      }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
        className: "type-label",
        style: {
          color: 'var(--fg-1)'
        }
      }, v), /*#__PURE__*/React.createElement("div", {
        className: "type-caption"
      }, r.dept)))
    }, {
      key: 'jrissi',
      label: 'JRISSI',
      sortable: true,
      align: 'right',
      mono: true
    }, {
      key: 'flag',
      label: 'Risk',
      render: v => /*#__PURE__*/React.createElement(Chip, {
        tone: v.toLowerCase(),
        dot: true
      }, v)
    }, {
      key: 'last',
      label: 'Last visit',
      sortable: true,
      mono: true,
      muted: true
    }, {
      key: 'actions',
      label: '',
      width: 40,
      render: () => /*#__PURE__*/React.createElement(Icon, {
        name: "more_horiz",
        size: 20,
        style: {
          color: 'var(--fg-3)'
        }
      })
    }],
    rows: rows,
    totalLabel: "6 of 1,284 employees",
    page: 1,
    pageCount: 214,
    onPage: () => {},
    onRowClick: () => {}
  }));
}

// ---------------------------------------------------------------- Toasts demo
function ToastsDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Feedback"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Toasts & alerts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Toast, {
    tone: "success",
    title: "Prescription saved.",
    description: "Sent to pharmacy queue \xB7 ETA 4 min.",
    onClose: () => {}
  }), /*#__PURE__*/React.createElement(Toast, {
    tone: "info",
    title: "Pre-visit briefing ready.",
    description: "A. Perera \xB7 open before 09:30.",
    onClose: () => {}
  }), /*#__PURE__*/React.createElement(Toast, {
    tone: "warning",
    title: "Stock low: amoxicillin 250 mg.",
    description: "6 packs remaining \xB7 expires 2026-07-12.",
    onClose: () => {}
  }), /*#__PURE__*/React.createElement(Toast, {
    tone: "danger",
    title: "Sync paused.",
    description: "Climate service unreachable. Retrying in 30 s.",
    onClose: () => {}
  })));
}

// ---------------------------------------------------------------- Stepper demo
function StepperDemo() {
  const [step, setStep] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Forms"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 24
    }
  }, "Multi-step wizard"), /*#__PURE__*/React.createElement(Stepper, {
    current: step,
    steps: ['Identify', 'Vitals', 'Assessment', 'Prescription', 'Sign']
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      padding: 20,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Step ", step + 1, " \xB7 ", ['Identify patient', 'Capture vitals', 'Subjective + objective', 'Prescription', 'Sign &amp; close'][step]), /*#__PURE__*/React.createElement("div", {
    className: "type-body",
    style: {
      marginBottom: 16
    }
  }, ['Scan the employee QR or search by name / ID.', 'Read vitals from the connected cuff &amp; thermometer. Manual entry available.', 'Record symptoms and assessment. JRISSI score auto-attached for doctor view.', 'Search drug catalog. Interactions checked against patient history in real-time.', 'Sign electronically. Record is locked and sent to the pharmacy queue.'][step]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "arrow_back",
    onClick: () => setStep(Math.max(0, step - 1))
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "arrow_forward",
    onClick: () => setStep(Math.min(4, step + 1))
  }, step === 4 ? 'Finish' : 'Continue'))));
}

// ---------------------------------------------------------------- Charts demo
function ChartsDemo() {
  const vitals = [118, 122, 119, 124, 121, 126, 123, 120, 128, 125, 122, 120, 119, 121];
  const days = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const dispensed = [42, 68, 51, 73, 88, 64, 55];
  const dayLbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Data viz"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Charts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Vitals \xB7 14 days",
    title: "Systolic BP",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "moderate",
      dot: true
    }, "Borderline")
  }), /*#__PURE__*/React.createElement(LineChart, {
    data: vitals,
    width: 420,
    height: 180,
    xLabels: days,
    unit: "",
    refLines: [{
      value: 130,
      label: 'Hypertension',
      color: 'var(--warning)'
    }]
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Pharmacy \xB7 this week",
    title: "Items dispensed"
  }), /*#__PURE__*/React.createElement(BarChart, {
    data: dispensed,
    labels: dayLbls,
    width: 300,
    height: 180
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Workforce \xB7 health",
    title: "JRISSI distribution"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Donut, {
    size: 130,
    thickness: 18,
    segments: [{
      value: 968,
      color: 'var(--success)'
    }, {
      value: 271,
      color: 'var(--warning)'
    }, {
      value: 45,
      color: 'var(--danger)'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(LegendRow, {
    color: "var(--success)",
    label: "Low",
    value: "968"
  }), /*#__PURE__*/React.createElement(LegendRow, {
    color: "var(--warning)",
    label: "Moderate",
    value: "271"
  }), /*#__PURE__*/React.createElement(LegendRow, {
    color: "var(--danger)",
    label: "High",
    value: "45"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginTop: 16
    }
  }, [{
    label: 'Heart rate',
    v: '72',
    u: 'bpm',
    d: [70, 72, 71, 74, 72, 71, 73, 72],
    c: 'var(--success)'
  }, {
    label: 'SpO₂',
    v: '98',
    u: '%',
    d: [98, 97, 98, 98, 97, 98, 98, 98],
    c: 'var(--success)'
  }, {
    label: 'Temp',
    v: '36.6',
    u: '°C',
    d: [36.5, 36.6, 36.7, 36.6, 36.6, 36.5, 36.6, 36.6],
    c: 'var(--primary)'
  }, {
    label: 'Steps',
    v: '7,432',
    u: '',
    d: [6500, 7200, 6800, 7400, 7100, 7300, 7400, 7432],
    c: 'var(--info)'
  }].map((t, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, t.label), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      marginBottom: 6
    }
  }, t.v, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--fg-3)',
      marginLeft: 4
    }
  }, t.u)), /*#__PURE__*/React.createElement(Sparkline, {
    data: t.d,
    width: 160,
    height: 32,
    color: t.c
  })))));
}
function LegendRow({
  color,
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 130
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      flex: 1,
      color: 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-1)'
    }
  }, value));
}

// ---------------------------------------------------------------- Modal demo
function ModalDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Overlay"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Modals & confirmation"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 20
    }
  }, "Use modals for destructive confirmations and short, focused tasks. For long forms, prefer the side drawer."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 360,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,23,42,0.5)',
      backdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 440,
      background: 'var(--surface-1)',
      borderRadius: 12,
      border: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      background: 'var(--danger-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "priority_high",
    size: 20,
    style: {
      color: 'var(--danger)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, "Escalate to occupational psychologist?"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginTop: 4
    }
  }, "A. Perera (E-002417) has sustained JRISSI High for 14 days. Escalation will notify the OH team and lock further changes pending review."))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    kind: "danger",
    icon: "forward"
  }, "Escalate")))));
}

// ---------------------------------------------------------------- Drawer demo
function DrawerDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Overlay"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Side drawer \xB7 patient quick-view"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 420,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,23,42,0.35)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 360,
      background: 'var(--surface-1)',
      borderLeft: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-3)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Patient quick-view"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "A. Perera",
    size: 40,
    color: "var(--slate-500)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, "A. Perera"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "E-002417 \xB7 Engineering")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "danger",
    title: "JRISSI 78 \xB7 High"
  }, "14-day sustained. Escalation recommended."), /*#__PURE__*/React.createElement(Card, {
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Latest vitals \xB7 12 May"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "BP"), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 16
    }
  }, "128/84")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "HR"), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 16
    }
  }, "76 bpm")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "Temp"), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 16
    }
  }, "36.7 \xB0C")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "SpO\u2082"), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 16
    }
  }, "97 %")))), /*#__PURE__*/React.createElement(Card, {
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Active flags"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "JRISSI High"), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning"
  }, "Asthma"), /*#__PURE__*/React.createElement(Chip, {
    tone: "info"
  }, "Allergy: pollen")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 14,
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    style: {
      flex: 1
    }
  }, "Close"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "open_in_new",
    style: {
      flex: 1
    }
  }, "Open record")))));
}

// ---------------------------------------------------------------- FileUpload demo
function FileUploadDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Inputs"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "File upload"), /*#__PURE__*/React.createElement(FileUpload, {
    label: "Attach lab reports or imaging",
    hint: "PDF, PNG, JPG up to 25 MB",
    files: [{
      name: 'CBC_2026-05-10.pdf',
      size: 184320,
      type: 'application/pdf'
    }, {
      name: 'chest-xray.png',
      size: 1843200,
      type: 'image/png'
    }]
  }));
}

// ---------------------------------------------------------------- Empty / Loading / Error
function StatesDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 States"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Empty \xB7 loading \xB7 error"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-canvas)',
      borderRadius: 10,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(EmptyState, {
    icon: "folder_open",
    title: "No consultations recorded yet.",
    description: "Records appear here once a doctor signs a consultation note for this employee.",
    action: /*#__PURE__*/React.createElement(Button, {
      kind: "ghost",
      icon: "add"
    }, "Start consultation")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-canvas)',
      borderRadius: 10,
      border: '1px solid var(--border-1)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Loading"), /*#__PURE__*/React.createElement(LoadingRows, {
    rows: 5
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-canvas)',
      borderRadius: 10,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(ErrorState, {
    title: "Couldn't reach the climate service.",
    description: "Forecast last updated 2 hours ago. Retrying automatically.",
    onRetry: () => {}
  }))));
}

// ---------------------------------------------------------------- Calendar demo
function CalendarDemo() {
  const [d, setD] = React.useState('2026-05-14');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Inputs"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Date picker"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(MiniCalendar, {
    value: d,
    onChange: setD,
    marks: {
      '2026-05-12': true,
      '2026-05-14': true,
      '2026-05-16': true,
      '2026-05-20': true,
      '2026-05-22': true
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement(DateField, {
    label: "Consultation date",
    value: d,
    onChange: setD,
    hint: "Marked dates have existing bookings"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Available slots \xB7 ", new Date(d).toLocaleDateString('en', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 6
    }
  }, ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    style: {
      padding: '8px 10px',
      borderRadius: 6,
      border: '1px solid var(--border-1)',
      background: i === 4 ? 'var(--primary)' : 'var(--surface-1)',
      color: i === 4 ? '#fff' : 'var(--fg-1)',
      font: '500 12px var(--font-mono)',
      cursor: 'pointer'
    }
  }, t)))))));
}

// ---------------------------------------------------------------- Command Palette demo
function CommandPaletteDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Search"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Command palette"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 20
    }
  }, "Cmd-K opens global search across patients, drugs, screens. Fuzzy match \xB7 keyboard-navigable."), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 380,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,23,42,0.4)',
      backdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 30,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 480,
      background: 'var(--surface-1)',
      borderRadius: 12,
      border: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '400 15px var(--font-sans)',
      color: 'var(--fg-1)'
    }
  }, "perera"), /*#__PURE__*/React.createElement("kbd", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--fg-3)',
      border: '1px solid var(--border-1)',
      borderRadius: 4,
      padding: '2px 6px'
    }
  }, "ESC")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 6
    }
  }, [{
    icon: 'person',
    t: 'A. Perera',
    s: 'E-002417 · Engineering · JRISSI 78',
    sel: true
  }, {
    icon: 'person',
    t: 'M. Perera-Silva',
    s: 'E-002133 · Operations · JRISSI 41'
  }, {
    icon: 'description',
    t: 'Consultation · A. Perera · 12 May',
    s: 'Allergic rhinitis · follow-up'
  }, {
    icon: 'medication',
    t: 'Cetirizine 10 mg',
    s: 'In stock · 124 packs'
  }].map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 12px',
      borderRadius: 8,
      background: it.sel ? 'var(--bg-selected)' : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, it.s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      padding: '8px 12px',
      borderTop: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "\u2191\u2193 Navigate"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "\u21B5 Open"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      marginLeft: 'auto'
    }
  }, "\u2318K Toggle")))));
}

// ---------------------------------------------------------------- Cards demo
function CardsDemo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Components \xB7 Surfaces"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 20
    }
  }, "Cards"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Default",
    title: "Resting card",
    action: /*#__PURE__*/React.createElement(Button, {
      kind: "ghost",
      size: "sm",
      icon: "more_horiz"
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, "Border-only separator. No resting shadow. 20 px padding.")), /*#__PURE__*/React.createElement(Card, {
    lifted: true
  }, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Lifted",
    title: "With shadow-1",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "info",
      dot: true
    }, "Live")
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, "For dashboard widgets that should feel \"alive\". Subtle elevation only.")), /*#__PURE__*/React.createElement(Card, {
    dense: true
  }, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Dense",
    title: "Compact"
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, "14/16 px padding. For tables, side panels, dense lists."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      marginTop: 16
    }
  }, [{
    i: 'monitor_heart',
    l: 'Active employees',
    v: '1,284',
    d: '+12 vs last month',
    t: 'good'
  }, {
    i: 'event_available',
    l: 'Today\'s queue',
    v: '12',
    d: '3 pre-visit ready',
    t: 'good'
  }, {
    i: 'psychology',
    l: 'JRISSI High',
    v: '4',
    d: '+1 vs last week',
    t: 'bad'
  }, {
    i: 'insights',
    l: 'Forecast watch',
    v: '3',
    d: 'Pollen rising Thu'
  }].map((s, idx) => /*#__PURE__*/React.createElement(Card, {
    key: idx,
    dense: true
  }, /*#__PURE__*/React.createElement(StatTile, {
    icon: s.i,
    label: s.l,
    value: s.v,
    delta: s.d,
    deltaTone: s.t
  })))));
}
Object.assign(window, {
  ButtonsDemo,
  ChipsBanners,
  FormControlsDemo,
  DataTableDemo,
  ToastsDemo,
  StepperDemo,
  ChartsDemo,
  ModalDemo,
  DrawerDemo,
  FileUploadDemo,
  StatesDemo,
  CalendarDemo,
  CommandPaletteDemo,
  CardsDemo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/components.jsx", error: String((e && e.message) || e) }); }

// src/design-canvas.jsx
try { (() => {
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-noncommentable": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/design-canvas.jsx", error: String((e && e.message) || e) }); }

// src/foundations.jsx
try { (() => {
/* eslint-disable */
// MRAS foundations — visual specimen tiles for the design canvas

// ---------------------------------------------------------------- ColorScale
function ColorScale({
  name,
  stops
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Scale"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 16
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 1fr)',
      gap: 8
    }
  }, stops.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 56,
      borderRadius: 8,
      background: s.value,
      border: '1px solid var(--border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11
    }
  }, s.step), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      fontSize: 10
    }
  }, s.value)))));
}

// ---------------------------------------------------------------- SemanticColors
function SemanticColors() {
  const groups = [{
    title: 'Foreground',
    items: [{
      name: '--fg-1',
      desc: 'Primary text · headings',
      token: '--fg-1'
    }, {
      name: '--fg-2',
      desc: 'Body',
      token: '--fg-2'
    }, {
      name: '--fg-3',
      desc: 'Labels · secondary',
      token: '--fg-3'
    }, {
      name: '--fg-4',
      desc: 'Disabled · tertiary',
      token: '--fg-4'
    }]
  }, {
    title: 'Surface',
    items: [{
      name: '--bg-canvas',
      desc: 'Page background',
      token: '--bg-canvas'
    }, {
      name: '--surface-1',
      desc: 'Cards · panels',
      token: '--surface-1'
    }, {
      name: '--surface-2',
      desc: 'Nested · inset',
      token: '--surface-2'
    }, {
      name: '--bg-hover',
      desc: 'Row hover',
      token: '--bg-hover'
    }]
  }, {
    title: 'Status',
    items: [{
      name: '--success',
      desc: 'Healthy ranges',
      token: '--success'
    }, {
      name: '--warning',
      desc: 'Predictive watch',
      token: '--warning'
    }, {
      name: '--danger',
      desc: 'Escalation only',
      token: '--danger'
    }, {
      name: '--info',
      desc: 'Informational',
      token: '--info'
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Semantic roles"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 16
    }
  }, "Colour roles"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24
    }
  }, groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-3)',
      marginBottom: 10
    }
  }, g.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, g.items.map((it, ii) => /*#__PURE__*/React.createElement("div", {
    key: ii,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: `var(${it.token})`,
      border: '1px solid var(--border-1)',
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-1)'
    }
  }, it.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, it.desc)))))))));
}

// ---------------------------------------------------------------- RoleColors
function RoleColors() {
  const roles = [{
    token: '--role-doctor',
    name: 'Doctor',
    sub: 'Lead clinician',
    icon: 'stethoscope'
  }, {
    token: '--role-employee',
    name: 'Employee',
    sub: 'Self-service',
    icon: 'badge'
  }, {
    token: '--role-pharmacy',
    name: 'Pharmacy',
    sub: 'Stock & dispensing',
    icon: 'pill'
  }, {
    token: '--role-admin',
    name: 'Admin',
    sub: 'System owner',
    icon: 'admin_panel_settings'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Persona"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 16
    }
  }, "Role accents"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, roles.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 4,
      alignSelf: 'stretch',
      borderRadius: 2,
      background: `var(${r.token})`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: `var(${r.token})`,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 20
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, r.sub))))));
}

// ---------------------------------------------------------------- RiskScale
function RiskScale() {
  const rows = [{
    label: 'Low',
    range: '0 – 33',
    fg: 'var(--risk-low)',
    bg: 'var(--risk-low-bg)',
    advice: 'Continue monitoring'
  }, {
    label: 'Moderate',
    range: '34 – 66',
    fg: 'var(--risk-moderate)',
    bg: 'var(--risk-moderate-bg)',
    advice: 'Pre-visit briefing recommended'
  }, {
    label: 'High',
    range: '67 – 100',
    fg: 'var(--risk-high)',
    bg: 'var(--risk-high-bg)',
    advice: 'Consultation required · 14d sustained → escalate'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Doctor-only"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "JRISSI risk scale"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Mental-health risk score (0\u2013100). Named distinctly from generic status so it can be retuned for accessibility."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 10
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 90px 1fr',
      gap: 12,
      alignItems: 'center',
      padding: '12px 14px',
      borderRadius: 10,
      border: '1px solid var(--border-1)',
      background: r.bg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 13px var(--font-sans)',
      color: r.fg,
      textTransform: 'uppercase',
      letterSpacing: '0.04em'
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.range), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-2)'
    }
  }, r.advice)))));
}

// ---------------------------------------------------------------- TypeSpecimen
function TypeSpecimen() {
  const rows = [{
    cls: 'type-display-l',
    label: 'Display L',
    meta: '48 / 700 / -0.01em',
    sample: 'Predict. Prevent. Personalise.'
  }, {
    cls: 'type-h1',
    label: 'H1',
    meta: '30 / 600',
    sample: 'Good morning, Dr. Withana.'
  }, {
    cls: 'type-h2',
    label: 'H2',
    meta: '24 / 600',
    sample: 'Patient records'
  }, {
    cls: 'type-h3',
    label: 'H3',
    meta: '20 / 600',
    sample: 'JRISSI watchlist'
  }, {
    cls: 'type-h4',
    label: 'H4',
    meta: '16 / 600',
    sample: 'Today\u2019s queue'
  }, {
    cls: 'type-body-l',
    label: 'Body L',
    meta: '16 / 400',
    sample: '3 employees flagged overnight. 1 escalation pending review.'
  }, {
    cls: 'type-body',
    label: 'Body',
    meta: '14 / 400',
    sample: 'Patient is showing elevated JRISSI score over 14 days.'
  }, {
    cls: 'type-label',
    label: 'Label',
    meta: '13 / 500',
    sample: 'Blood pressure'
  }, {
    cls: 'type-eyebrow',
    label: 'Eyebrow',
    meta: '12 / 600 / +0.04em / uppercase',
    sample: 'Predictive layer'
  }, {
    cls: 'type-clinical',
    label: 'Clinical',
    meta: '20 / 500 / mono / tabular',
    sample: '120/80 mmHg'
  }, {
    cls: 'type-mono',
    label: 'Mono',
    meta: '13 / 400 / tabular',
    sample: 'E-002417 · BMI 24.1 · ↑ 4%'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Typography"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Type scale"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "IBM Plex Sans (UI) \xB7 IBM Plex Mono (clinical values, IDs). Tabular figures everywhere they line up."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '110px 1fr 220px',
      gap: 16,
      alignItems: 'baseline',
      padding: '10px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, r.label), /*#__PURE__*/React.createElement("div", {
    className: r.cls
  }, r.sample), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)',
      textAlign: 'right'
    }
  }, r.meta)))));
}

// ---------------------------------------------------------------- SpacingScale
function SpacingScale() {
  const steps = [{
    name: '--space-1',
    px: 4
  }, {
    name: '--space-2',
    px: 8
  }, {
    name: '--space-3',
    px: 12
  }, {
    name: '--space-4',
    px: 16
  }, {
    name: '--space-5',
    px: 20
  }, {
    name: '--space-6',
    px: 24
  }, {
    name: '--space-8',
    px: 32
  }, {
    name: '--space-10',
    px: 40
  }, {
    name: '--space-12',
    px: 48
  }, {
    name: '--space-16',
    px: 64
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Spacing"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "4 px base scale"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Dashboards lean on 16\u201324. Modals use 24\u201332. Compact tables use 8\u201312."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, steps.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '120px 60px 1fr',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12
    }
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, s.px, " px"), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 14,
      width: s.px,
      background: 'var(--primary)',
      borderRadius: 3
    }
  })))));
}

// ---------------------------------------------------------------- RadiusScale
function RadiusScale() {
  const items = [{
    name: '--radius-sm',
    px: 6,
    use: 'Inputs · chips'
  }, {
    name: '--radius-md',
    px: 10,
    use: 'Cards (default)'
  }, {
    name: '--radius-lg',
    px: 16,
    use: 'Dialogs · feature cards'
  }, {
    name: '--radius-xl',
    px: 24,
    use: 'Hero blocks'
  }, {
    name: '--radius-pill',
    px: 999,
    use: 'Status pills'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Radii"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 16
    }
  }, "Corner radius"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 12
    }
  }, items.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '1.2',
      borderRadius: r.px,
      background: 'var(--bg-canvas)',
      border: '1px dashed var(--border-2)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, r.use, " \xB7 ", r.px === 999 ? '999' : r.px, " px")))));
}

// ---------------------------------------------------------------- ShadowScale
function ShadowScale() {
  const items = [{
    name: '--shadow-1',
    use: 'Lifted card · subtle elevation'
  }, {
    name: '--shadow-2',
    use: 'Menus · popovers'
  }, {
    name: '--shadow-3',
    use: 'Dialogs · drawers'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Elevation"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Shadows"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Borders are the primary separator \u2014 shadows reserved for elevation transitions."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 24,
      padding: '12px 0 4px'
    }
  }, items.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 88,
      borderRadius: 12,
      background: 'var(--surface-1)',
      boxShadow: `var(${s.name})`,
      border: '1px solid var(--border-1)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, s.use)))));
}

// ---------------------------------------------------------------- MotionTokens
function MotionTokens() {
  const [tick, setTick] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Motion"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Duration & easing"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Functional and small. No bounce, no overshoot. Material standard easing throughout."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 16
    }
  }, [{
    name: '--dur-micro',
    label: '120 ms',
    use: 'Hover · press'
  }, {
    name: '--dur-fast',
    label: '180 ms',
    use: 'Show / hide'
  }, {
    name: '--dur-medium',
    label: '260 ms',
    use: 'Overlay enter'
  }].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 14,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11,
      marginBottom: 4
    }
  }, d.name), /*#__PURE__*/React.createElement("div", {
    className: "type-h4",
    style: {
      marginBottom: 4
    }
  }, d.label), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginBottom: 12
    }
  }, d.use), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 8,
      borderRadius: 999,
      background: 'var(--bg-hover)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: tick,
    style: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      width: 26,
      borderRadius: 999,
      background: 'var(--primary)',
      animation: `mrasMove ${d.label.replace(' ms', 'ms')} var(--ease-std) infinite alternate`
    }
  }))))), /*#__PURE__*/React.createElement("style", null, `@keyframes mrasMove { from { transform: translateX(0); } to { transform: translateX(calc(100% - 26px)); } }`), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTick(t => t + 1),
    style: {
      marginTop: 16,
      border: '1px solid var(--border-1)',
      background: 'var(--surface-1)',
      borderRadius: 8,
      padding: '6px 12px',
      font: '500 12px var(--font-sans)',
      color: 'var(--fg-2)',
      cursor: 'pointer'
    }
  }, "Replay"));
}

// ---------------------------------------------------------------- IconographyShowcase
function IconographyShowcase() {
  const icons = ['dashboard', 'groups', 'stethoscope', 'psychology', 'insights', 'description', 'home', 'qr_code_2', 'monitor_heart', 'history', 'event_available', 'event_repeat', 'pill', 'inventory_2', 'schedule', 'cloud', 'thermostat', 'water_drop', 'admin_panel_settings', 'group', 'fact_check', 'settings', 'priority_high', 'notifications', 'search', 'add', 'download', 'open_in_new', 'check_circle', 'warning', 'error', 'info'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Iconography"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Material Symbols Rounded"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Weight 400, fill 0 (default). Filled variant reserved for active state & a small list of status glyphs."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gap: 8
    }
  }, icons.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      padding: 10,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n,
    size: 24,
    style: {
      color: 'var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 10,
      color: 'var(--fg-3)',
      textAlign: 'center',
      wordBreak: 'break-all'
    }
  }, n)))));
}

// ---------------------------------------------------------------- BrandLogo
function BrandLogo() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Brand"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Wordmark & monogram"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 20
    }
  }, "Placeholder marks inferred from the README \u2014 replace with the team\\u2019s real artwork when available."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 36
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasMark || "assets/mras-mark.svg",
    alt: "MRAS",
    style: {
      height: 48
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      borderRadius: 10,
      background: 'var(--teal-800)',
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 36,
      filter: 'brightness(0) invert(1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 32,
      borderRadius: 10,
      background: 'var(--teal-800)',
      minHeight: 120
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasMark || "assets/mras-mark.svg",
    alt: "MRAS",
    style: {
      height: 48,
      filter: 'brightness(0) invert(1)'
    }
  }))));
}

// ---------------------------------------------------------------- ContentVoice
function ContentVoice() {
  const rows = [{
    context: 'Empty state',
    good: 'No consultations recorded yet.',
    bad: 'Nothing to see here! 🎉'
  }, {
    context: 'Risk warning',
    good: 'JRISSI sustained High for 14 days. Recommend consultation.',
    bad: 'Uh oh — looks like things are getting risky!'
  }, {
    context: 'Success toast',
    good: 'Prescription saved.',
    bad: 'Awesome! Your prescription is saved.'
  }, {
    context: 'Forecast',
    good: 'Pollen levels are forecast to rise on Thursday. 3 employees flagged.',
    bad: 'Heads up — bad allergy day coming!'
  }, {
    context: 'Error',
    good: 'Couldn\u2019t reach the climate service. Forecast last updated 2 hours ago.',
    bad: 'Oops! Something went wrong.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Content"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginBottom: 6
    }
  }, "Voice \u2014 clinical, plain, reassuring"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "Like a senior nurse explaining a chart to a colleague \u2014 informed, concrete, never alarmist, never breezy. Sentence case everywhere. No emoji in product UI."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr 1fr',
      gap: 12,
      font: '500 11px var(--font-sans)',
      color: 'var(--fg-3)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      paddingBottom: 8,
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Context"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success-fg)'
    }
  }, "\u2713 Write this"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger-fg)'
    }
  }, "\u2717 Not this")), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '140px 1fr 1fr',
      gap: 12,
      padding: '12px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.context), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.good), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-3)',
      textDecoration: 'line-through',
      textDecorationColor: 'var(--danger)'
    }
  }, r.bad))));
}
Object.assign(window, {
  ColorScale,
  SemanticColors,
  RoleColors,
  RiskScale,
  TypeSpecimen,
  SpacingScale,
  RadiusScale,
  ShadowScale,
  MotionTokens,
  IconographyShowcase,
  BrandLogo,
  ContentVoice
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/foundations.jsx", error: String((e && e.message) || e) }); }

// src/primitives.jsx
try { (() => {
/* eslint-disable */
// MRAS — extended primitives
// Inputs, Select, Textarea, Modal, Drawer, Toast, FileUpload, CommandPalette,
// States (empty/loading/error), DataTable, Stepper (form wizard), Chart helpers,
// DateTime picker, Tabs, Toggle, Menu, Tooltip.

const P = React;
const {
  useState: pUS,
  useEffect: pUE,
  useMemo: pUM,
  useRef: pUR
} = React;

// ---------------------------------------------------------------- Input
function Input({
  label,
  hint,
  error,
  leading,
  trailing,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  disabled,
  style
}) {
  const [focused, setFocused] = pUS(false);
  const id = pUM(() => 'i' + Math.random().toString(36).slice(2, 8), []);
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--primary)' : 'var(--border-2)';
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-2)'
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger)',
      marginLeft: 2
    }
  }, "*")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 38,
      padding: '0 12px',
      borderRadius: 8,
      border: `1px solid ${borderColor}`,
      background: disabled ? 'var(--bg-canvas)' : 'var(--surface-1)',
      boxShadow: focused && !error ? `0 0 0 3px var(--primary-tint)` : 'none',
      transition: 'border-color var(--dur-micro) var(--ease-std), box-shadow var(--dur-micro) var(--ease-std)',
      opacity: disabled ? 0.6 : 1
    }
  }, leading && /*#__PURE__*/React.createElement(Icon, {
    name: leading,
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    id: id,
    type: type,
    value: value || '',
    placeholder: placeholder,
    onChange: e => onChange?.(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    disabled: disabled,
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      background: 'transparent',
      font: '400 14px var(--font-sans)',
      color: 'var(--fg-1)',
      minWidth: 0
    }
  }), trailing && /*#__PURE__*/React.createElement(Icon, {
    name: trailing,
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  })), (hint || error) && /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      color: error ? 'var(--danger-fg)' : 'var(--fg-3)'
    }
  }, error || hint));
}

// ---------------------------------------------------------------- Select
function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
  hint,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: value || '',
    onChange: e => onChange?.(e.target.value),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      height: 38,
      padding: '0 36px 0 12px',
      borderRadius: 8,
      border: '1px solid var(--border-2)',
      background: 'var(--surface-1)',
      color: 'var(--fg-1)',
      font: '400 14px var(--font-sans)',
      outline: 'none',
      cursor: 'pointer'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement(Icon, {
    name: "expand_more",
    size: 20,
    style: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      color: 'var(--fg-3)',
      pointerEvents: 'none'
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, hint));
}

// ---------------------------------------------------------------- Textarea
function Textarea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
  hint,
  style
}) {
  const [focused, setFocused] = pUS(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", {
    rows: rows,
    value: value || '',
    placeholder: placeholder,
    onChange: e => onChange?.(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    style: {
      padding: '10px 12px',
      borderRadius: 8,
      border: `1px solid ${focused ? 'var(--primary)' : 'var(--border-2)'}`,
      boxShadow: focused ? '0 0 0 3px var(--primary-tint)' : 'none',
      background: 'var(--surface-1)',
      color: 'var(--fg-1)',
      font: '400 14px var(--font-sans)',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-micro) var(--ease-std), box-shadow var(--dur-micro) var(--ease-std)'
    }
  }), hint && /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, hint));
}

// ---------------------------------------------------------------- Toggle
function Toggle({
  checked,
  onChange,
  label,
  disabled
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 20,
      borderRadius: 999,
      background: checked ? 'var(--primary)' : 'var(--slate-300)',
      position: 'relative',
      transition: 'background var(--dur-fast) var(--ease-std)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: checked ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: 999,
      background: '#fff',
      transition: 'left var(--dur-fast) var(--ease-std)',
      boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    onChange: e => onChange?.(e.target.checked),
    disabled: disabled,
    style: {
      display: 'none'
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-2)'
    }
  }, label));
}

// ---------------------------------------------------------------- Checkbox
function Checkbox({
  checked,
  onChange,
  label,
  indeterminate
}) {
  const r = pUR(null);
  pUE(() => {
    if (r.current) r.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: `1.5px solid ${checked || indeterminate ? 'var(--primary)' : 'var(--border-2)'}`,
      background: checked || indeterminate ? 'var(--primary)' : 'var(--surface-1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all var(--dur-micro) var(--ease-std)'
    }
  }, checked && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      fontSize: 14,
      color: '#fff'
    }
  }), indeterminate && !checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 2,
      background: '#fff',
      borderRadius: 1
    }
  })), /*#__PURE__*/React.createElement("input", {
    ref: r,
    type: "checkbox",
    checked: !!checked,
    onChange: e => onChange?.(e.target.checked),
    style: {
      display: 'none'
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-2)'
    }
  }, label));
}

// ---------------------------------------------------------------- Tabs
function Tabs({
  value,
  onChange,
  items
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 0,
      borderBottom: '1px solid var(--border-1)'
    }
  }, items.map(it => {
    const active = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      onClick: () => onChange?.(it.value),
      style: {
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        padding: '10px 16px',
        font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
        color: active ? 'var(--fg-1)' : 'var(--fg-3)',
        borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
        marginBottom: -1,
        transition: 'all var(--dur-micro) var(--ease-std)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, it.icon && /*#__PURE__*/React.createElement(Icon, {
      name: it.icon,
      size: 20,
      style: {
        color: active ? 'var(--primary)' : 'var(--fg-3)'
      }
    }), it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 11px var(--font-mono)',
        padding: '1px 6px',
        borderRadius: 999,
        background: active ? 'var(--primary-tint)' : 'var(--bg-canvas)',
        color: active ? 'var(--primary-hover)' : 'var(--fg-3)',
        border: '1px solid var(--border-1)'
      }
    }, it.count));
  }));
}

// ---------------------------------------------------------------- Modal
function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 480
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50,
      background: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width,
      maxWidth: '100%',
      maxHeight: '90%',
      background: 'var(--surface-1)',
      borderRadius: 12,
      boxShadow: 'var(--shadow-3)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'mrasFade 180ms var(--ease-std)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, title), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      width: 32,
      height: 32,
      borderRadius: 6,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      overflow: 'auto'
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end'
    }
  }, footer)));
}

// ---------------------------------------------------------------- Drawer (right side-sheet)
function Drawer({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  width = 440
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 50
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(15,23,42,0.4)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width,
      maxWidth: '100%',
      background: 'var(--surface-1)',
      borderLeft: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-3)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'mrasSlideIn 220ms var(--ease-std)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 2
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, title)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      width: 32,
      height: 32,
      borderRadius: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      overflow: 'auto',
      flex: 1
    }
  }, children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end'
    }
  }, footer)));
}

// ---------------------------------------------------------------- Toast
function Toast({
  tone = 'info',
  title,
  description,
  icon,
  onClose
}) {
  const map = {
    info: {
      bg: 'var(--surface-1)',
      accent: 'var(--info)',
      di: icon ?? 'info'
    },
    success: {
      bg: 'var(--surface-1)',
      accent: 'var(--success)',
      di: icon ?? 'check_circle'
    },
    warning: {
      bg: 'var(--surface-1)',
      accent: 'var(--warning)',
      di: icon ?? 'warning'
    },
    danger: {
      bg: 'var(--surface-1)',
      accent: 'var(--danger)',
      di: icon ?? 'priority_high'
    }
  };
  const t = map[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '12px 14px',
      borderRadius: 10,
      minWidth: 320,
      maxWidth: 420,
      background: t.bg,
      border: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-2)',
      borderLeft: `3px solid ${t.accent}`
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.di,
    size: 20,
    style: {
      color: t.accent,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, description)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      padding: 2
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      color: 'var(--fg-3)',
      fontSize: 16
    }
  })));
}

// ---------------------------------------------------------------- States
function EmptyState({
  icon = 'inbox',
  title,
  description,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 16,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 32,
    style: {
      color: 'var(--fg-3)'
    }
  })), title && /*#__PURE__*/React.createElement("div", {
    className: "type-h4",
    style: {
      marginTop: 4
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      maxWidth: 340
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action));
}
function Skeleton({
  w = '100%',
  h = 14,
  r = 6,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: w,
      height: h,
      borderRadius: r,
      background: 'linear-gradient(90deg, var(--bg-canvas), var(--bg-hover), var(--bg-canvas))',
      backgroundSize: '200% 100%',
      animation: 'mrasShimmer 1.4s linear infinite',
      ...style
    }
  });
}
function LoadingRows({
  rows = 4
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, Array.from({
    length: rows
  }).map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    w: 32,
    h: 32,
    r: 999
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Skeleton, {
    w: "40%",
    h: 12
  }), /*#__PURE__*/React.createElement(Skeleton, {
    w: "80%",
    h: 10
  })), /*#__PURE__*/React.createElement(Skeleton, {
    w: 60,
    h: 20,
    r: 999
  }))));
}
function ErrorState({
  title = 'Couldn\'t load this.',
  description,
  onRetry
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '40px 24px',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 14,
      background: 'var(--danger-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "error",
    size: 32,
    style: {
      color: 'var(--danger)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, title), description && /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      maxWidth: 340
    }
  }, description), onRetry && /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "refresh",
    onClick: onRetry,
    style: {
      marginTop: 6
    }
  }, "Try again"));
}

// ---------------------------------------------------------------- DataTable
function DataTable({
  columns,
  rows,
  selectable,
  onRowClick,
  dense,
  footer,
  totalLabel,
  page = 1,
  pageCount = 1,
  onPage
}) {
  const [sort, setSort] = pUS({
    col: null,
    dir: 'asc'
  });
  const [selected, setSelected] = pUS(new Set());
  const sorted = pUM(() => {
    if (!sort.col) return rows;
    const c = sort.col;
    return [...rows].sort((a, b) => {
      const av = a[c],
        bv = b[c];
      if (av == null) return 1;
      if (bv == null) return -1;
      const r = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? r : -r;
    });
  }, [rows, sort]);
  const allChecked = selected.size === rows.length && rows.length > 0;
  const someChecked = selected.size > 0 && !allChecked;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, selectable && /*#__PURE__*/React.createElement("th", {
    style: thStyle(dense)
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: allChecked,
    indeterminate: someChecked,
    onChange: v => setSelected(v ? new Set(rows.map((_, i) => i)) : new Set())
  })), columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      ...thStyle(dense),
      textAlign: c.align || 'left',
      width: c.width
    },
    onClick: c.sortable ? () => setSort(s => ({
      col: c.key,
      dir: s.col === c.key && s.dir === 'asc' ? 'desc' : 'asc'
    })) : undefined
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      cursor: c.sortable ? 'pointer' : 'default'
    }
  }, c.label, c.sortable && sort.col === c.key && /*#__PURE__*/React.createElement(Icon, {
    name: sort.dir === 'asc' ? 'arrow_upward' : 'arrow_downward',
    size: 20,
    style: {
      fontSize: 14,
      color: 'var(--primary)'
    }
  })))))), /*#__PURE__*/React.createElement("tbody", null, sorted.map((row, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    onClick: () => onRowClick?.(row),
    style: {
      cursor: onRowClick ? 'pointer' : 'default'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-hover)',
    onMouseLeave: e => e.currentTarget.style.background = ''
  }, selectable && /*#__PURE__*/React.createElement("td", {
    style: tdStyle(dense),
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: selected.has(i),
    onChange: v => {
      const s = new Set(selected);
      v ? s.add(i) : s.delete(i);
      setSelected(s);
    }
  })), columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      ...tdStyle(dense),
      textAlign: c.align || 'left'
    }
  }, c.render ? c.render(row[c.key], row) : /*#__PURE__*/React.createElement("span", {
    style: {
      font: c.mono ? '500 13px var(--font-mono)' : '400 13px var(--font-sans)',
      color: c.muted ? 'var(--fg-3)' : 'var(--fg-1)'
    }
  }, row[c.key])))))))), (footer || onPage) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, totalLabel || `${rows.length} rows`), onPage && pageCount > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    disabled: page <= 1,
    onClick: () => onPage?.(page - 1),
    style: pgBtn(page <= 1)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      minWidth: 70,
      textAlign: 'center'
    }
  }, page, " / ", pageCount), /*#__PURE__*/React.createElement("button", {
    disabled: page >= pageCount,
    onClick: () => onPage?.(page + 1),
    style: pgBtn(page >= pageCount)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20
  })))));
}
const thStyle = dense => ({
  font: '500 11px var(--font-sans)',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  color: 'var(--fg-3)',
  padding: dense ? '8px 12px' : '12px 14px',
  borderBottom: '1px solid var(--border-1)',
  background: 'var(--bg-canvas)',
  position: 'sticky',
  top: 0
});
const tdStyle = dense => ({
  padding: dense ? '8px 12px' : '12px 14px',
  borderBottom: '1px solid var(--border-1)',
  font: '400 13px var(--font-sans)',
  color: 'var(--fg-1)'
});
const pgBtn = disabled => ({
  width: 28,
  height: 28,
  borderRadius: 6,
  border: '1px solid var(--border-1)',
  background: 'var(--surface-1)',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.4 : 1,
  color: 'var(--fg-2)'
});

// ---------------------------------------------------------------- Stepper
function Stepper({
  steps,
  current
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0,
      width: '100%'
    }
  }, steps.map((s, i) => {
    const done = i < current,
      active = i === current;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 26,
        height: 26,
        borderRadius: 999,
        background: done ? 'var(--primary)' : active ? 'var(--primary-tint)' : 'var(--surface-1)',
        border: active ? '1.5px solid var(--primary)' : done ? 'none' : '1.5px solid var(--border-2)',
        color: done ? '#fff' : active ? 'var(--primary-hover)' : 'var(--fg-3)',
        font: '600 12px var(--font-mono)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, done ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 20,
      style: {
        fontSize: 16,
        color: '#fff'
      }
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      className: "type-label",
      style: {
        color: active ? 'var(--fg-1)' : done ? 'var(--fg-2)' : 'var(--fg-3)'
      }
    }, s)), i < steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 1,
        background: done ? 'var(--primary)' : 'var(--border-1)',
        margin: '0 14px'
      }
    }));
  }));
}

// ---------------------------------------------------------------- FileUpload (drop zone)
function FileUpload({
  label,
  accept,
  hint,
  files: ctrlFiles,
  onFiles
}) {
  const [over, setOver] = pUS(false);
  const [files, setFiles] = pUS(ctrlFiles ?? []);
  const setBoth = f => {
    setFiles(f);
    onFiles?.(f);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    onDragOver: e => {
      e.preventDefault();
      setOver(true);
    },
    onDragLeave: () => setOver(false),
    onDrop: e => {
      e.preventDefault();
      setOver(false);
      const list = Array.from(e.dataTransfer.files).map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      }));
      setBoth([...files, ...list]);
    },
    style: {
      padding: '24px 16px',
      borderRadius: 10,
      border: `1.5px dashed ${over ? 'var(--primary)' : 'var(--border-2)'}`,
      background: over ? 'var(--primary-tint)' : 'var(--bg-canvas)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      textAlign: 'center',
      transition: 'all var(--dur-micro) var(--ease-std)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload_file",
    size: 32,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, "Drag files here or ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => e.preventDefault(),
    style: {
      color: 'var(--primary)'
    }
  }, "browse")), hint && /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, hint)), files.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, files.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      border: '1px solid var(--border-1)',
      borderRadius: 8,
      background: 'var(--surface-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.type?.includes('image') ? 'image' : 'description',
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, f.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, f.size ? `${(f.size / 1024).toFixed(1)} KB` : 'Ready')), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBoth(files.filter((_, j) => j !== i)),
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))))));
}

// ---------------------------------------------------------------- DateField (simple)
function DateField({
  label,
  value,
  onChange,
  hint
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-2)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 38,
      padding: '0 12px',
      borderRadius: 8,
      border: '1px solid var(--border-2)',
      background: 'var(--surface-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar_today",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: value || '',
    onChange: e => onChange?.(e.target.value),
    style: {
      border: 0,
      outline: 'none',
      background: 'transparent',
      font: '400 14px var(--font-sans)',
      color: 'var(--fg-1)',
      flex: 1
    }
  })), hint && /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, hint));
}

// ---------------------------------------------------------------- Mini Calendar
function MiniCalendar({
  value,
  onChange,
  marks = {}
}) {
  const today = new Date();
  const [view, setView] = pUS(() => {
    const d = value ? new Date(value) : today;
    return {
      y: d.getFullYear(),
      m: d.getMonth()
    };
  });
  const monthName = new Date(view.y, view.m).toLocaleString('en', {
    month: 'long'
  });
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const iso = d => `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const sel = value;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 260,
      padding: 12,
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setView(v => ({
      y: v.m === 0 ? v.y - 1 : v.y,
      m: (v.m + 11) % 12
    })),
    style: navBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, monthName, " ", view.y), /*#__PURE__*/React.createElement("button", {
    onClick: () => setView(v => ({
      y: v.m === 11 ? v.y + 1 : v.y,
      m: (v.m + 1) % 12
    })),
    style: navBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gap: 2
    }
  }, ['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      textAlign: 'center',
      font: '600 10px var(--font-sans)',
      color: 'var(--fg-3)',
      textTransform: 'uppercase',
      padding: '4px 0'
    }
  }, d)), cells.map((d, i) => {
    if (d == null) return /*#__PURE__*/React.createElement("div", {
      key: i
    });
    const isToday = view.y === today.getFullYear() && view.m === today.getMonth() && d === today.getDate();
    const isSel = sel === iso(d);
    const mark = marks[iso(d)];
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => onChange?.(iso(d)),
      style: {
        width: 32,
        height: 32,
        borderRadius: 8,
        border: isToday && !isSel ? '1px solid var(--primary)' : 'none',
        background: isSel ? 'var(--primary)' : mark ? 'var(--primary-tint)' : 'transparent',
        color: isSel ? '#fff' : 'var(--fg-1)',
        font: '500 13px var(--font-mono)',
        cursor: 'pointer',
        position: 'relative'
      }
    }, d, mark && !isSel && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 4,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 4,
        height: 4,
        borderRadius: 999,
        background: 'var(--primary)'
      }
    }));
  })));
}
const navBtn = {
  width: 24,
  height: 24,
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  borderRadius: 6,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--fg-3)'
};

// ---------------------------------------------------------------- LineChart
function LineChart({
  data,
  width = 480,
  height = 160,
  color = 'var(--primary)',
  fill = true,
  yMin,
  yMax,
  xLabels,
  refLines = [],
  unit
}) {
  const min = yMin ?? Math.min(...data);
  const max = yMax ?? Math.max(...data);
  const span = max - min || 1;
  const pad = {
    l: 36,
    r: 12,
    t: 10,
    b: 22
  };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const points = data.map((v, i) => {
    const x = pad.l + i / (data.length - 1) * w;
    const y = pad.t + (1 - (v - min) / span) * h;
    return [x, y];
  });
  const pathLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const pathArea = fill ? `${pathLine} L ${pad.l + w} ${pad.t + h} L ${pad.l} ${pad.t + h} Z` : '';
  const gridY = 4;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "mrasLineFill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.22"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), Array.from({
    length: gridY + 1
  }).map((_, i) => {
    const y = pad.t + i / gridY * h;
    const v = max - i / gridY * span;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: pad.l,
      y1: y,
      x2: pad.l + w,
      y2: y,
      stroke: "var(--border-1)",
      strokeDasharray: i === gridY ? '0' : '2 3'
    }), /*#__PURE__*/React.createElement("text", {
      x: pad.l - 6,
      y: y + 3,
      textAnchor: "end",
      style: {
        font: '400 10px var(--font-mono)',
        fill: 'var(--fg-3)'
      }
    }, v.toFixed(0), unit || ''));
  }), refLines.map((r, i) => {
    const y = pad.t + (1 - (r.value - min) / span) * h;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: pad.l,
      y1: y,
      x2: pad.l + w,
      y2: y,
      stroke: r.color || 'var(--warning)',
      strokeDasharray: "4 3",
      strokeWidth: "1"
    }), r.label && /*#__PURE__*/React.createElement("text", {
      x: pad.l + w,
      y: y - 4,
      textAnchor: "end",
      style: {
        font: '500 10px var(--font-sans)',
        fill: r.color || 'var(--warning)'
      }
    }, r.label));
  }), fill && /*#__PURE__*/React.createElement("path", {
    d: pathArea,
    fill: "url(#mrasLineFill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: pathLine,
    stroke: color,
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), points.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: i === points.length - 1 ? 3.5 : 0,
    fill: color
  })), xLabels && xLabels.map((l, i) => {
    const x = pad.l + i / (xLabels.length - 1) * w;
    return /*#__PURE__*/React.createElement("text", {
      key: i,
      x: x,
      y: height - 6,
      textAnchor: "middle",
      style: {
        font: '400 10px var(--font-mono)',
        fill: 'var(--fg-3)'
      }
    }, l);
  }));
}

// ---------------------------------------------------------------- BarChart
function BarChart({
  data,
  labels,
  width = 480,
  height = 160,
  color = 'var(--primary)',
  max
}) {
  const m = max ?? Math.max(...data);
  const pad = {
    l: 32,
    r: 8,
    t: 10,
    b: 22
  };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const barW = w / data.length * 0.62;
  const step = w / data.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block'
    }
  }, [0, 0.5, 1].map((p, i) => {
    const y = pad.t + p * h;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: pad.l,
      y1: y,
      x2: pad.l + w,
      y2: y,
      stroke: "var(--border-1)",
      strokeDasharray: p === 1 ? '0' : '2 3'
    });
  }), data.map((v, i) => {
    const x = pad.l + i * step + (step - barW) / 2;
    const bh = v / m * h;
    const y = pad.t + h - bh;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: barW,
      height: bh,
      fill: color,
      rx: "3"
    }), labels && /*#__PURE__*/React.createElement("text", {
      x: x + barW / 2,
      y: height - 6,
      textAnchor: "middle",
      style: {
        font: '400 10px var(--font-mono)',
        fill: 'var(--fg-3)'
      }
    }, labels[i]));
  }));
}

// ---------------------------------------------------------------- Donut
function Donut({
  segments,
  size = 130,
  thickness = 16,
  total
}) {
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0);
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: "var(--bg-hover)",
    strokeWidth: thickness,
    fill: "none"
  }), segments.map((s, i) => {
    const len = s.value / sum * circ;
    const off = circ - acc;
    acc += len;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: size / 2,
      cy: size / 2,
      r: r,
      stroke: s.color,
      strokeWidth: thickness,
      fill: "none",
      strokeDasharray: `${len} ${circ - len}`,
      strokeDashoffset: off
    });
  })));
}

// ---------------------------------------------------------------- Command Palette
function CommandPalette({
  open,
  onClose,
  items,
  placeholder = 'Search patients, drugs, IDs…'
}) {
  const [q, setQ] = pUS('');
  const [sel, setSel] = pUS(0);
  const filtered = pUM(() => {
    const f = q.toLowerCase();
    return items.filter(it => !f || it.title.toLowerCase().includes(f) || (it.sub || '').toLowerCase().includes(f)).slice(0, 8);
  }, [q, items]);
  pUE(() => {
    setSel(0);
  }, [q]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 80,
      background: 'rgba(15,23,42,0.45)',
      backdropFilter: 'blur(2px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: 80
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 560,
      maxWidth: '90%',
      background: 'var(--surface-1)',
      borderRadius: 12,
      border: '1px solid var(--border-1)',
      boxShadow: 'var(--shadow-3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: placeholder,
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      background: 'transparent',
      font: '400 15px var(--font-sans)',
      color: 'var(--fg-1)'
    }
  }), /*#__PURE__*/React.createElement("kbd", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--fg-3)',
      border: '1px solid var(--border-1)',
      borderRadius: 4,
      padding: '2px 6px'
    }
  }, "ESC")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: 360,
      overflow: 'auto',
      padding: 6
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 16px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, "No matches for \"", q, "\".")), filtered.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    onMouseEnter: () => setSel(i),
    onClick: () => {
      onClose?.();
      it.onSelect?.();
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 12px',
      borderRadius: 8,
      background: i === sel ? 'var(--bg-selected)' : 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon || 'search',
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, it.title), it.sub && /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, it.sub)), it.kbd && /*#__PURE__*/React.createElement("kbd", {
    style: {
      font: '500 11px var(--font-mono)',
      color: 'var(--fg-3)',
      border: '1px solid var(--border-1)',
      borderRadius: 4,
      padding: '2px 6px'
    }
  }, it.kbd)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      padding: '8px 12px',
      borderTop: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSm
  }, "\u2191"), /*#__PURE__*/React.createElement("kbd", {
    style: kbdSm
  }, "\u2193"), " Navigate"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSm
  }, "\u21B5"), " Open"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement("kbd", {
    style: kbdSm
  }, "\u2318K"), " Toggle"))));
}
const kbdSm = {
  font: '500 10px var(--font-mono)',
  color: 'var(--fg-3)',
  border: '1px solid var(--border-1)',
  borderRadius: 3,
  padding: '1px 4px',
  background: 'var(--surface-1)'
};

// ---------------------------------------------------------------- Tooltip / Tag list / Progress
function Progress({
  value,
  tone = 'primary',
  height = 6,
  label
}) {
  const map = {
    primary: 'var(--primary)',
    success: 'var(--success)',
    warning: 'var(--warning)',
    danger: 'var(--danger)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12
    }
  }, value, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      borderRadius: 999,
      background: 'var(--bg-hover)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${value}%`,
      height: '100%',
      background: map[tone],
      borderRadius: 999,
      transition: 'width var(--dur-medium) var(--ease-std)'
    }
  })));
}

// ---------------------------------------------------------------- Global animation styles
function GlobalAnims() {
  return /*#__PURE__*/React.createElement("style", null, `
      @keyframes mrasShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes mrasFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes mrasSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes mrasPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.8; } }
    `);
}
Object.assign(window, {
  Input,
  Select,
  Textarea,
  Toggle,
  Checkbox,
  Tabs,
  Modal,
  Drawer,
  Toast,
  EmptyState,
  Skeleton,
  LoadingRows,
  ErrorState,
  DataTable,
  Stepper,
  FileUpload,
  DateField,
  MiniCalendar,
  LineChart,
  BarChart,
  Donut,
  Progress,
  CommandPalette,
  GlobalAnims
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/primitives.jsx", error: String((e && e.message) || e) }); }

// src/screens/AdminDashboard.jsx
try { (() => {
/* eslint-disable */
// Admin dashboard — system health, users, audit log, no PHI / no JRISSI

function AdminDashboard() {
  const users = [{
    name: 'Dr. W.I.L. Withana',
    role: 'Doctor',
    dept: 'Clinical',
    status: 'active',
    last: '2 min',
    accent: 'var(--role-doctor)'
  }, {
    name: 'Dr. C. Jeewan',
    role: 'Doctor',
    dept: 'Clinical',
    status: 'active',
    last: '14 min',
    accent: 'var(--role-doctor)'
  }, {
    name: 'L. Koralage',
    role: 'Pharmacy',
    dept: 'Pharmacy',
    status: 'active',
    last: '1 min',
    accent: 'var(--role-pharmacy)'
  }, {
    name: 'D. Anuradha',
    role: 'Admin',
    dept: 'Administration',
    status: 'active',
    last: 'now',
    accent: 'var(--role-admin)'
  }, {
    name: 'P. Jayasinghe',
    role: 'Employee',
    dept: 'Operations',
    status: 'active',
    last: '38 min',
    accent: 'var(--role-employee)'
  }, {
    name: 'S. Fernando',
    role: 'Employee',
    dept: 'HR',
    status: 'invited',
    last: '—',
    accent: 'var(--role-employee)'
  }];
  const audit = [{
    t: '09:48',
    who: 'system',
    action: 'Auto-escalation triggered',
    target: 'E-002417 · JRISSI 14 d',
    tone: 'warning',
    icon: 'priority_high'
  }, {
    t: '09:42',
    who: 'Dr. Withana',
    action: 'Viewed patient record',
    target: 'E-002417',
    tone: 'info',
    icon: 'visibility'
  }, {
    t: '09:31',
    who: 'L. Koralage',
    action: 'Dispensed prescription',
    target: 'Rx-9421 · Cetirizine',
    tone: 'info',
    icon: 'pill'
  }, {
    t: '09:14',
    who: 'system',
    action: 'Daily OpenFDA sync complete',
    target: '2 monographs ingested',
    tone: 'info',
    icon: 'sync'
  }, {
    t: '08:56',
    who: 'B.W.S.S. Naw…',
    action: 'Employee check-in',
    target: 'QR · medical room',
    tone: 'info',
    icon: 'qr_code_2'
  }, {
    t: '08:00',
    who: 'system',
    action: 'Forecast batch run · pollen',
    target: '3 employees flagged',
    tone: 'info',
    icon: 'insights'
  }, {
    t: '07:45',
    who: 'admin',
    action: 'Role updated · Pharmacy → Lead',
    target: 'L. Koralage',
    tone: 'warning',
    icon: 'admin_panel_settings'
  }, {
    t: 'Wed',
    who: 'system',
    action: 'Failed login throttled · 5 attempts',
    target: 'IP 10.0.2.41',
    tone: 'danger',
    icon: 'lock'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Thursday \xB7 14 May 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Admin console"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "All services healthy. 1 security event in the last 24 h. No PHI or JRISSI data is visible from this role.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export audit log"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "person_add"
  }, "Invite user"))), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    icon: "verified_user",
    title: "PHI shielded."
  }, "Admin role does not have access to patient records, vital signs, prescriptions, or JRISSI mental-health scores. Aggregate counts only."), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  }, [{
    icon: 'group',
    label: 'Active users',
    value: '1,284',
    delta: '+6 this week',
    deltaTone: 'good'
  }, {
    icon: 'shield_person',
    label: 'Roles assigned',
    value: '1,284 / 1,284'
  }, {
    icon: 'cloud_done',
    label: 'Service uptime',
    value: '99.97',
    unit: '%',
    delta: 'SLA 99.9%',
    deltaTone: 'good'
  }, {
    icon: 'database',
    label: 'DB latency p95',
    value: '42',
    unit: 'ms'
  }, {
    icon: 'security',
    label: 'Security events',
    value: '1',
    delta: '24 h window',
    deltaTone: 'neutral'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 4 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Backing services",
    title: "Status",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "success",
      dot: true
    }, "All systems normal")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    name: 'FastAPI backend',
    state: 'up',
    meta: 'v3.0.4 · ECS'
  }, {
    name: 'PostgreSQL · Timescale',
    state: 'up',
    meta: 'p95 42 ms'
  }, {
    name: 'Claude API',
    state: 'up',
    meta: 'sonnet-4-6'
  }, {
    name: 'OpenWeatherMap',
    state: 'degraded',
    meta: '1 retry/h'
  }, {
    name: 'Twilio WhatsApp',
    state: 'up',
    meta: '99.99%'
  }, {
    name: 'SendGrid email',
    state: 'up',
    meta: '99.97%'
  }, {
    name: 'OpenFDA monographs',
    state: 'up',
    meta: 'last sync 09:14'
  }, {
    name: 'Tomorrow.io (fallback)',
    state: 'idle',
    meta: 'standby'
  }].map((s, i) => {
    const tone = s.state === 'up' ? 'low' : s.state === 'degraded' ? 'moderate' : 'neutral';
    const label = s.state === 'up' ? 'Up' : s.state === 'degraded' ? 'Degraded' : 'Idle';
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        border: '1px solid var(--border-1)',
        borderRadius: 10,
        background: 'var(--bg-canvas)'
      }
    }, /*#__PURE__*/React.createElement(Chip, {
      tone: tone,
      dot: true,
      style: {
        padding: '2px 8px'
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "type-label",
      style: {
        color: 'var(--fg-1)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      className: "type-caption"
    }, s.meta)));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "User management"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Recent activity")), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "open_in_new"
  }, "All users")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '40px 1.6fr 1fr 1fr 0.7fr',
      gap: 12,
      padding: '10px 20px',
      background: 'var(--bg-canvas)',
      borderBottom: '1px solid var(--border-1)',
      font: '600 11px var(--font-sans)',
      color: 'var(--fg-3)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("div", null), /*#__PURE__*/React.createElement("div", null, "Name"), /*#__PURE__*/React.createElement("div", null, "Role"), /*#__PURE__*/React.createElement("div", null, "Department"), /*#__PURE__*/React.createElement("div", null, "Last seen")), users.map((u, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '40px 1.6fr 1fr 1fr 0.7fr',
      gap: 12,
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: u.name,
    size: 32,
    color: u.accent
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, u.name), u.status === 'invited' && /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      color: 'var(--warning-fg)'
    }
  }, "Invite pending")), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral",
    style: {
      width: 'fit-content',
      padding: '2px 8px'
    }
  }, u.role), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, u.dept), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, u.last)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "RBAC",
    title: "Role distribution"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      marginTop: 4
    }
  }, [{
    name: 'Employee',
    count: 1248,
    pct: 97.2,
    color: 'var(--role-employee)'
  }, {
    name: 'Doctor',
    count: 12,
    pct: 0.9,
    color: 'var(--role-doctor)'
  }, {
    name: 'Pharmacy',
    count: 18,
    pct: 1.4,
    color: 'var(--role-pharmacy)'
  }, {
    name: 'Admin',
    count: 6,
    pct: 0.5,
    color: 'var(--role-admin)'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: r.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.name)), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-2)'
    }
  }, r.count.toLocaleString(), " \xB7 ", r.pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 999,
      background: 'var(--slate-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${r.pct}%`,
      background: r.color,
      borderRadius: 999
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      paddingTop: 16,
      borderTop: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Notable counts"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      border: '1px solid var(--border-1)',
      borderRadius: 8,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "Pending invites"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 18px var(--font-mono)',
      color: 'var(--fg-1)'
    }
  }, "3")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 10,
      border: '1px solid var(--border-1)',
      borderRadius: 8,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "MFA enrolled"), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 18px var(--font-mono)',
      color: 'var(--fg-1)'
    }
  }, "94%")))))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Compliance"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Audit log")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "info",
    dot: true
  }, "System"), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning",
    dot: true
  }, "Privileged"), /*#__PURE__*/React.createElement(Chip, {
    tone: "danger",
    dot: true
  }, "Security"))), audit.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '70px 32px 1.4fr 1fr 100px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, a.t), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 20,
    style: {
      color: a.tone === 'danger' ? 'var(--danger)' : a.tone === 'warning' ? 'var(--warning)' : 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, a.action), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "by ", a.who)), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-2)'
    }
  }, a.target), /*#__PURE__*/React.createElement(Chip, {
    tone: a.tone === 'danger' ? 'danger' : a.tone === 'warning' ? 'warning' : 'info',
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, a.tone === 'danger' ? 'Security' : a.tone === 'warning' ? 'Privileged' : 'System')))));
}
Object.assign(window, {
  AdminDashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/AdminDashboard.jsx", error: String((e && e.message) || e) }); }

// src/screens/AdminScreens.jsx
try { (() => {
/* eslint-disable */
// Admin screens: Users & roles, Audit log, Reports & analytics.

// ============================================================================
// 1. USERS & ROLES
// ============================================================================
function AdminUsers() {
  const users = [{
    name: 'Dr. P. Withana',
    email: 'p.withana@corp.lk',
    role: 'Doctor',
    status: 'Active',
    last: '2 min ago',
    perms: ['JRISSI', 'Rx sign', 'Patient records']
  }, {
    name: 'L. Koralage',
    email: 'l.koralage@corp.lk',
    role: 'Pharmacy',
    status: 'Active',
    last: '14 min',
    perms: ['Inventory', 'GRN']
  }, {
    name: 'D. Anuradha',
    email: 'd.anuradha@corp.lk',
    role: 'Admin',
    status: 'Active',
    last: 'now',
    perms: ['All']
  }, {
    name: 'B.W.S.S. Nawarathna',
    email: 'sss.naw@corp.lk',
    role: 'Employee',
    status: 'Active',
    last: '1 h ago',
    perms: ['Self-service']
  }, {
    name: 'S. Fernando',
    email: 's.fernando@corp.lk',
    role: 'Employee',
    status: 'Active',
    last: '3 h ago',
    perms: ['Self-service']
  }, {
    name: 'Dr. N. Bandara',
    email: 'n.bandara@corp.lk',
    role: 'Doctor',
    status: 'Pending',
    last: '—',
    perms: ['—']
  }, {
    name: 'M. Karunaratne',
    email: 'm.karunaratne@corp.lk',
    role: 'Employee',
    status: 'Suspended',
    last: '2 d ago',
    perms: ['—']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Admin \xB7 console"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Users & roles"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "1,284 active employees \xB7 12 staff \xB7 3 admins \xB7 SSO via corporate OIDC.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "upload_file"
  }, "Bulk import"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "key"
  }, "Manage roles"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "person_add"
  }, "Invite user"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    l: 'Doctors',
    v: '4',
    d: '+1 pending'
  }, {
    l: 'Pharmacy',
    v: '3',
    d: 'All active'
  }, {
    l: 'Employees',
    v: '1,284',
    d: '12 suspended'
  }, {
    l: 'Admins',
    v: '3',
    d: 'SSO required'
  }].map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 26
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, s.d)))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: "",
    placeholder: "Search users\u2026",
    leading: "search",
    style: {
      flex: 1
    },
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    value: "all",
    options: [{
      value: 'all',
      label: 'All roles'
    }, {
      value: 'doctor',
      label: 'Doctors'
    }, {
      value: 'pharmacy',
      label: 'Pharmacy'
    }, {
      value: 'employee',
      label: 'Employees'
    }, {
      value: 'admin',
      label: 'Admins'
    }],
    onChange: () => {},
    style: {
      width: 160
    }
  }), /*#__PURE__*/React.createElement(Select, {
    value: "active",
    options: [{
      value: 'active',
      label: 'Active'
    }, {
      value: 'pending',
      label: 'Pending'
    }, {
      value: 'suspended',
      label: 'Suspended'
    }, {
      value: 'all',
      label: 'All'
    }],
    onChange: () => {},
    style: {
      width: 140
    }
  })), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['', 'Name', 'Email', 'Role', 'Permissions', 'Status', 'Last active', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: '500 11px var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--fg-3)',
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)',
      textAlign: 'left'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, users.map((u, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdAdm,
      width: 40
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: false,
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: u.name,
    size: 28,
    color: {
      'Doctor': 'var(--role-doctor)',
      'Employee': 'var(--role-employee)',
      'Pharmacy': 'var(--role-pharmacy)',
      'Admin': 'var(--role-admin)'
    }[u.role]
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, u.name))), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, u.email)), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: {
        'Doctor': 'var(--role-doctor)',
        'Employee': 'var(--role-employee)',
        'Pharmacy': 'var(--role-pharmacy)',
        'Admin': 'var(--role-admin)'
      }[u.role]
    }
  }), u.role)), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      flexWrap: 'wrap'
    }
  }, u.perms.map((p, j) => /*#__PURE__*/React.createElement(Chip, {
    key: j,
    tone: "neutral",
    style: {
      fontSize: 11,
      padding: '2px 8px'
    }
  }, p)))), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'danger',
    dot: true
  }, u.status)), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, u.last)), /*#__PURE__*/React.createElement("td", {
    style: tdAdm
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more_horiz",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "7 of 1,294 users"), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, "Page 1 / 130"))));
}
const tdAdm = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--border-1)',
  font: '400 13px var(--font-sans)',
  color: 'var(--fg-1)'
};

// ============================================================================
// 2. AUDIT LOG
// ============================================================================
function AuditLog() {
  const entries = [{
    t: '14 May · 09:34:12',
    actor: 'Dr. P. Withana',
    action: 'prescription.sign',
    tgt: 'rx_20260514_0042',
    ip: '10.42.1.18',
    ok: true
  }, {
    t: '14 May · 09:33:51',
    actor: 'Dr. P. Withana',
    action: 'consultation.save',
    tgt: 'cn_20260514_0028',
    ip: '10.42.1.18',
    ok: true
  }, {
    t: '14 May · 09:30:02',
    actor: 'system',
    action: 'jrissi.threshold',
    tgt: 'E-002417',
    ip: '—',
    ok: true,
    level: 'warn'
  }, {
    t: '14 May · 09:24:18',
    actor: 'B.W.S.S. Nawarathna',
    action: 'auth.qr_checkin',
    tgt: 'E-002219 → MR-1',
    ip: '10.42.1.99',
    ok: true
  }, {
    t: '14 May · 09:18:44',
    actor: 'L. Koralage',
    action: 'grn.post',
    tgt: 'GRN-2026-0141',
    ip: '10.42.2.14',
    ok: true
  }, {
    t: '14 May · 08:55:01',
    actor: 'D. Anuradha',
    action: 'user.permission_update',
    tgt: 'Dr. N. Bandara · +rx_sign',
    ip: '10.42.0.12',
    ok: true
  }, {
    t: '14 May · 08:30:00',
    actor: 'system',
    action: 'forecast.refresh',
    tgt: '14d horizon · 1,284 employees',
    ip: '—',
    ok: true
  }, {
    t: '14 May · 06:00:00',
    actor: 'system',
    action: 'backup.complete',
    tgt: 's3://mras-prod/2026-05-14.tar',
    ip: '—',
    ok: true
  }, {
    t: '13 May · 23:58:11',
    actor: 'system',
    action: 'climate.api_unreachable',
    tgt: 'weather.gov.lk',
    ip: '—',
    ok: false,
    level: 'err'
  }, {
    t: '13 May · 17:22:09',
    actor: 'Dr. P. Withana',
    action: 'patient.escalate',
    tgt: 'E-002417 → OH',
    ip: '10.42.1.18',
    ok: true,
    level: 'warn'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Admin \xB7 compliance"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Audit log"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Every state-changing action across MRAS \xB7 PHI-aware \xB7 7-year retention.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "filter_list"
  }, "Filter"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export CSV"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: "",
    placeholder: "Search by actor, action, or target id\u2026",
    leading: "search",
    style: {
      flex: 1
    },
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    value: "all",
    options: [{
      value: 'all',
      label: 'All actions'
    }, {
      value: 'auth',
      label: 'Auth'
    }, {
      value: 'rx',
      label: 'Prescription'
    }, {
      value: 'cn',
      label: 'Consultation'
    }, {
      value: 'sys',
      label: 'System'
    }],
    onChange: () => {},
    style: {
      width: 160
    }
  }), /*#__PURE__*/React.createElement(DateField, {
    value: "2026-05-14",
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, entries.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '170px 22px 200px 1fr 1fr 100px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--fg-3)'
    }
  }, e.t), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: e.level === 'err' ? 'var(--danger)' : e.level === 'warn' ? 'var(--warning)' : 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px var(--font-sans)',
      color: 'var(--fg-1)'
    }
  }, e.actor), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px var(--font-mono)',
      color: 'var(--fg-1)'
    }
  }, e.action), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-mono)',
      color: 'var(--fg-2)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, e.tgt), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 11px var(--font-mono)',
      color: 'var(--fg-3)',
      textAlign: 'right'
    }
  }, e.ip)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px',
      borderTop: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "Showing 10 of 4,221 entries for today \xB7 ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)'
    }
  }, "Load more")))));
}

// ============================================================================
// 3. REPORTS & ANALYTICS
// ============================================================================
function ReportsAnalytics() {
  const consultByMonth = [82, 91, 88, 102, 119, 124, 138, 142];
  const monthLbls = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const topConditions = [{
    name: 'Allergic rhinitis',
    count: 142,
    change: '↑ 12%'
  }, {
    name: 'Tension headache',
    count: 118,
    change: '↑ 8%'
  }, {
    name: 'Upper resp. infection',
    count: 96,
    change: '↓ 4%'
  }, {
    name: 'Hypertension watch',
    count: 78,
    change: '↑ 2%'
  }, {
    name: 'Lower back pain',
    count: 64,
    change: 'stable'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Admin \xB7 reports"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Reports & analytics"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Aggregate, de-identified data only. Drilldown to individual records requires JRISSI permission.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Select, {
    value: "ytd",
    options: [{
      value: 'mtd',
      label: 'This month'
    }, {
      value: 'qtd',
      label: 'This quarter'
    }, {
      value: 'ytd',
      label: 'YTD'
    }, {
      value: 'lt',
      label: 'Last 12 months'
    }],
    onChange: () => {},
    style: {
      width: 160
    }
  }), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "schedule_send"
  }, "Schedule"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    l: 'Consultations',
    v: '1,024',
    d: '↑ 18% YoY',
    t: 'good'
  }, {
    l: 'Avg JRISSI · workforce',
    v: '34',
    d: '↓ 2 vs Q1',
    t: 'good'
  }, {
    l: 'Pre-emptive alerts',
    v: '184',
    d: '92% accepted',
    t: 'good'
  }, {
    l: 'Stock-out events',
    v: '3',
    d: '↓ 6 vs Q1',
    t: 'good'
  }].map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 26
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--success-fg)',
      marginTop: 2
    }
  }, s.d)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Activity \xB7 last 8 months",
    title: "Consultations"
  }), /*#__PURE__*/React.createElement(BarChart, {
    data: consultByMonth,
    labels: monthLbls,
    width: 580,
    height: 200,
    color: "var(--primary)"
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "By department",
    title: "JRISSI distribution"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    d: 'Engineering',
    low: 64,
    mod: 24,
    high: 12
  }, {
    d: 'Operations',
    low: 71,
    mod: 22,
    high: 7
  }, {
    d: 'Finance',
    low: 78,
    mod: 18,
    high: 4
  }, {
    d: 'HR',
    low: 82,
    mod: 16,
    high: 2
  }, {
    d: 'Sales',
    low: 68,
    mod: 26,
    high: 6
  }].map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, row.d), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, row.low + row.mod + row.high)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 8,
      borderRadius: 4,
      overflow: 'hidden',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: `${row.low}%`,
      background: 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: `${row.mod}%`,
      background: 'var(--warning)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: `${row.high}%`,
      background: 'var(--danger)'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: 'var(--success)'
    }
  }), " Low"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: 'var(--warning)'
    }
  }), " Moderate"), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 2,
      background: 'var(--danger)'
    }
  }), " High"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Top 5 \xB7 YTD"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Conditions seen")), topConditions.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 14px var(--font-mono)',
      color: 'var(--fg-3)',
      width: 24
    }
  }, i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: '500 13px var(--font-sans)',
      color: 'var(--fg-1)'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 13
    }
  }, r.count), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: r.change.startsWith('↑') ? 'var(--danger-fg)' : r.change.startsWith('↓') ? 'var(--success-fg)' : 'var(--fg-3)',
      width: 60,
      textAlign: 'right'
    }
  }, r.change)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Saved",
    title: "Scheduled reports",
    action: /*#__PURE__*/React.createElement(Button, {
      kind: "ghost",
      size: "sm",
      icon: "add"
    }, "New")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    i: 'description',
    t: 'Monthly OH summary',
    d: '1st of month · 9:00 · HR + Medical'
  }, {
    i: 'psychology',
    t: 'JRISSI escalation rollup',
    d: 'Weekly Mon 8:00 · Doctor only'
  }, {
    i: 'inventory_2',
    t: 'Pharmacy stock & FEFO',
    d: 'Daily 06:00 · Pharmacy + Admin'
  }, {
    i: 'shield_person',
    t: 'Privacy access log',
    d: 'Quarterly · Compliance officer'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderRadius: 8,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--primary-tint)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.i,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.t), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.d)), /*#__PURE__*/React.createElement(Toggle, {
    checked: true,
    onChange: () => {}
  })))))));
}
Object.assign(window, {
  AdminUsers,
  AuditLog,
  ReportsAnalytics
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/AdminScreens.jsx", error: String((e && e.message) || e) }); }

// src/screens/AuthScreens.jsx
try { (() => {
/* eslint-disable */
// Auth screens — Login & Register. Both work in light & dark mode.

// ============================================================================
// LOGIN
// ============================================================================
function MrasLogin() {
  const [email, setEmail] = React.useState('p.withana@corp.lk');
  const [password, setPassword] = React.useState('');
  const [remember, setRemember] = React.useState(true);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: '100%',
      minHeight: 720,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--teal-700) 0%, var(--teal-900) 70%, #062321 100%)',
      color: '#fff',
      padding: '48px 56px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.07
    },
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "lg",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 0L0 0 0 40",
    stroke: "white",
    strokeWidth: "0.5",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#lg)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -100,
      top: -100,
      width: 380,
      height: 380,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasMark || "assets/mras-mark.svg",
    alt: "",
    style: {
      height: 32,
      filter: 'brightness(0) invert(1)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 22,
      filter: 'brightness(0) invert(1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 12px var(--font-mono)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--teal-300)'
    }
  }, "Predict. Prevent. Personalise."), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: '600 44px var(--font-sans)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "Welcome back."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 17px var(--font-sans)',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.72)',
      maxWidth: 440,
      margin: 0
    }
  }, "Sign in to access the medical room console. Your role determines what you\\u2019ll see \u2014 patient records, prescriptions, inventory or analytics.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [{
    i: 'shield',
    t: 'PHI-grade encryption · audit-logged'
  }, {
    i: 'support_agent',
    t: '24/7 on-site clinical support'
  }, {
    i: 'psychology',
    t: 'JRISSI early-warning system live'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.i,
    size: 20,
    style: {
      color: 'var(--teal-300)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px var(--font-sans)',
      color: 'rgba(255,255,255,0.85)'
    }
  }, r.t))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '48px 64px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 380,
      width: '100%',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Account"), /*#__PURE__*/React.createElement("h2", {
    className: "type-h1",
    style: {
      marginBottom: 8
    }
  }, "Sign in"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginBottom: 28
    }
  }, "Use your corporate email. Single sign-on is enabled organisation-wide."), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "login",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginBottom: 16,
      height: 44
    }
  }, "Continue with corporate SSO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '20px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "or with email"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    value: email,
    onChange: setEmail,
    leading: "mail",
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    value: password,
    onChange: setPassword,
    leading: "lock",
    trailing: "visibility",
    type: "password"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: remember,
    onChange: setRemember,
    label: "Keep me signed in"
  }), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '500 13px var(--font-sans)',
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "Forgot password?")), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    size: "lg",
    icon: "arrow_forward",
    style: {
      width: '100%',
      justifyContent: 'center',
      height: 44
    }
  }, "Sign in")), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      textAlign: 'center',
      marginTop: 24
    }
  }, "New employee? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)',
      textDecoration: 'none',
      fontWeight: 500
    }
  }, "Set up your account")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      paddingTop: 20,
      borderTop: '1px dashed var(--border-1)',
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "MRAS v3.0.4 \xB7 build 2026-05-12"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '400 12px var(--font-sans)',
      color: 'var(--fg-3)',
      textDecoration: 'none'
    }
  }, "Status \xB7 Privacy")))));
}

// ============================================================================
// SIGN UP (create account)
// ============================================================================
function MrasSignUp() {
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [agree, setAgree] = React.useState(false);

  // Live validation
  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  const checks = [{
    label: 'At least 8 characters',
    ok: pw.length >= 8
  }, {
    label: 'One uppercase letter',
    ok: /[A-Z]/.test(pw)
  }, {
    label: 'One number',
    ok: /\d/.test(pw)
  }, {
    label: 'One symbol',
    ok: /[^A-Za-z0-9]/.test(pw)
  }];
  const strength = checks.filter(c => c.ok).length;
  const strengthMeta = [{
    l: 'Too weak',
    c: 'var(--danger)'
  }, {
    l: 'Weak',
    c: 'var(--danger)'
  }, {
    l: 'Fair',
    c: 'var(--warning)'
  }, {
    l: 'Good',
    c: 'var(--warning)'
  }, {
    l: 'Strong',
    c: 'var(--success)'
  }][strength];
  const match = confirm.length > 0 && pw === confirm;
  const canSubmit = first && last && emailValid && strength === 4 && match && agree;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      height: '100%',
      minHeight: 720,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, var(--teal-700) 0%, var(--teal-900) 70%, #062321 100%)',
      color: '#fff',
      padding: '48px 56px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      opacity: 0.07
    },
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "sg",
    width: "40",
    height: "40",
    patternUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M40 0L0 0 0 40",
    stroke: "white",
    strokeWidth: "0.5",
    fill: "none"
  }))), /*#__PURE__*/React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#sg)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -100,
      top: -100,
      width: 380,
      height: 380,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasMark || "assets/mras-mark.svg",
    alt: "",
    style: {
      height: 32,
      filter: 'brightness(0) invert(1)'
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 22,
      filter: 'brightness(0) invert(1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '700 12px var(--font-mono)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--teal-300)'
    }
  }, "Predict. Prevent. Personalise."), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: '600 44px var(--font-sans)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      margin: 0
    }
  }, "Create your account."), /*#__PURE__*/React.createElement("p", {
    style: {
      font: '400 17px var(--font-sans)',
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.72)',
      maxWidth: 440,
      margin: 0
    }
  }, "Join the medical room platform. Your wellness home, appointments and health timeline come together in one place.")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, [{
    i: 'verified_user',
    t: 'Your data stays on-site &amp; encrypted'
  }, {
    i: 'monitor_heart',
    t: 'Connect a wearable for richer insights'
  }, {
    i: 'qr_code_2',
    t: 'Skip the desk — QR check-in at the kiosk'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.i,
    size: 20,
    style: {
      color: 'var(--teal-300)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 13px var(--font-sans)',
      color: 'rgba(255,255,255,0.85)'
    },
    dangerouslySetInnerHTML: {
      __html: r.t
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px 64px',
      overflow: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 400,
      width: '100%',
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Get started"), /*#__PURE__*/React.createElement("h2", {
    className: "type-h1",
    style: {
      marginBottom: 8
    }
  }, "Create account"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginBottom: 24
    }
  }, "Already registered? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)',
      textDecoration: 'none',
      fontWeight: 500
    }
  }, "Sign in")), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "badge",
    style: {
      width: '100%',
      justifyContent: 'center',
      marginBottom: 16,
      height: 44
    }
  }, "Sign up with corporate SSO"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      margin: '18px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-1)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "or with email"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border-1)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "First name",
    value: first,
    onChange: setFirst,
    placeholder: "Bandara",
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Last name",
    value: last,
    onChange: setLast,
    placeholder: "Karunaratne",
    required: true
  })), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    value: email,
    onChange: setEmail,
    leading: "mail",
    placeholder: "you@company.com",
    required: true,
    error: email.length > 0 && !emailValid ? 'Enter a valid email address' : ''
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    label: "Password",
    value: pw,
    onChange: setPw,
    leading: "lock",
    trailing: "visibility",
    type: "password",
    required: true
  }), pw.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      gap: 4
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: 4,
      borderRadius: 999,
      background: i < strength ? strengthMeta.c : 'var(--bg-hover)',
      transition: 'background var(--dur-fast) var(--ease-std)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-sans)',
      color: strengthMeta.c,
      minWidth: 56,
      textAlign: 'right'
    }
  }, strengthMeta.l)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4px 12px'
    }
  }, checks.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '400 12px var(--font-sans)',
      color: c.ok ? 'var(--success-fg)' : 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.ok ? 'check_circle' : 'radio_button_unchecked',
    size: 20,
    style: {
      fontSize: 14,
      color: c.ok ? 'var(--success)' : 'var(--fg-4)'
    }
  }), c.label))))), /*#__PURE__*/React.createElement(Input, {
    label: "Confirm password",
    value: confirm,
    onChange: setConfirm,
    leading: "lock",
    type: "password",
    required: true,
    error: confirm.length > 0 && !match ? 'Passwords don\u2019t match' : '',
    hint: match ? 'Passwords match' : ''
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start',
      cursor: 'pointer',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: agree,
    onChange: setAgree
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-2)',
      lineHeight: 1.5
    }
  }, "I agree to the ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "Terms of Service"), " and consent to the processing of my health data under the ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "Privacy Policy"), ".")), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    size: "lg",
    icon: "arrow_forward",
    disabled: !canSubmit,
    style: {
      width: '100%',
      justifyContent: 'center',
      height: 44,
      marginTop: 4
    }
  }, "Create account")), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      textAlign: 'center',
      marginTop: 20,
      lineHeight: 1.5
    }
  }, "Protected by reCAPTCHA \xB7 audit-logged \xB7 PHI-grade encryption"))));
}

// ============================================================================
// REGISTER (first-run onboarding for a new employee)
// ============================================================================
function MrasRegister() {
  const [step, setStep] = React.useState(1);
  const [first, setFirst] = React.useState('Bandara');
  const [last, setLast] = React.useState('Karunaratne');
  const [empId, setEmpId] = React.useState('E-002893');
  const [dept, setDept] = React.useState('engineering');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 720,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 24
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, "Already have an account? ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--primary)',
      fontWeight: 500,
      textDecoration: 'none'
    }
  }, "Sign in"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '40px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      maxWidth: 640
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "First-run \xB7 onboarding"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1",
    style: {
      marginBottom: 8
    }
  }, "Set up your MRAS account"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginBottom: 28
    }
  }, "This takes a minute. We need a few details to personalise your wellness home and unlock the kiosk QR."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 32
    }
  }, /*#__PURE__*/React.createElement(Stepper, {
    current: step,
    steps: ['Identify', 'Wellness baseline', 'Consent', 'Done']
  })), /*#__PURE__*/React.createElement(Card, null, step === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Step 1 of 4",
    title: "Who are you?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "First name",
    value: first,
    onChange: setFirst,
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Last name",
    value: last,
    onChange: setLast,
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Employee ID",
    value: empId,
    onChange: setEmpId,
    leading: "badge",
    required: true,
    hint: "From your access card"
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Department",
    value: dept,
    onChange: setDept,
    options: [{
      value: 'engineering',
      label: 'Engineering'
    }, {
      value: 'hr',
      label: 'Human resources'
    }, {
      value: 'finance',
      label: 'Finance'
    }, {
      value: 'ops',
      label: 'Operations'
    }, {
      value: 'sales',
      label: 'Sales'
    }],
    required: true
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Work email",
    value: "b.karunaratne@corp.lk",
    leading: "mail",
    disabled: true,
    hint: "Managed by your organisation",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(DateField, {
    label: "Date of birth",
    value: "1992-03-18",
    onChange: () => {}
  }))), step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Step 2 of 4",
    title: "Wellness baseline",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "info",
      dot: true
    }, "Optional")
  }), /*#__PURE__*/React.createElement("p", {
    className: "type-body-s",
    style: {
      marginBottom: 16
    }
  }, "This helps the predictive layer flag changes that matter to you. You can skip and provide later."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Height",
    value: "174",
    trailing: "straighten",
    hint: "cm",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Weight",
    value: "71",
    trailing: "monitor_weight",
    hint: "kg",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Sleep \xB7 typical",
    value: "7",
    options: [{
      value: '5',
      label: 'Under 5 h'
    }, {
      value: '6',
      label: '5–6 h'
    }, {
      value: '7',
      label: '6–8 h'
    }, {
      value: '8',
      label: 'Over 8 h'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Exercise \xB7 frequency",
    value: "2-3",
    options: [{
      value: '0',
      label: 'Rarely'
    }, {
      value: '1',
      label: 'Once / week'
    }, {
      value: '2-3',
      label: '2–3 / week'
    }, {
      value: '4+',
      label: '4+ / week'
    }],
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "Known conditions / allergies",
    rows: 3,
    value: "Seasonal allergic rhinitis (pollen). Mild asthma \xB7 controlled.",
    hint: "Helps the system check prescriptions against your history",
    onChange: () => {}
  })), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Step 3 of 4",
    title: "Consent & sharing"
  }), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    title: "What we ask for, why we ask for it."
  }, "Your data stays on-site and encrypted. You can revoke consent any time in Settings \u2192 Privacy."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    l: 'Share consultation history with my on-site doctor',
    d: 'Required to provide care',
    force: true
  }, {
    l: 'Allow predictive forecasting (pollen, heat, flu)',
    d: 'Pre-emptive alerts for your conditions'
  }, {
    l: 'Connect a fitness device (WHOOP, Garmin, Fitbit)',
    d: 'You\u2019ll authorise the integration next'
  }, {
    l: 'Share aggregated, anonymised data with HR',
    d: 'Quarterly wellness reports — never individually identifying'
  }, {
    l: 'Receive a weekly wellness digest',
    d: 'Mondays 08:00 · email'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderRadius: 8,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Checkbox, {
    checked: i < 3 || r.force,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.l), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.d)), r.force && /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral",
    style: {
      padding: '2px 8px',
      fontSize: 11
    }
  }, "Required"))))), step === 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '24px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 84,
      height: 84,
      borderRadius: 24,
      background: 'var(--success-bg)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 48,
    style: {
      color: 'var(--success)'
    }
  })), /*#__PURE__*/React.createElement("h2", {
    className: "type-h2",
    style: {
      marginBottom: 8
    }
  }, "You\\u2019re all set, Bandara."), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginBottom: 24,
      maxWidth: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }, "Your wellness home is ready. Your QR code is on the next screen \u2014 keep it handy for kiosk check-ins."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "qr_code_2"
  }, "Show my QR"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "arrow_forward"
  }, "Open wellness home"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 24,
      paddingTop: 20,
      borderTop: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "arrow_back",
    onClick: () => setStep(Math.max(0, step - 1)),
    style: {
      visibility: step === 0 ? 'hidden' : 'visible'
    }
  }, "Back"), step < 3 ? /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "arrow_forward",
    onClick: () => setStep(Math.min(3, step + 1))
  }, step === 1 ? 'Skip &amp; continue' : 'Continue') : null)))));
}
Object.assign(window, {
  MrasLogin,
  MrasSignUp,
  MrasRegister
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/AuthScreens.jsx", error: String((e && e.message) || e) }); }

// src/screens/DoctorDashboard.jsx
try { (() => {
/* eslint-disable */
// Doctor dashboard — queue, JRISSI watchlist, forecasts

const PATIENTS = [{
  id: 'E-002417',
  name: 'A. Perera',
  dept: 'Engineering',
  jrissi: 78,
  jr_delta: '+12',
  last: '2 d ago',
  flags: ['JRISSI High', 'Asthma']
}, {
  id: 'E-002104',
  name: 'S. Fernando',
  dept: 'HR',
  jrissi: 52,
  jr_delta: '+6',
  last: '5 d ago',
  flags: ['Allergy watch']
}, {
  id: 'E-001998',
  name: 'D. Anuradha',
  dept: 'Engineering',
  jrissi: 31,
  jr_delta: '-3',
  last: '1 d ago',
  flags: []
}, {
  id: 'E-001890',
  name: 'P. Jayasinghe',
  dept: 'Operations',
  jrissi: 44,
  jr_delta: '+2',
  last: '3 d ago',
  flags: ['Hypertension']
}, {
  id: 'E-001705',
  name: 'K. Silva',
  dept: 'Finance',
  jrissi: 19,
  jr_delta: '-1',
  last: 'today',
  flags: []
}];
function DoctorDashboard({
  onOpenPatient
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Thursday \xB7 14 May 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Good morning, Dr. Withana."), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "3 employees flagged overnight. 1 escalation pending review.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export day report"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "add"
  }, "New consultation"))), /*#__PURE__*/React.createElement(Banner, {
    tone: "danger",
    title: "JRISSI sustained High for 14 days."
  }, "A. Perera (E-002417) requires escalation. ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenPatient('E-002417');
    },
    style: {
      color: 'var(--danger-fg)',
      textDecoration: 'underline'
    }
  }, "Open record"), "."), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, [{
    icon: 'groups',
    label: 'Active employees',
    value: '1,284'
  }, {
    icon: 'event_available',
    label: 'Today\'s queue',
    value: '12',
    delta: '3 pre-visit briefings ready',
    deltaTone: 'good'
  }, {
    icon: 'psychology',
    label: 'JRISSI High',
    value: '4',
    delta: '+1 vs last week',
    deltaTone: 'bad'
  }, {
    icon: 'insights',
    label: 'Forecast watch',
    value: '3',
    delta: 'Pollen rising Thu',
    deltaTone: 'neutral'
  }, {
    icon: 'priority_high',
    label: 'Escalations',
    value: '1'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 4 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Doctor-only"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "JRISSI watchlist")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "High \xB7 4"), /*#__PURE__*/React.createElement(Chip, {
    tone: "moderate",
    dot: true
  }, "Moderate \xB7 11"))), /*#__PURE__*/React.createElement("div", null, PATIENTS.map((p, i) => {
    const tone = p.jrissi < 34 ? 'low' : p.jrissi < 67 ? 'moderate' : 'high';
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      onClick: () => onOpenPatient(p.id),
      style: {
        display: 'grid',
        gridTemplateColumns: '36px 1.5fr 1fr 110px 1fr 32px',
        alignItems: 'center',
        gap: 12,
        padding: '12px 20px',
        borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
        cursor: 'pointer',
        transition: 'background var(--dur-micro) var(--ease-std)'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-hover)',
      onMouseLeave: e => e.currentTarget.style.background = ''
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: 32,
      color: "var(--slate-500)"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "type-label",
      style: {
        color: 'var(--fg-1)'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "type-caption"
    }, p.id, " \xB7 ", p.dept)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 16px var(--font-mono)',
        color: 'var(--fg-1)'
      }
    }, p.jrissi), /*#__PURE__*/React.createElement(Chip, {
      tone: tone,
      dot: true,
      style: {
        padding: '2px 8px'
      }
    }, tone === 'high' ? 'High' : tone === 'moderate' ? 'Moderate' : 'Low')), /*#__PURE__*/React.createElement("div", {
      className: "type-mono",
      style: {
        color: p.jr_delta.startsWith('+') ? 'var(--danger-fg)' : 'var(--success-fg)'
      }
    }, p.jr_delta.startsWith('+') ? '↑' : '↓', " ", p.jr_delta.replace(/^[-+]/, '')), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap'
      }
    }, p.flags.length ? p.flags.map((f, j) => /*#__PURE__*/React.createElement(Chip, {
      key: j,
      tone: f.includes('JRISSI') ? 'high' : 'neutral',
      style: {
        padding: '2px 8px',
        fontSize: 11
      }
    }, f)) : /*#__PURE__*/React.createElement("span", {
      className: "type-caption"
    }, "No flags")), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron_right",
      size: 20,
      style: {
        color: 'var(--fg-3)'
      }
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Predictive layer",
    title: "14-day forecast",
    action: /*#__PURE__*/React.createElement(Button, {
      kind: "ghost",
      size: "sm",
      icon: "open_in_new"
    }, "Open")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    icon: 'cloud',
    label: 'Pollen levels rising',
    when: 'Thu 14 May',
    tone: 'moderate',
    meta: '3 allergy-history employees flagged'
  }, {
    icon: 'thermostat',
    label: 'Heat-stress probable',
    when: 'Sat 16 May',
    tone: 'moderate',
    meta: '2 hypertension flags'
  }, {
    icon: 'water_drop',
    label: 'Air-quality stable',
    when: 'Sun 17 May',
    tone: 'low',
    meta: 'No flags'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '10px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.label), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, r.when)), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.meta)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Today",
    title: "Next consultations"
  }), [{
    t: '09:30',
    n: 'A. Perera',
    r: 'Pre-visit briefing ready',
    icon: 'description'
  }, {
    t: '10:15',
    n: 'S. Fernando',
    r: 'Follow-up · allergy',
    icon: 'event_repeat'
  }, {
    t: '11:00',
    n: 'K. Silva',
    r: 'Routine check-in',
    icon: 'event_available'
  }, {
    t: '11:45',
    n: 'P. Jayasinghe',
    r: 'BP review',
    icon: 'monitor_heart'
  }].map((q, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 13px var(--font-mono)',
      color: 'var(--fg-1)',
      width: 44
    }
  }, q.t), /*#__PURE__*/React.createElement(Avatar, {
    name: q.n,
    size: 28,
    color: "var(--slate-500)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, q.n), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, q.r)), /*#__PURE__*/React.createElement(Icon, {
    name: q.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })))))));
}
Object.assign(window, {
  DoctorDashboard,
  PATIENTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/DoctorDashboard.jsx", error: String((e && e.message) || e) }); }

// src/screens/DoctorScreens.jsx
try { (() => {
/* eslint-disable */
// Doctor-facing screens: SOAP consultation editor, Prescription writer,
// JRISSI deep-dive panel, Predictive forecasting view.

// ============================================================================
// 1. SOAP CONSULTATION EDITOR
// ============================================================================
function SoapEditor() {
  const [tab, setTab] = React.useState('s');
  const [s, setS] = React.useState('Patient reports recurrent morning headaches over the past 10 days, worse after long meeting blocks. Mild congestion. Denies fever or photophobia. Sleep self-reported 5–6 h.');
  const [o, setO] = React.useState('BP 128/84 mmHg · HR 76 bpm · Temp 36.7 °C · SpO₂ 97% · BMI 24.1. No nasal discharge. Mild scleral injection. Chest clear.');
  const [a, setA] = React.useState('Tension-type headache likely; rule out early seasonal allergic rhinitis. JRISSI elevated to 78 — flagged for OH escalation.');
  const [p, setP] = React.useState('1) Cetirizine 10 mg OD × 7d. 2) Sleep hygiene leaflet. 3) Re-check JRISSI in 7d, escalate to OH psych if sustained.');
  const tabs = [{
    value: 's',
    label: 'Subjective',
    icon: 'edit_note'
  }, {
    value: 'o',
    label: 'Objective',
    icon: 'monitor_heart'
  }, {
    value: 'a',
    label: 'Assessment',
    icon: 'psychology'
  }, {
    value: 'p',
    label: 'Plan',
    icon: 'task_alt'
  }];
  const content = {
    s,
    o,
    a,
    p
  };
  const setters = {
    s: setS,
    o: setO,
    a: setA,
    p: setP
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Consultation \xB7 started 09:34"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "SOAP \u2014 A. Perera"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "E-002417 \xB7 Engineering \xB7 34 y \xB7 M \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--danger-fg)'
    }
  }, "JRISSI 78"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "history"
  }, "History"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "save"
  }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "check"
  }, "Sign & close"))), /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    title: "JRISSI sustained High for 14 days."
  }, "Consider escalation to OH psych as part of plan. ", /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      color: 'var(--warning-fg)',
      textDecoration: 'underline'
    }
  }, "Open JRISSI deep-dive"), "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 320px',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: tabs
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, tabs.find(t => t.value === tab).label, " \xB7 ", tab === 's' ? 'what the patient says' : tab === 'o' ? 'what you observe' : tab === 'a' ? 'your assessment' : 'agreed plan'), /*#__PURE__*/React.createElement(Textarea, {
    rows: 9,
    value: content[tab],
    onChange: setters[tab]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, content[tab].length, " chars \xB7 auto-saved 12 s ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "auto_awesome"
  }, "Suggest from history"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "mic"
  }, "Dictate")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '1px solid var(--border-1)'
    }
  }, tabs.map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    onClick: () => setTab(t.value),
    style: {
      flex: 1,
      border: 0,
      padding: '14px 16px',
      cursor: 'pointer',
      background: tab === t.value ? 'var(--bg-selected)' : 'var(--surface-1)',
      borderRight: i < tabs.length - 1 ? '1px solid var(--border-1)' : 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: content[t.value] ? 'check_circle' : 'radio_button_unchecked',
    size: 20,
    style: {
      fontSize: 14,
      color: content[t.value] ? 'var(--success)' : 'var(--fg-4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 12px var(--font-sans)'
    }
  }, t.label)), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      fontSize: 11
    }
  }, content[t.value] ? `${content[t.value].split(/\s+/).length} words` : 'Empty'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Vitals \xB7 today",
    title: "At a glance"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, [{
    l: 'BP',
    v: '128/84',
    u: 'mmHg',
    t: 'warning'
  }, {
    l: 'HR',
    v: '76',
    u: 'bpm',
    t: 'success'
  }, {
    l: 'Temp',
    v: '36.7',
    u: '°C',
    t: 'success'
  }, {
    l: 'SpO₂',
    v: '97',
    u: '%',
    t: 'success'
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 12,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginBottom: 4
    }
  }, m.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 18
    }
  }, m.v, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 11px var(--font-sans)',
      color: 'var(--fg-3)',
      marginLeft: 3
    }
  }, m.u)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      height: 3,
      borderRadius: 999,
      background: `var(--${m.t})`,
      opacity: 0.7
    }
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Known flags",
    title: "Patient context"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "JRISSI High \xB7 14d"), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning"
  }, "Asthma"), /*#__PURE__*/React.createElement(Chip, {
    tone: "info"
  }, "Allergy: pollen")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    d: '12 May',
    t: 'BP review · borderline'
  }, {
    d: '05 May',
    t: 'JRISSI questionnaire · 68'
  }, {
    d: '28 Apr',
    t: 'Allergic rhinitis consult'
  }, {
    d: '14 Apr',
    t: 'Annual health check'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 10,
      paddingBottom: 8,
      borderBottom: i < 3 ? '1px dashed var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)',
      width: 48
    }
  }, r.d), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.t))))))));
}

// ============================================================================
// 2. PRESCRIPTION WRITER
// ============================================================================
function PrescriptionWriter() {
  const rx = [{
    name: 'Cetirizine',
    brand: 'Zyrtec',
    strength: '10 mg',
    form: 'tab',
    dose: '1 tab OD',
    dur: '7 days',
    stock: 124,
    interactions: 0
  }, {
    name: 'Paracetamol',
    brand: 'Panadol',
    strength: '500 mg',
    form: 'tab',
    dose: '1–2 tab QDS PRN',
    dur: '5 days',
    stock: 312,
    interactions: 0
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Consultation \xB7 prescription"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Prescription \u2014 A. Perera"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Linked to today\\u2019s consultation note \xB7 auto-sent to pharmacy on sign")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "content_copy"
  }, "Copy from last visit"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "save"
  }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "send"
  }, "Sign & send"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 360px',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      gap: 10,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: "",
    placeholder: "Search by generic, brand, or ATC code\u2026",
    leading: "search",
    style: {
      flex: 1
    },
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "qr_code_scanner",
    size: "sm"
  }, "Scan")), /*#__PURE__*/React.createElement("div", null, rx.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 20,
      borderBottom: i < rx.length - 1 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, r.name, " ", r.strength), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, r.brand), /*#__PURE__*/React.createElement(Chip, {
    tone: r.interactions === 0 ? 'success' : 'warning',
    icon: r.interactions === 0 ? 'check_circle' : 'warning'
  }, r.interactions === 0 ? 'No interactions' : `${r.interactions} interactions`)), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 4
    }
  }, "Stock: ", r.stock, " packs \xB7 expires 2027-03 \xB7 FEFO ready")), /*#__PURE__*/React.createElement("button", {
    style: {
      border: 0,
      background: 'transparent',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Dose",
    value: r.dose,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Duration",
    value: r.dur,
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Route",
    value: "oral",
    options: [{
      value: 'oral',
      label: 'Oral'
    }, {
      value: 'topical',
      label: 'Topical'
    }, {
      value: 'iv',
      label: 'IV'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Quantity",
    value: r.form === 'tab' ? '7 tab' : '1 pack',
    onChange: () => {}
  })), /*#__PURE__*/React.createElement(Textarea, {
    label: "Instructions to patient",
    rows: 2,
    value: r.name === 'Cetirizine' ? 'Take in the evening. Do not combine with alcohol.' : 'Take with food. Maximum 4 doses in 24 h.',
    onChange: () => {},
    style: {
      marginTop: 12
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      background: 'var(--bg-canvas)',
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "add"
  }, "Add another medication"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Safety",
    title: "Interaction check"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      borderRadius: 8,
      background: 'var(--success-bg)',
      border: '1px solid #A7F3D0'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check_circle",
    size: 20,
    style: {
      color: 'var(--success)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--success-fg)'
    }
  }, "No interactions with patient history or active medications.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 8
    }
  }, "Checked against"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("li", {
    className: "type-body-s",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      fontSize: 14,
      color: 'var(--success)'
    }
  }), " Active prescriptions (2)"), /*#__PURE__*/React.createElement("li", {
    className: "type-body-s",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      fontSize: 14,
      color: 'var(--success)'
    }
  }), " Allergy register (pollen)"), /*#__PURE__*/React.createElement("li", {
    className: "type-body-s",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      fontSize: 14,
      color: 'var(--success)'
    }
  }), " Renal & hepatic flags (none)"), /*#__PURE__*/React.createElement("li", {
    className: "type-body-s",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 20,
    style: {
      fontSize: 14,
      color: 'var(--success)'
    }
  }), " Pregnancy register (n/a)")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Coverage",
    title: "Pharmacy & cost"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, "In on-site stock"), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--success-fg)'
    }
  }, "2 / 2")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, "Co-pay (employee)"), /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, "LKR 0.00")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, "Charged to company"), /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, "LKR 380.00")))))));
}

// ============================================================================
// 3. JRISSI DEEP-DIVE
// ============================================================================
function JrissiDeepDive() {
  const trend = [38, 42, 51, 49, 55, 58, 62, 60, 64, 68, 71, 73, 76, 78];
  const days = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const subscores = [{
    name: 'Sleep',
    score: 82,
    tone: 'high',
    delta: '↑ 14 vs baseline',
    signals: ['<6h sleep · 9 of 14 nights', 'WHOOP recovery <40%']
  }, {
    name: 'Mood',
    score: 71,
    tone: 'high',
    delta: '↑ 8',
    signals: ['Self-report low · 12/14', 'Meeting overrun pattern']
  }, {
    name: 'Stress',
    score: 76,
    tone: 'high',
    delta: '↑ 10',
    signals: ['Calendar density 87%', 'After-hours email +42%']
  }, {
    name: 'Engagement',
    score: 38,
    tone: 'low',
    delta: '↓ 4',
    signals: ['Activity logs stable']
  }, {
    name: 'Social',
    score: 44,
    tone: 'moderate',
    delta: 'stable',
    signals: ['Team check-ins normal']
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "JRISSI \xB7 Doctor-only"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Mental health risk \u2014 A. Perera"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "14-day score window \xB7 signals derived from passive & self-report inputs")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "info"
  }, "Methodology"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    kind: "danger",
    icon: "forward"
  }, "Escalate to OH"))), /*#__PURE__*/React.createElement(Banner, {
    tone: "danger",
    title: "JRISSI sustained High for 14 days."
  }, "Threshold for escalation is 14 consecutive days \u2265 67. Today is day 14."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Current score",
    title: "Composite"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      padding: '12px 0'
    }
  }, /*#__PURE__*/React.createElement(JrissiGauge, {
    score: 78,
    size: 200
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    label: "7-day avg",
    value: "74",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "30-day avg",
    value: "61",
    tone: "moderate"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Highest",
    value: "78",
    tone: "danger"
  }), /*#__PURE__*/React.createElement(Stat, {
    label: "Trend",
    value: "\u2191 14",
    tone: "danger"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Trend \xB7 14 days",
    title: "Score over time",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Chip, {
      tone: "neutral"
    }, "7 d"), /*#__PURE__*/React.createElement(Chip, {
      tone: "info",
      dot: true
    }, "14 d"), /*#__PURE__*/React.createElement(Chip, {
      tone: "neutral"
    }, "30 d"))
  }), /*#__PURE__*/React.createElement(LineChart, {
    data: trend,
    width: 600,
    height: 220,
    xLabels: days,
    yMin: 0,
    yMax: 100,
    refLines: [{
      value: 34,
      label: 'Low threshold',
      color: 'var(--success)'
    }, {
      value: 67,
      label: 'High threshold',
      color: 'var(--danger)'
    }]
  }))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Sub-scores"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Component breakdown")), /*#__PURE__*/React.createElement("div", null, subscores.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '180px 90px 1fr 1fr 40px',
      gap: 16,
      alignItems: 'center',
      padding: '14px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '600 22px var(--font-mono)',
      color: 'var(--fg-1)'
    }
  }, s.score), /*#__PURE__*/React.createElement(Chip, {
    tone: s.tone,
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, s.tone === 'high' ? 'High' : s.tone === 'moderate' ? 'Mod' : 'Low')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Progress, {
    value: s.score,
    tone: s.tone === 'high' ? 'danger' : s.tone === 'moderate' ? 'warning' : 'success'
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, s.signals.map((sig, j) => /*#__PURE__*/React.createElement("span", {
    key: j,
    className: "type-caption"
  }, "\xB7 ", sig))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Suggested",
    title: "Closed-loop interventions"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    icon: 'self_improvement',
    t: 'Refer to OH psychologist',
    d: 'Highest score driver: stress + mood. Auto-book within 48 h.',
    tone: 'danger'
  }, {
    icon: 'event_busy',
    t: 'Block 1h "deep work" daily',
    d: 'Recommend calendar protect via HR.',
    tone: 'warning'
  }, {
    icon: 'bedtime',
    t: 'Sleep hygiene module',
    d: 'Push notification to MRAS app this evening.',
    tone: 'info'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: 12,
      borderRadius: 8,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: `var(--${s.tone}-bg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20,
    style: {
      color: `var(--${s.tone})`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.t), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, s.d)), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm"
  }, "Apply"))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Escalation timeline",
    title: "Audit trail"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, [{
    d: '14 May · 09:30',
    e: 'Threshold crossed for escalation (14d sustained High).',
    tone: 'danger'
  }, {
    d: '07 May · 16:12',
    e: 'Auto-notification sent · self-report wellness module.',
    tone: 'info'
  }, {
    d: '02 May · 09:00',
    e: 'JRISSI High first observed (score 71).',
    tone: 'warning'
  }, {
    d: '14 Apr · 11:00',
    e: 'Baseline established at 38 (annual check).',
    tone: 'success'
  }].map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: `var(--${e.tone})`
    }
  }), i < 3 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 1,
      flex: 1,
      background: 'var(--border-1)',
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, e.d), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)',
      marginTop: 2
    }
  }, e.e))))))));
}
function Stat({
  label,
  value,
  tone
}) {
  const map = {
    warning: 'var(--warning-fg)',
    danger: 'var(--danger-fg)',
    success: 'var(--success-fg)',
    moderate: 'var(--warning-fg)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 12px',
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginBottom: 2
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 18,
      color: map[tone] || 'var(--fg-1)'
    }
  }, value));
}

// ============================================================================
// 4. PREDICTIVE FORECASTING
// ============================================================================
function ForecastingView() {
  const pollen = [22, 30, 28, 35, 48, 62, 78, 71, 64, 52, 41, 38, 32, 28];
  const heat = [28, 29, 30, 29, 31, 33, 35, 36, 34, 32, 31, 30, 29, 28];
  const dayLbls = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun', '', 'Tue', '', 'Thu', '', 'Sat', ''];
  const forecasts = [{
    icon: 'cloud',
    name: 'Pollen',
    risk: 'moderate',
    peakDay: 'Thu 14',
    peakLabel: 'Peak: 78 grains/m³',
    affected: 3,
    conditions: ['Allergic rhinitis', 'Asthma'],
    data: pollen,
    color: 'var(--warning)'
  }, {
    icon: 'thermostat',
    name: 'Heat-stress',
    risk: 'moderate',
    peakDay: 'Sat 16',
    peakLabel: 'Peak: 36 °C feels-like',
    affected: 2,
    conditions: ['Hypertension'],
    data: heat,
    color: 'var(--warning)'
  }, {
    icon: 'air',
    name: 'Air quality',
    risk: 'low',
    peakDay: 'Sun 17',
    peakLabel: 'PM2.5 stable',
    affected: 0,
    conditions: [],
    data: [22, 24, 23, 25, 24, 22, 23, 24, 22, 23, 24, 22, 23, 22],
    color: 'var(--success)'
  }, {
    icon: 'water_drop',
    name: 'Influenza signal',
    risk: 'low',
    peakDay: 'next week',
    peakLabel: 'Local incidence stable',
    affected: 0,
    conditions: [],
    data: [12, 14, 13, 12, 13, 14, 12, 11, 12, 13, 12, 12, 13, 12],
    color: 'var(--success)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Predictive layer \xB7 14-day horizon"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Forecasts"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Illness signals 3\u201314 days ahead. Cross-referenced with employee condition register.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "refresh"
  }, "Last sync 12 min"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "settings"
  }, "Sources"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "campaign"
  }, "Push pre-emptive alerts"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }, [{
    l: 'Watch events',
    v: '2',
    d: 'Pollen Thu · Heat Sat',
    tone: 'warning'
  }, {
    l: 'Employees flagged',
    v: '5',
    d: '3 allergy · 2 hypertension',
    tone: 'warning'
  }, {
    l: 'Pre-alerts queued',
    v: '5',
    d: 'Awaiting doctor approval',
    tone: 'info'
  }, {
    l: 'Forecast confidence',
    v: '0.86',
    d: 'Above threshold (0.7)',
    tone: 'success'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '16px 20px',
      borderRight: i < 3 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, s.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 26,
      color: `var(--${s.tone}-fg)`,
      marginBottom: 4
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, s.d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, forecasts.map((f, i) => /*#__PURE__*/React.createElement(Card, {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: f.risk === 'moderate' ? 'var(--warning-bg)' : 'var(--success-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon,
    size: 24,
    style: {
      color: f.risk === 'moderate' ? 'var(--warning)' : 'var(--success)'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 2
    }
  }, f.peakDay, " \xB7 ", f.peakLabel), /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, f.name))), /*#__PURE__*/React.createElement(Chip, {
    tone: f.risk,
    dot: true
  }, f.risk === 'moderate' ? 'Watch' : 'Stable')), /*#__PURE__*/React.createElement(LineChart, {
    data: f.data,
    width: 460,
    height: 120,
    color: f.color,
    xLabels: dayLbls
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 10,
      paddingTop: 10,
      borderTop: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s"
  }, f.affected > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, f.affected, " employees flagged \xB7 ", f.conditions.join(', ')) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)'
    }
  }, "No employees flagged for this signal.")), f.affected > 0 && /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "open_in_new"
  }, "Review"))))));
}

// ============================================================================
// 5. JRISSI / AI — workforce mental-health scores + AI predictions (/ai)
// ============================================================================
function JrissiAiOverview({
  onOpenPatient
}) {
  const dist = [{
    d: 'Mon',
    l: 64,
    m: 24,
    h: 12
  }, {
    d: 'Tue',
    l: 62,
    m: 26,
    h: 12
  }, {
    d: 'Wed',
    l: 60,
    m: 27,
    h: 13
  }, {
    d: 'Thu',
    l: 61,
    m: 25,
    h: 14
  }, {
    d: 'Fri',
    l: 59,
    m: 27,
    h: 14
  }, {
    d: 'Sat',
    l: 63,
    m: 25,
    h: 12
  }, {
    d: 'Sun',
    l: 65,
    m: 24,
    h: 11
  }];
  const avgTrend = [36, 35, 37, 38, 36, 35, 34, 35, 34, 33, 34, 35, 34, 34];
  const trendDays = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const watch = [{
    id: 'E-002417',
    name: 'A. Perera',
    dept: 'Engineering',
    jrissi: 78,
    delta: '+12',
    days: 14,
    driver: 'Sleep · Stress',
    escalate: true
  }, {
    id: 'E-001602',
    name: 'M. Karunaratne',
    dept: 'Engineering',
    jrissi: 66,
    delta: '+9',
    days: 6,
    driver: 'Stress · Mood',
    escalate: false
  }, {
    id: 'E-002104',
    name: 'S. Fernando',
    dept: 'HR',
    jrissi: 52,
    delta: '+6',
    days: 3,
    driver: 'Mood',
    escalate: false
  }, {
    id: 'E-001890',
    name: 'P. Jayasinghe',
    dept: 'Operations',
    jrissi: 44,
    delta: '+2',
    days: 2,
    driver: 'Sleep',
    escalate: false
  }];
  const predictions = [{
    icon: 'psychology',
    tone: 'danger',
    conf: 0.91,
    title: 'A. Perera likely to breach escalation threshold today',
    body: '14-day sustained High projected to continue. Recommend OH referral within 48 h.',
    when: 'Now',
    pid: 'E-002417'
  }, {
    icon: 'groups',
    tone: 'warning',
    conf: 0.84,
    title: 'Engineering team stress rising into sprint deadline',
    body: '3 employees trending toward Moderate. Suggest workload check-in with team lead.',
    when: 'This week'
  }, {
    icon: 'cloud',
    tone: 'warning',
    conf: 0.86,
    title: 'Pollen peak Thursday — 3 allergy-history employees',
    body: 'Cross-referenced with JRISSI: 1 also shows elevated stress. Monitor closely.',
    when: 'Thu 14'
  }, {
    icon: 'bedtime',
    tone: 'info',
    conf: 0.78,
    title: 'Sleep-debt cluster in night-shift cohort',
    body: '6 employees averaging <6 h. Push sleep-hygiene module proactively.',
    when: '3–5 days'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "JRISSI / AI \xB7 doctor-only \xB7 workforce"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Mental health & AI predictions"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Population-level JRISSI signal with the predictive model\\u2019s next-best-actions. 4 employees on the watchlist \xB7 1 escalation due.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "info"
  }, "Model card"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "campaign"
  }, "Push interventions"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  }, [{
    l: 'Workforce avg JRISSI',
    v: '34',
    d: '↓ 2 vs Q1',
    tone: 'success',
    icon: 'monitoring'
  }, {
    l: 'On watchlist',
    v: '15',
    d: '4 High · 11 Moderate',
    tone: 'warning',
    icon: 'visibility'
  }, {
    l: 'Escalations due',
    v: '1',
    d: 'A. Perera · 14d',
    tone: 'danger',
    icon: 'priority_high'
  }, {
    l: 'Model confidence',
    v: '0.86',
    d: 'Above threshold 0.70',
    tone: 'success',
    icon: 'auto_awesome'
  }, {
    l: 'Last inference',
    v: '12m',
    d: 'ago · hourly cadence',
    tone: 'info',
    icon: 'schedule'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '16px 18px',
      borderRight: i < 4 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon,
    size: 20,
    style: {
      color: 'var(--primary)',
      fontSize: 16
    }
  }), s.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 26,
      color: `var(--${s.tone}-fg)`,
      marginBottom: 2
    }
  }, s.v), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, s.d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "auto_awesome",
    size: 20,
    style: {
      color: 'var(--primary)',
      fontSize: 15
    }
  }), "Predictive model"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Next-best-actions")), /*#__PURE__*/React.createElement(Chip, {
    tone: "info",
    dot: true
  }, "4 active")), /*#__PURE__*/React.createElement("div", null, predictions.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 14,
      padding: '16px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 10,
      background: `var(--${p.tone}-bg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 24,
    style: {
      color: `var(--${p.tone})`
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, p.title), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      flex: '0 0 auto'
    }
  }, p.when)), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginTop: 4
    }
  }, p.body), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flex: 1,
      maxWidth: 180
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      flex: '0 0 auto'
    }
  }, "Confidence"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 5,
      borderRadius: 999,
      background: 'var(--bg-hover)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${p.conf * 100}%`,
      height: '100%',
      background: `var(--${p.tone})`,
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-2)'
    }
  }, p.conf.toFixed(2))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginLeft: 'auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm"
  }, "Dismiss"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: p.pid ? 'open_in_new' : 'check',
    onClick: () => p.pid && onOpenPatient && onOpenPatient(p.pid)
  }, p.pid ? 'Open record' : 'Apply')))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Workforce \xB7 today",
    title: "JRISSI distribution"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Donut, {
    size: 120,
    thickness: 16,
    segments: [{
      value: 968,
      color: 'var(--risk-low)'
    }, {
      value: 271,
      color: 'var(--risk-moderate)'
    }, {
      value: 45,
      color: 'var(--risk-high)'
    }]
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      flex: 1
    }
  }, [{
    c: 'var(--risk-low)',
    l: 'Low',
    v: '968',
    p: '75%'
  }, {
    c: 'var(--risk-moderate)',
    l: 'Moderate',
    v: '271',
    p: '21%'
  }, {
    c: 'var(--risk-high)',
    l: 'High',
    v: '45',
    p: '4%'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 3,
      background: r.c
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      flex: 1,
      color: 'var(--fg-2)'
    }
  }, r.l), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.v), /*#__PURE__*/React.createElement("span", {
    className: "type-caption",
    style: {
      width: 36,
      textAlign: 'right'
    }
  }, r.p)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "14-day",
    title: "Avg score trend",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "success",
      dot: true
    }, "Stable")
  }), /*#__PURE__*/React.createElement(LineChart, {
    data: avgTrend,
    width: 420,
    height: 150,
    xLabels: trendDays,
    yMin: 0,
    yMax: 100,
    refLines: [{
      value: 34,
      label: 'Low threshold',
      color: 'var(--success)'
    }]
  })))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Doctor-only"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "JRISSI watchlist \xB7 AI-ranked")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "High \xB7 4"), /*#__PURE__*/React.createElement(Chip, {
    tone: "moderate",
    dot: true
  }, "Moderate \xB7 11"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Employee', 'JRISSI', '14d', 'Δ', 'Sustained', 'Top drivers (AI)', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: '500 11px var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--fg-3)',
      textAlign: i === 1 || i === 3 ? 'right' : 'left',
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, watch.map((p, i) => {
    const tone = p.jrissi < 34 ? 'low' : p.jrissi < 67 ? 'moderate' : 'high';
    const spark = [p.jrissi - 18, p.jrissi - 14, p.jrissi - 12, p.jrissi - 9, p.jrissi - 6, p.jrissi - 3, p.jrissi];
    return /*#__PURE__*/React.createElement("tr", {
      key: i,
      onClick: () => onOpenPatient && onOpenPatient(p.id),
      style: {
        cursor: 'pointer'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-hover)',
      onMouseLeave: e => e.currentTarget.style.background = ''
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: p.name,
      size: 30,
      color: "var(--slate-500)"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "type-label",
      style: {
        color: 'var(--fg-1)'
      }
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "type-caption"
    }, p.id, " \xB7 ", p.dept)))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        font: '600 16px var(--font-mono)',
        color: 'var(--fg-1)'
      }
    }, p.jrissi), /*#__PURE__*/React.createElement(Chip, {
      tone: tone,
      dot: true,
      style: {
        padding: '2px 8px'
      }
    }, tone === 'high' ? 'High' : tone === 'moderate' ? 'Mod' : 'Low'))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement(Sparkline, {
      data: spark,
      width: 80,
      height: 26,
      color: tone === 'high' ? 'var(--danger)' : tone === 'moderate' ? 'var(--warning)' : 'var(--success)'
    })), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)',
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-mono",
      style: {
        color: 'var(--danger-fg)'
      }
    }, "\u2191 ", p.delta.replace('+', ''))), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-mono",
      style: {
        color: p.days >= 14 ? 'var(--danger-fg)' : 'var(--fg-2)'
      }
    }, p.days, " d"), p.days >= 14 && /*#__PURE__*/React.createElement(Chip, {
      tone: "danger",
      style: {
        padding: '2px 8px',
        marginLeft: 6
      }
    }, "Escalate")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-body-s",
      style: {
        color: 'var(--fg-2)'
      }
    }, p.driver)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-1)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron_right",
      size: 20,
      style: {
        color: 'var(--fg-3)'
      }
    })));
  })))));
}
Object.assign(window, {
  SoapEditor,
  PrescriptionWriter,
  JrissiDeepDive,
  ForecastingView,
  JrissiAiOverview
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/DoctorScreens.jsx", error: String((e && e.message) || e) }); }

// src/screens/EmployeeHome.jsx
try { (() => {
/* eslint-disable */
// Employee check-in / personal health view

function EmployeeHome({
  onCheckIn
}) {
  const [checkedIn, setCheckedIn] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maxWidth: 1100,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Thursday \xB7 14 May 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Hi, Sandun."), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Your next consultation is on Friday at 10:15 with Dr. Withana.")), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "qr_code_2",
    size: "lg",
    onClick: () => setCheckedIn(true)
  }, checkedIn ? 'Checked in' : 'Check in')), checkedIn && /*#__PURE__*/React.createElement(Banner, {
    tone: "success",
    title: "Checked in."
  }, "Your pre-visit briefing is being prepared for Dr. Withana. You can leave the medical room \u2014 we'll notify you when it's your turn."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.5fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Today's snapshot",
    title: "How you're tracking"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0,
      border: '1px solid var(--border-1)',
      borderRadius: 10,
      overflow: 'hidden'
    }
  }, [{
    icon: 'bedtime',
    label: 'Sleep',
    value: '6.4',
    unit: 'h',
    delta: 'Below target'
  }, {
    icon: 'directions_walk',
    label: 'Steps',
    value: '4,210',
    unit: '',
    delta: '52% of 8k goal'
  }, {
    icon: 'ecg_heart',
    label: 'Resting HR',
    value: '68',
    unit: 'bpm',
    delta: 'Normal'
  }, {
    icon: 'self_improvement',
    label: 'Mood',
    value: '3',
    unit: '/ 5',
    delta: 'Steady'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 3 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Daily log",
    title: "How are you feeling today?"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 12
    }
  }, ['terrible', 'poor', 'okay', 'good', 'great'].map((m, i) => /*#__PURE__*/React.createElement("button", {
    key: m,
    style: {
      flex: 1,
      border: '1px solid var(--border-2)',
      background: 'var(--surface-1)',
      borderRadius: 10,
      padding: '10px 0',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      color: 'var(--fg-2)',
      font: '500 11px var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ['sentiment_very_dissatisfied', 'sentiment_dissatisfied', 'sentiment_neutral', 'sentiment_satisfied', 'sentiment_very_satisfied'][i],
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'capitalize'
    }
  }, m)))), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "edit_note",
    style: {
      width: '100%'
    }
  }, "Add a note (optional)"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "From your medical team",
    title: "Notifications"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    icon: "cloud",
    title: "Pollen forecast rising Thursday."
  }, "Take your prescribed antihistamine before leaving home. Set as reminder?"), /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    icon: "bedtime",
    title: "Sleep trending low."
  }, "Your average is 5.9 h over the last 7 days. Try winding down 30 minutes earlier tonight."), /*#__PURE__*/React.createElement(Banner, {
    tone: "success",
    icon: "celebration",
    title: "14-day walking streak."
  }, "Keep going \u2014 you're 3 days from a personal best."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Upcoming",
    title: "Consultations"
  }), [{
    d: 'Fri 15 May · 10:15',
    who: 'Dr. Withana',
    sub: 'BP review · in-person'
  }, {
    d: 'Wed 03 Jun · 11:00',
    who: 'Dr. Fernando',
    sub: 'Annual check-up'
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, c.who), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, c.sub)), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, c.d), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      font: '500 12px var(--font-sans)',
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "Reschedule"))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Active prescriptions",
    title: "Medicines"
  }), [{
    n: 'Cetirizine 10 mg',
    sub: '1 tab · before bed · until 19 May',
    icon: 'pill'
  }, {
    n: 'Amlodipine 5 mg',
    sub: '1 tab · morning · ongoing',
    icon: 'vaccines'
  }].map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, m.n), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, m.sub)))))));
}
Object.assign(window, {
  EmployeeHome
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/EmployeeHome.jsx", error: String((e && e.message) || e) }); }

// src/screens/EmployeeScreens.jsx
try { (() => {
/* eslint-disable */
// Employee-facing screens: wellness home (timeline), appointment / QR check-in.

// ============================================================================
// 1. WELLNESS HOME (timeline + your health)
// ============================================================================
function EmployeeWellness() {
  const week = [62, 68, 71, 64, 75, 70, 73];
  const weekLbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Thursday \xB7 14 May 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Good morning, Shashika."), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "You\\u2019re trending well. Your next check-in is on Tuesday at 10:00.")), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "qr_code_2"
  }, "Open my QR")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "This week",
    title: "Wellness score",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "success",
      dot: true
    }, "Trending up")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 16,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 48,
      lineHeight: 1
    }
  }, "73"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      paddingBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--success-fg)'
    }
  }, "\u2191 4"), " vs last week")), /*#__PURE__*/React.createElement(BarChart, {
    data: week,
    labels: weekLbls,
    width: 520,
    height: 130,
    color: "var(--success)",
    max: 100
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Next",
    title: "Appointment"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 14,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 10,
      background: 'var(--primary)',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      opacity: 0.85
    }
  }, "Tue"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: '700 22px var(--font-sans)',
      lineHeight: 1
    }
  }, "19")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, "Routine check-in"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, "10:00 \xB7 15 min \xB7 Dr. Withana \xB7 Room MR-1"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "event_repeat",
    style: {
      flex: 1
    }
  }, "Reschedule"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "add_alert",
    style: {
      flex: 1
    }
  }, "Add reminder")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      padding: 12,
      borderRadius: 8,
      background: 'var(--info-bg)',
      display: 'flex',
      gap: 10,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info",
    size: 20,
    style: {
      color: 'var(--info)',
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--info-fg)'
    }
  }, "Your doctor has prepared a pre-visit briefing. You\\u2019ll see it the morning of the visit.")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    i: 'monitor_heart',
    l: 'Heart rate · resting',
    v: '72',
    u: 'bpm',
    d: [70, 72, 71, 74, 72, 71, 73, 72],
    c: 'var(--success)'
  }, {
    i: 'air',
    l: 'SpO₂',
    v: '98',
    u: '%',
    d: [98, 97, 98, 98, 97, 98, 98, 98],
    c: 'var(--success)'
  }, {
    i: 'directions_run',
    l: 'Steps · today',
    v: '7,432',
    u: '',
    d: [6500, 7200, 6800, 7400, 7100, 7300, 7400, 7432],
    c: 'var(--info)'
  }, {
    i: 'bedtime',
    l: 'Sleep · 7-day avg',
    v: '7.2',
    u: 'h',
    d: [6.8, 7.1, 7.0, 7.4, 7.2, 7.1, 7.3, 7.2],
    c: 'var(--primary)'
  }].map((m, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.i,
    size: 20,
    style: {
      color: 'var(--primary)',
      fontSize: 16
    }
  }), m.l), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 22,
      marginBottom: 6
    }
  }, m.v, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-sans)',
      color: 'var(--fg-3)',
      marginLeft: 3
    }
  }, m.u)), /*#__PURE__*/React.createElement(Sparkline, {
    data: m.d,
    width: 200,
    height: 32,
    color: m.c
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Activity"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Your timeline")), /*#__PURE__*/React.createElement("div", null, [{
    d: 'Today',
    t: '08:14',
    e: 'Wellness score updated to 73',
    icon: 'trending_up',
    tone: 'success'
  }, {
    d: 'Today',
    t: '07:30',
    e: 'Synced fitness data · 7,432 steps yesterday',
    icon: 'sync',
    tone: 'info'
  }, {
    d: 'Yesterday',
    t: '14:20',
    e: 'Pre-visit briefing prepared for Tue 10:00',
    icon: 'description',
    tone: 'info'
  }, {
    d: '12 May',
    t: '09:34',
    e: 'Allergy follow-up · cetirizine prescribed',
    icon: 'medication',
    tone: 'primary'
  }, {
    d: '05 May',
    t: '10:15',
    e: 'JRISSI self-report submitted',
    icon: 'psychology',
    tone: 'primary'
  }, {
    d: '28 Apr',
    t: '09:00',
    e: 'Annual health check completed',
    icon: 'check_circle',
    tone: 'success'
  }].map((row, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 36px 1fr 80px',
      gap: 12,
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, row.d), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: row.icon,
    size: 20,
    style: {
      color: `var(--${row.tone === 'primary' ? 'primary' : row.tone})`
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, row.e), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)',
      textAlign: 'right'
    }
  }, row.t))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Personal",
    title: "Your goals"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    label: "Steps (10,000 / day)",
    value: 74,
    tone: "primary"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Sleep (7.5 h / night)",
    value: 86,
    tone: "success"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Mindfulness sessions \xB7 this week",
    value: 40,
    tone: "warning"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Hydration (2 L / day)",
    value: 62,
    tone: "primary"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 12,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px dashed var(--border-2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, "Suggested \xB7 this evening"), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, "10-minute breathing exercise. Your stress signal is slightly elevated."), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "play_arrow",
    style: {
      marginTop: 8
    }
  }, "Start session")))));
}

// ============================================================================
// 2. APPOINTMENT SCHEDULING + QR CHECK-IN
// ============================================================================
function AppointmentScheduling() {
  const [date, setDate] = React.useState('2026-05-19');
  const [slot, setSlot] = React.useState('10:00');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Employee \xB7 book"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Schedule a check-in"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Pick a date and time. You\\u2019ll receive a QR code to scan on arrival."))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '300px 1fr 360px',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 16
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Select date"), /*#__PURE__*/React.createElement(MiniCalendar, {
    value: date,
    onChange: setDate,
    marks: {
      '2026-05-19': true,
      '2026-05-22': true,
      '2026-05-26': true
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      marginTop: 14,
      padding: '8px 10px',
      borderRadius: 8,
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: 999,
      background: 'var(--primary)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "Marked dates have your existing bookings"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: new Date(date).toLocaleDateString('en', {
      weekday: 'long'
    }),
    title: new Date(date).toLocaleDateString('en', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }),
    action: /*#__PURE__*/React.createElement(Select, {
      value: "routine",
      options: [{
        value: 'routine',
        label: 'Routine check-in (15 min)'
      }, {
        value: 'followup',
        label: 'Follow-up (20 min)'
      }, {
        value: 'urgent',
        label: 'Urgent (30 min)'
      }],
      onChange: () => {}
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Morning"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 8,
      marginBottom: 16
    }
  }, ['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:30', '11:45'].map((t, i) => {
    const taken = ['09:15', '09:45', '10:30'].includes(t);
    const sel = slot === t;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      disabled: taken,
      onClick: () => setSlot(t),
      style: {
        padding: '10px 8px',
        borderRadius: 8,
        cursor: taken ? 'not-allowed' : 'pointer',
        border: `1px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
        background: sel ? 'var(--primary)' : taken ? 'var(--bg-canvas)' : 'var(--surface-1)',
        color: sel ? '#fff' : taken ? 'var(--fg-4)' : 'var(--fg-1)',
        font: '500 13px var(--font-mono)',
        textDecoration: taken ? 'line-through' : 'none'
      }
    }, t);
  })), /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 10
    }
  }, "Afternoon"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 8
    }
  }, ['14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'].map((t, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setSlot(t),
    style: {
      padding: '10px 8px',
      borderRadius: 8,
      cursor: 'pointer',
      border: `1px solid ${slot === t ? 'var(--primary)' : 'var(--border-1)'}`,
      background: slot === t ? 'var(--primary)' : 'var(--surface-1)',
      color: slot === t ? '#fff' : 'var(--fg-1)',
      font: '500 13px var(--font-mono)'
    }
  }, t)))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Confirm",
    title: "Your booking"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      borderRadius: 10,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Date",
    value: new Date(date).toLocaleDateString('en', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Time",
    value: slot
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Type",
    value: "Routine \xB7 15 min"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Doctor",
    value: "Dr. Withana"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Room",
    value: "MR-1"
  })), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "check",
    style: {
      marginTop: 14,
      width: '100%',
      justifyContent: 'center'
    }
  }, "Confirm booking"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      paddingTop: 14,
      borderTop: '1px dashed var(--border-1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Check-in QR \xB7 preview"), /*#__PURE__*/React.createElement(QrPlaceholder, {
    size: 140
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      textAlign: 'center'
    }
  }, "Sent to your phone after confirmation. Scan at the MRAS kiosk on arrival.")))));
}
function QrPlaceholder({
  size = 140
}) {
  // Minimal QR-ish svg for placeholder rendering
  const grid = 17;
  const cells = [];
  const seed = 'mras-qr-placeholder';
  let h = 0;
  for (const c of seed) h = h * 31 + c.charCodeAt(0) | 0;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      h = h * 1103515245 + 12345 | 0;
      const on = (h >>> 16) % 100 < 50;
      const corner = x < 4 && y < 4 || x > grid - 5 && y < 4 || x < 4 && y > grid - 5;
      cells.push(/*#__PURE__*/React.createElement("rect", {
        key: `${x}-${y}`,
        x: x,
        y: y,
        width: "1",
        height: "1",
        fill: corner || on ? 'var(--fg-1)' : 'transparent'
      }));
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      padding: 10,
      border: '1px solid var(--border-1)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${grid} ${grid}`
  }, cells, [[0, 0], [grid - 7, 0], [0, grid - 7]].map((p, i) => /*#__PURE__*/React.createElement("g", {
    key: i
  }, /*#__PURE__*/React.createElement("rect", {
    x: p[0],
    y: p[1],
    width: "7",
    height: "7",
    fill: "none",
    stroke: "var(--fg-1)",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: p[0] + 2,
    y: p[1] + 2,
    width: "3",
    height: "3",
    fill: "var(--fg-1)"
  })))));
}

// ============================================================================
// 3. KIOSK CHECK-IN (compact / large display)
// ============================================================================
function KioskCheckIn() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 48,
      gap: 24,
      minHeight: 600,
      background: 'linear-gradient(160deg, var(--teal-800) 0%, var(--teal-900) 100%)',
      borderRadius: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: window.__resources && window.__resources.mrasWordmark || "assets/mras-wordmark.svg",
    alt: "MRAS",
    style: {
      height: 40,
      filter: 'brightness(0) invert(1)',
      opacity: 0.92
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      padding: 36,
      borderRadius: 20,
      boxShadow: 'var(--shadow-3)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 18,
      maxWidth: 460,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      color: 'var(--primary)'
    }
  }, "MRAS Kiosk \xB7 Room MR-1"), /*#__PURE__*/React.createElement("div", {
    className: "type-h1",
    style: {
      textAlign: 'center'
    }
  }, "Scan to check in"), /*#__PURE__*/React.createElement(QrPlaceholder, {
    size: 240
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body",
    style: {
      textAlign: 'center',
      maxWidth: 320
    }
  }, "Hold your MRAS QR code up to the camera. Your record will load on the doctor\\u2019s screen automatically."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: 999,
      background: 'var(--success)',
      animation: 'mrasPulse 1.6s ease-in-out infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, "Camera ready \xB7 waiting for scan"))), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      color: 'rgba(255,255,255,0.65)'
    }
  }, "No QR code? ", /*#__PURE__*/React.createElement("span", {
    style: {
      textDecoration: 'underline'
    }
  }, "Sign in with employee ID instead")));
}
Object.assign(window, {
  EmployeeWellness,
  AppointmentScheduling,
  KioskCheckIn,
  QrPlaceholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/EmployeeScreens.jsx", error: String((e && e.message) || e) }); }

// src/screens/PatientRecord.jsx
try { (() => {
/* eslint-disable */
// Patient record — vitals, JRISSI panel, trends, consultations

function PatientRecord({
  patientId,
  onBack
}) {
  const p = (window.PATIENTS || []).find(x => x.id === patientId) || {
    id: patientId || 'E-002417',
    name: 'A. Perera',
    dept: 'Engineering',
    jrissi: 78,
    jr_delta: '+12',
    last: '2 d ago',
    flags: ['JRISSI High', 'Asthma']
  };
  const sleepTrend = [7.2, 7.0, 6.8, 6.3, 6.0, 5.5, 5.3, 5.0, 4.8, 5.1, 4.6, 4.4, 4.7, 4.3];
  const stepsTrend = [9200, 8400, 8800, 7600, 7100, 6800, 6500, 5900, 6200, 5400, 5100, 5700, 4900, 5200];
  const moodTrend = [4, 4, 3, 3, 3, 2, 2, 3, 2, 2, 1, 2, 1, 1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      font: '400 13px var(--font-sans)',
      color: 'var(--fg-3)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onBack();
    },
    style: {
      color: 'var(--primary)',
      textDecoration: 'none'
    }
  }, "Patients"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20,
    style: {
      fontSize: 14
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-1)'
    }
  }, p.name)), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: p.name,
    size: 64,
    color: "var(--slate-500)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h1", {
    className: "type-h1",
    style: {
      marginBottom: 4
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      display: 'flex',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)'
    }
  }, p.id), " \xB7 ", p.dept), /*#__PURE__*/React.createElement("span", null, "32 y \xB7 M \xB7 O+"), /*#__PURE__*/React.createElement("span", null, "Last seen ", p.last)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "high",
    dot: true
  }, "JRISSI High \xB7 ", p.jrissi), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning",
    icon: "warning"
  }, "Asthma \xB7 seasonal"), /*#__PURE__*/React.createElement(Chip, {
    tone: "info"
  }, "Allergy: pollen, dust"), /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral"
  }, "Non-smoker"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "stethoscope"
  }, "Start consultation"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "description"
  }, "Pre-visit briefing")))), /*#__PURE__*/React.createElement(Banner, {
    tone: "danger",
    title: "Auto-escalation triggered."
  }, "JRISSI score has been \u2265 67 for 14 consecutive days without consultation. Behaviour-correction engine has paused notifications pending clinician review."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.7fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Vital signs \xB7 last check-in"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Thu 12 May \xB7 09:14")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  }, [{
    icon: 'ecg_heart',
    label: 'Heart rate',
    value: '72',
    unit: 'bpm',
    delta: '↓ 3 vs avg',
    deltaTone: 'good'
  }, {
    icon: 'monitor_heart',
    label: 'Blood pressure',
    value: '138/86',
    unit: 'mmHg',
    delta: '↑ Stage 1',
    deltaTone: 'bad'
  }, {
    icon: 'thermostat',
    label: 'Temperature',
    value: '36.6',
    unit: '°C',
    delta: 'Normal',
    deltaTone: 'neutral'
  }, {
    icon: 'scale',
    label: 'Weight',
    value: '78.2',
    unit: 'kg',
    delta: '↑ 1.4 kg / mo',
    deltaTone: 'bad'
  }, {
    icon: 'air',
    label: 'SpO₂',
    value: '97',
    unit: '%',
    delta: 'Normal',
    deltaTone: 'neutral'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 4 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Longitudinal health \xB7 14 d",
    title: "Trends",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        background: 'var(--slate-100)',
        borderRadius: 8,
        padding: 3
      }
    }, ['14 d', '30 d', '90 d', '6 mo'].map((t, i) => /*#__PURE__*/React.createElement("button", {
      key: t,
      style: {
        border: 0,
        padding: '4px 10px',
        borderRadius: 6,
        font: '500 12px var(--font-sans)',
        cursor: 'pointer',
        background: i === 0 ? 'var(--surface-1)' : 'transparent',
        color: i === 0 ? 'var(--fg-1)' : 'var(--fg-3)',
        boxShadow: i === 0 ? 'var(--shadow-1)' : 'none'
      }
    }, t)))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 16
    }
  }, [{
    label: 'Sleep',
    data: sleepTrend,
    suffix: 'h',
    cur: '4.3 h',
    color: 'var(--warning)'
  }, {
    label: 'Steps',
    data: stepsTrend,
    suffix: '',
    cur: '5,200',
    color: 'var(--danger)'
  }, {
    label: 'Mood (self-report)',
    data: moodTrend,
    suffix: '/5',
    cur: '1 / 5',
    color: 'var(--danger)'
  }].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 14,
      border: '1px solid var(--border-1)',
      borderRadius: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, t.label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 22px var(--font-mono)',
      color: 'var(--fg-1)',
      margin: '4px 0 6px'
    }
  }, t.cur), /*#__PURE__*/React.createElement(Sparkline, {
    data: t.data,
    width: 200,
    height: 40,
    color: t.color
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 4
    }
  }, "Down-trending"))))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, "Consultations"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "add"
  }, "New")), [{
    d: '12 May 2026',
    who: 'Dr. Withana',
    sum: 'BP elevated, advised diet review. Cetirizine 10 mg ×7 d.',
    icon: 'monitor_heart'
  }, {
    d: '02 May 2026',
    who: 'Dr. Withana',
    sum: 'Mild allergic rhinitis, prescribed antihistamine.',
    icon: 'pill'
  }, {
    d: '18 Apr 2026',
    who: 'Dr. Fernando',
    sum: 'Routine check, all parameters within range.',
    icon: 'check_circle'
  }].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '14px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, c.who), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, c.d)), /*#__PURE__*/React.createElement("p", {
    className: "type-body-s",
    style: {
      marginTop: 4
    }
  }, c.sum)), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    style: {
      background: 'linear-gradient(180deg, var(--surface-1) 0%, var(--surface-1) 100%)'
    }
  }, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Doctor-only",
    title: "JRISSI \xB7 mental health"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(JrissiGauge, {
    score: p.jrissi,
    size: 140
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 8
    }
  }, "Sustained High for ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "14 days"), ". Driving factors:"), /*#__PURE__*/React.createElement("ul", {
    style: {
      margin: 0,
      padding: '0 0 0 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      font: '400 13px var(--font-sans)',
      color: 'var(--fg-2)'
    }
  }, /*#__PURE__*/React.createElement("li", null, "Sleep \u2193 42% vs 30-day baseline"), /*#__PURE__*/React.createElement("li", null, "Social-contact signal \u2193 22%"), /*#__PURE__*/React.createElement("li", null, "Job-intensity index ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "High")), /*#__PURE__*/React.createElement("li", null, "2 missed daily check-ins")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "psychology"
  }, "Open JRISSI detail"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "forum"
  }, "Schedule check-in"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "AI \xB7 Claude",
    title: "Pre-visit briefing",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "info",
      dot: true
    }, "Ready")
  }), /*#__PURE__*/React.createElement("p", {
    className: "type-body-s",
    style: {
      lineHeight: 1.5
    }
  }, "Patient presents with elevated stage-1 hypertension and a sustained High JRISSI over 14 days, principally driven by sleep deficit and reduced social signals. Pollen forecast Thursday may compound their seasonal asthma \u2014 antihistamine prophylaxis is current."), /*#__PURE__*/React.createElement("p", {
    className: "type-body-s",
    style: {
      lineHeight: 1.5,
      marginTop: 8,
      color: 'var(--fg-3)'
    }
  }, "Recommended: discuss workload, consider 2-week CBT referral, monitor BP weekly."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "content_copy"
  }, "Copy"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "thumb_up"
  }, "Useful"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Behaviour-correction",
    title: "Active interventions"
  }), [{
    name: 'Sleep window 22:30–06:30',
    state: 'Day 3 of 14',
    tone: 'info'
  }, {
    name: 'Walking 30 min · 5 d/wk',
    state: 'Adherence 60%',
    tone: 'warning'
  }, {
    name: 'Caffeine cut-off · 14:00',
    state: 'Paused (escalation)',
    tone: 'neutral'
  }].map((iv, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, iv.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, iv.state)), /*#__PURE__*/React.createElement(Chip, {
    tone: iv.tone,
    dot: true
  }, iv.tone === 'info' ? 'Active' : iv.tone === 'warning' ? 'Watch' : 'Paused')))))));
}
Object.assign(window, {
  PatientRecord
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/PatientRecord.jsx", error: String((e && e.message) || e) }); }

// src/screens/PharmacyDashboard.jsx
try { (() => {
/* eslint-disable */
// Pharmacy dashboard — stock health, expiry watch, dispense activity, top SKUs

function PharmacyDashboard({
  onOpenInventory
}) {
  const expiringSoon = [{
    name: 'Amlodipine 5 mg',
    brand: 'Norvasc',
    qty: 84,
    daysLeft: 9,
    batch: 'A-2026-05-B',
    tone: 'high'
  }, {
    name: 'Cetirizine 10 mg',
    brand: 'Zyrtec',
    qty: 312,
    daysLeft: 19,
    batch: 'C-2026-06-B',
    tone: 'moderate'
  }, {
    name: 'Ibuprofen 400 mg',
    brand: 'Brufen',
    qty: 188,
    daysLeft: 66,
    batch: 'I-2026-07-A',
    tone: 'moderate'
  }, {
    name: 'Paracetamol 500 mg',
    brand: 'Panadol',
    qty: 1240,
    daysLeft: 89,
    batch: 'P-2026-08-A',
    tone: 'low'
  }];
  const grnActivity = [{
    t: '08:42',
    who: 'L. Koralage',
    action: 'Received GRN-2026-0148',
    sub: 'Salbutamol inhaler · 50 units · Hemas Pharma',
    icon: 'inventory_2'
  }, {
    t: '08:15',
    who: 'L. Koralage',
    action: 'Dispensed Rx-9421',
    sub: 'Cetirizine 10 mg · 7 tabs · Dr. Withana',
    icon: 'pill'
  }, {
    t: 'Wed',
    who: 'L. Koralage',
    action: 'Quarantined batch L-2025-12-A',
    sub: 'Loratadine · expiry recall',
    icon: 'block'
  }, {
    t: 'Wed',
    who: 'System',
    action: 'Auto-marked 3 SKUs critical',
    sub: 'Expiry < 30 d threshold',
    icon: 'schedule'
  }];
  const topDispensed = [{
    name: 'Paracetamol 500 mg',
    count: 142,
    bar: 100
  }, {
    name: 'Cetirizine 10 mg',
    count: 96,
    bar: 68
  }, {
    name: 'Ibuprofen 400 mg',
    count: 71,
    bar: 50
  }, {
    name: 'ORS sachets',
    count: 58,
    bar: 41
  }, {
    name: 'Amlodipine 5 mg',
    count: 44,
    bar: 31
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Thursday \xB7 14 May 2026"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Pharmacy dashboard"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "2 batches expiring within 30 days. 3 SKUs out of stock. FEFO automation healthy.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "qr_code_scanner"
  }, "Scan GRN"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "add"
  }, "Dispense"))), /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    title: "Amlodipine 5 mg expires in 9 days."
  }, "Batch A-2026-05-B (84 tabs). Recommend dispensing priority or quarantine.", /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onOpenInventory && onOpenInventory();
    },
    style: {
      color: 'var(--warning-fg)',
      textDecoration: 'underline',
      marginLeft: 6
    }
  }, "Open inventory"), "."), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)'
    }
  }, [{
    icon: 'inventory',
    label: 'SKUs in stock',
    value: '247'
  }, {
    icon: 'schedule',
    label: 'Expiring < 30 d',
    value: '8',
    delta: '2 critical',
    deltaTone: 'bad'
  }, {
    icon: 'block',
    label: 'Out of stock',
    value: '3',
    deltaTone: 'bad'
  }, {
    icon: 'pill',
    label: 'Dispensed today',
    value: '47',
    delta: '↑ 12 vs avg',
    deltaTone: 'neutral'
  }, {
    icon: 'savings',
    label: 'Stock value',
    value: 'LKR 1.2 M'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 4 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "FEFO \xB7 first-expiry-first-out"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Expiry watch")), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "open_in_new",
    onClick: onOpenInventory
  }, "Open inventory")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 0.7fr 0.9fr 1fr 100px',
      gap: 12,
      padding: '10px 20px',
      background: 'var(--bg-canvas)',
      borderBottom: '1px solid var(--border-1)',
      font: '600 11px var(--font-sans)',
      color: 'var(--fg-3)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Drug"), /*#__PURE__*/React.createElement("div", null, "Qty"), /*#__PURE__*/React.createElement("div", null, "Days left"), /*#__PURE__*/React.createElement("div", null, "Batch"), /*#__PURE__*/React.createElement("div", null, "Status")), expiringSoon.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 0.7fr 0.9fr 1fr 100px',
      gap: 12,
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
      cursor: 'pointer',
      transition: 'background var(--dur-micro) var(--ease-std)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-hover)',
    onMouseLeave: e => e.currentTarget.style.background = ''
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    className: "type-caption"
  }, s.brand)), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.qty), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: s.tone === 'high' ? 'var(--danger-fg)' : s.tone === 'moderate' ? 'var(--warning-fg)' : 'var(--fg-2)'
    }
  }, s.daysLeft, " d"), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, s.batch), /*#__PURE__*/React.createElement(Chip, {
    tone: s.tone,
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, s.tone === 'high' ? 'Critical' : s.tone === 'moderate' ? 'Watch' : 'Healthy')))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Last 7 days",
    title: "Top dispensed"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, topDispensed.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-2)'
    }
  }, d.count)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      borderRadius: 999,
      background: 'var(--slate-100)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: `${d.bar}%`,
      background: 'var(--primary)',
      borderRadius: 999
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Today",
    title: "Activity feed",
    action: /*#__PURE__*/React.createElement(Chip, {
      tone: "info",
      dot: true
    }, "Live")
  }), grnActivity.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12,
      padding: '12px 0',
      borderTop: i === 0 ? 0 : '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: 20,
    style: {
      color: 'var(--primary)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, a.action), /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, a.t)), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, a.sub, " \xB7 ", a.who))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "OpenFDA \xB7 drug-interaction engine",
    title: "Pending alerts"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    icon: "warning",
    title: "Possible interaction \xB7 Rx-9418."
  }, "Amlodipine + Simvastatin co-prescription. Reduce simvastatin to \u2264 20 mg/d."), /*#__PURE__*/React.createElement(Banner, {
    tone: "warning",
    icon: "warning",
    title: "Possible interaction \xB7 Rx-9417."
  }, "Ibuprofen + warfarin. Increased bleeding risk. Confirm with prescribing doctor."), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    icon: "info",
    title: "Daily OpenFDA sync complete."
  }, "Updated 09:00. 2 new monographs ingested.")))));
}
Object.assign(window, {
  PharmacyDashboard
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/PharmacyDashboard.jsx", error: String((e && e.message) || e) }); }

// src/screens/PharmacyInventory.jsx
try { (() => {
/* eslint-disable */
// Pharmacy inventory — FEFO stock list, expiry alerts

const STOCK = [{
  name: 'Paracetamol 500 mg',
  brand: 'Panadol',
  sku: 'DRG-0421',
  qty: 1240,
  unit: 'tab',
  expiry: '12 Aug 2026',
  batch: 'P-2026-08-A',
  tone: 'low'
}, {
  name: 'Cetirizine 10 mg',
  brand: 'Zyrtec',
  sku: 'DRG-0118',
  qty: 312,
  unit: 'tab',
  expiry: '03 Jun 2026',
  batch: 'C-2026-06-B',
  tone: 'moderate'
}, {
  name: 'Amlodipine 5 mg',
  brand: 'Norvasc',
  sku: 'DRG-0306',
  qty: 84,
  unit: 'tab',
  expiry: '24 May 2026',
  batch: 'A-2026-05-B',
  tone: 'high'
}, {
  name: 'Salbutamol inhaler',
  brand: 'Ventolin',
  sku: 'DRG-0552',
  qty: 42,
  unit: 'pcs',
  expiry: '14 Nov 2026',
  batch: 'S-2026-11-A',
  tone: 'low'
}, {
  name: 'Metformin 500 mg',
  brand: 'Glucophage',
  sku: 'DRG-0233',
  qty: 0,
  unit: 'tab',
  expiry: '—',
  batch: '—',
  tone: 'high',
  oos: true
}, {
  name: 'ORS sachets',
  brand: 'Jeevani',
  sku: 'DRG-0014',
  qty: 540,
  unit: 'sct',
  expiry: '02 Mar 2027',
  batch: 'O-2027-03-A',
  tone: 'low'
}, {
  name: 'Ibuprofen 400 mg',
  brand: 'Brufen',
  sku: 'DRG-0089',
  qty: 188,
  unit: 'tab',
  expiry: '20 Jul 2026',
  batch: 'I-2026-07-A',
  tone: 'moderate'
}, {
  name: 'Loratadine 10 mg',
  brand: 'Claritin',
  sku: 'DRG-0122',
  qty: 96,
  unit: 'tab',
  expiry: '08 Sep 2026',
  batch: 'L-2026-09-A',
  tone: 'low'
}];
function PharmacyInventory() {
  const [filter, setFilter] = React.useState('all');
  const filtered = STOCK.filter(s => filter === 'all' ? true : s.tone === filter);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "FEFO \xB7 first-expiry-first-out"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Pharmacy inventory")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "qr_code_scanner"
  }, "Scan GRN"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "add"
  }, "Add stock"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)'
    }
  }, [{
    icon: 'inventory',
    label: 'SKUs in stock',
    value: '247'
  }, {
    icon: 'schedule',
    label: 'Expiring < 30 d',
    value: '8',
    delta: '2 critical',
    deltaTone: 'bad'
  }, {
    icon: 'block',
    label: 'Out of stock',
    value: '3',
    deltaTone: 'bad'
  }, {
    icon: 'savings',
    label: 'Stock value',
    value: 'LKR 1.2 M',
    unit: ''
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderRight: i < 3 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement(StatTile, s))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-eyebrow",
    style: {
      marginRight: 4
    }
  }, "Filter"), [{
    id: 'all',
    label: 'All',
    tone: 'neutral'
  }, {
    id: 'high',
    label: 'Expiring soon',
    tone: 'high'
  }, {
    id: 'moderate',
    label: 'Watch',
    tone: 'moderate'
  }, {
    id: 'low',
    label: 'Healthy',
    tone: 'low'
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => setFilter(f.id),
    style: {
      border: 0,
      background: 'transparent',
      padding: 0,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: f.tone,
    dot: f.id !== 'all',
    style: {
      outline: filter === f.id ? '2px solid var(--primary)' : 'none',
      outlineOffset: 2
    }
  }, f.label)))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 100px 32px',
      gap: 12,
      padding: '12px 20px',
      borderBottom: '1px solid var(--border-1)',
      font: '600 11px var(--font-sans)',
      color: 'var(--fg-3)',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", null, "Drug"), /*#__PURE__*/React.createElement("div", null, "Brand \xB7 SKU"), /*#__PURE__*/React.createElement("div", null, "Qty"), /*#__PURE__*/React.createElement("div", null, "Expiry"), /*#__PURE__*/React.createElement("div", null, "Batch"), /*#__PURE__*/React.createElement("div", null, "Status"), /*#__PURE__*/React.createElement("div", null)), filtered.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.sku,
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 100px 32px',
      gap: 12,
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
      cursor: 'pointer',
      transition: 'background var(--dur-micro) var(--ease-std)'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'var(--bg-hover)',
    onMouseLeave: e => e.currentTarget.style.background = ''
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.brand), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, s.sku)), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: s.oos ? 'var(--danger-fg)' : 'var(--fg-1)'
    }
  }, s.qty.toLocaleString(), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--fg-3)'
    }
  }, s.unit)), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-2)'
    }
  }, s.expiry), /*#__PURE__*/React.createElement("div", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, s.batch), /*#__PURE__*/React.createElement(Chip, {
    tone: s.tone,
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, s.oos ? 'Out' : s.tone === 'high' ? 'Critical' : s.tone === 'moderate' ? 'Watch' : 'Healthy'), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron_right",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  })))));
}
Object.assign(window, {
  PharmacyInventory
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/PharmacyInventory.jsx", error: String((e && e.message) || e) }); }

// src/screens/PharmacyScreens.jsx
try { (() => {
/* eslint-disable */
// Pharmacy screens: GRN (Goods Received Note) receiving flow with FEFO sequencing.

function GrnReceive() {
  const [step, setStep] = React.useState(2); // currently at "Lot details"
  const lots = [{
    id: 'LOT-A8821',
    drug: 'Cetirizine 10 mg',
    mfg: 'Hemas',
    qty: 200,
    expiry: '2027-09',
    dispOrder: 1,
    dispLabel: 'Dispense first',
    tone: 'warning'
  }, {
    id: 'LOT-A8822',
    drug: 'Cetirizine 10 mg',
    mfg: 'Hemas',
    qty: 300,
    expiry: '2028-03',
    dispOrder: 2,
    dispLabel: 'After A8821',
    tone: 'neutral'
  }, {
    id: 'LOT-B5503',
    drug: 'Paracetamol 500 mg',
    mfg: 'Astron',
    qty: 500,
    expiry: '2027-06',
    dispOrder: 1,
    dispLabel: 'Dispense first',
    tone: 'warning'
  }, {
    id: 'LOT-B5504',
    drug: 'Paracetamol 500 mg',
    mfg: 'Astron',
    qty: 500,
    expiry: '2028-01',
    dispOrder: 2,
    dispLabel: 'After B5503',
    tone: 'neutral'
  }, {
    id: 'LOT-C2207',
    drug: 'Amoxicillin 250 mg',
    mfg: 'GSK',
    qty: 120,
    expiry: '2027-11',
    dispOrder: 1,
    dispLabel: 'Dispense first',
    tone: 'neutral'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Pharmacy \xB7 GRN-2026-0142"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Receive stock"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Supplier: Hemas Pharmaceuticals \xB7 PO #2026-0331 \xB7 5 SKUs \xB7 1,620 units")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "print"
  }, "Print GRN"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "save"
  }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "check"
  }, "Post to inventory"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Stepper, {
    current: step,
    steps: ['Match PO', 'Scan / count', 'Lot details', 'FEFO check', 'Post']
  })), /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    title: "FEFO sequencing applied automatically."
  }, "Lots are ordered by earliest expiry within each SKU. Dispensing follows this order until override."), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "3 / 5"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Lot details")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "qr_code_scanner"
  }, "Scan lot barcode"), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "add"
  }, "Add manually"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Lot #', 'Drug', 'Manufacturer', 'Qty', 'Expiry', 'FEFO order', ''].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: '500 11px var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--fg-3)',
      textAlign: i === 3 ? 'right' : 'left',
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, lots.map((l, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, l.id)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, l.drug)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, l.mfg), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, l.qty)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, l.expiry), l.tone === 'warning' && /*#__PURE__*/React.createElement(Chip, {
    tone: "warning",
    style: {
      padding: '2px 8px'
    }
  }, "Earliest"))), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: 999,
      background: l.tone === 'warning' ? 'var(--warning)' : 'var(--bg-canvas)',
      color: l.tone === 'warning' ? '#fff' : 'var(--fg-2)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: '600 11px var(--font-mono)',
      border: '1px solid var(--border-2)'
    }
  }, l.dispOrder), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, l.dispLabel))), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more_horiz",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "5 lots \xB7 1,620 units \xB7 0 discrepancies"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "arrow_back",
    onClick: () => setStep(Math.max(0, step - 1))
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "arrow_forward",
    onClick: () => setStep(Math.min(4, step + 1))
  }, "Continue to FEFO check")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Counts",
    title: "Receiving summary"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Row, {
    label: "Total SKUs",
    value: "5"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Total units",
    value: "1,620"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "PO match",
    value: "100%",
    tone: "success"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Earliest expiry",
    value: "2027-06",
    tone: "warning"
  }), /*#__PURE__*/React.createElement(Row, {
    label: "Total value",
    value: "LKR 84,420"
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Quality",
    title: "Discrepancies"
  }), /*#__PURE__*/React.createElement(EmptyState, {
    icon: "check_circle",
    title: "No discrepancies.",
    description: "Counts match PO. All lots within expected expiry window."
  }))));
}
const tdS = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--border-1)',
  font: '400 13px var(--font-sans)',
  color: 'var(--fg-1)'
};
function Row({
  label,
  value,
  tone
}) {
  const c = tone === 'success' ? 'var(--success-fg)' : tone === 'warning' ? 'var(--warning-fg)' : 'var(--fg-1)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '6px 0',
      borderBottom: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-body-s"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: c
    }
  }, value));
}

// ============================================================================
// FEFO Expiry watch screen
// ============================================================================
function ExpiryWatch() {
  const items = [{
    drug: 'Amoxicillin 250 mg',
    lot: 'LOT-C2207',
    qty: 6,
    days: 12,
    exp: '2026-05-26',
    tone: 'danger'
  }, {
    drug: 'Ibuprofen 400 mg',
    lot: 'LOT-D1108',
    qty: 22,
    days: 28,
    exp: '2026-06-11',
    tone: 'danger'
  }, {
    drug: 'Salbutamol inhaler',
    lot: 'LOT-E0203',
    qty: 4,
    days: 45,
    exp: '2026-06-28',
    tone: 'warning'
  }, {
    drug: 'Loratadine 10 mg',
    lot: 'LOT-F2244',
    qty: 50,
    days: 62,
    exp: '2026-07-15',
    tone: 'warning'
  }, {
    drug: 'Cetirizine 10 mg',
    lot: 'LOT-A8821',
    qty: 124,
    days: 188,
    exp: '2027-09-30',
    tone: 'success'
  }, {
    drug: 'Paracetamol 500 mg',
    lot: 'LOT-B5503',
    qty: 312,
    days: 144,
    exp: '2027-06-22',
    tone: 'success'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Pharmacy \xB7 FEFO"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Expiry watch"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Sorted by days to expiry. FEFO sequencing dispenses earliest-expiry lots first.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "download"
  }, "Export"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "local_shipping"
  }, "Return to supplier"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, [{
    l: 'Expires &lt; 30 d',
    v: '2',
    t: 'danger'
  }, {
    l: 'Expires 30–90 d',
    v: '6',
    t: 'warning'
  }, {
    l: 'Expires 90–180 d',
    v: '14',
    t: 'info'
  }, {
    l: 'Total active lots',
    v: '128',
    t: 'success'
  }].map((s, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    dense: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    },
    dangerouslySetInnerHTML: {
      __html: s.l
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-clinical",
    style: {
      fontSize: 26,
      color: `var(--${s.t}-fg)`
    }
  }, s.v)))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-h3"
  }, "Lots near expiry"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    tone: "danger",
    dot: true
  }, "< 30 d"), /*#__PURE__*/React.createElement(Chip, {
    tone: "warning",
    dot: true
  }, "30\u201390 d"), /*#__PURE__*/React.createElement(Chip, {
    tone: "success",
    dot: true
  }, "> 90 d"))), /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ['Drug', 'Lot #', 'Qty', 'Days to expiry', 'Expiry date', 'Action'].map((h, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      font: '500 11px var(--font-sans)',
      textTransform: 'uppercase',
      letterSpacing: '0.04em',
      color: 'var(--fg-3)',
      textAlign: i === 2 || i === 3 ? 'right' : 'left',
      padding: '12px 16px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, items.map((it, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, it.drug)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, it.lot)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono"
  }, it.qty)), /*#__PURE__*/React.createElement("td", {
    style: {
      ...tdS,
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 14px var(--font-mono)',
      color: it.tone === 'danger' ? 'var(--danger-fg)' : it.tone === 'warning' ? 'var(--warning-fg)' : 'var(--fg-1)'
    }
  }, it.days, " d")), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      color: 'var(--fg-3)'
    }
  }, it.exp)), /*#__PURE__*/React.createElement("td", {
    style: tdS
  }, it.tone === 'danger' ? /*#__PURE__*/React.createElement(Button, {
    kind: "danger",
    size: "sm",
    icon: "local_shipping"
  }, "Return") : it.tone === 'warning' ? /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "campaign"
  }, "Promote") : /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "On schedule"))))))));
}
Object.assign(window, {
  GrnReceive,
  ExpiryWatch
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/PharmacyScreens.jsx", error: String((e && e.message) || e) }); }

// src/screens/SharedScreens.jsx
try { (() => {
/* eslint-disable */
// Shared screens: Notifications center (escalation timeline), Settings & profile.

// ============================================================================
// 1. NOTIFICATIONS CENTER (Closed-loop, with escalation timeline)
// ============================================================================
function NotificationsCenter() {
  const [filter, setFilter] = React.useState('all');
  const groups = [{
    label: 'Today · 14 May',
    items: [{
      id: 'n1',
      icon: 'priority_high',
      tone: 'danger',
      t: '09:30',
      title: 'JRISSI escalation pending',
      body: 'A. Perera (E-002417) — sustained High for 14 days. Awaiting your acknowledgement.',
      cta: 'Open record',
      stage: 'Escalated to doctor',
      stages: ['Detected', 'Closed-loop ping', 'Escalated to doctor', 'Acknowledge', 'Resolve'],
      stageAt: 2
    }, {
      id: 'n2',
      icon: 'cloud',
      tone: 'warning',
      t: '08:55',
      title: 'Forecast: pollen rising Thursday',
      body: '3 employees with seasonal allergy history flagged. Suggest pre-emptive cetirizine availability check.',
      cta: 'Review',
      stage: 'Action suggested',
      stages: ['Detected', 'Routed', 'Action suggested', 'Approved', 'Closed'],
      stageAt: 2
    }, {
      id: 'n3',
      icon: 'inventory_2',
      tone: 'warning',
      t: '08:30',
      title: 'Stock low: amoxicillin 250 mg',
      body: '6 packs remaining · earliest expiry 26 May. Reorder threshold breached.',
      cta: 'Reorder',
      stage: 'Auto-PO drafted',
      stages: ['Detected', 'Auto-PO drafted', 'Pharmacy review', 'Sent', 'Received'],
      stageAt: 1
    }]
  }, {
    label: 'Yesterday · 13 May',
    items: [{
      id: 'n4',
      icon: 'check_circle',
      tone: 'success',
      t: '17:22',
      title: 'Pre-visit briefing prepared',
      body: 'For Mon 09:00 with S. Fernando · ready in inbox.',
      cta: 'View',
      stage: 'Delivered',
      stages: ['Detected', 'Drafted', 'Doctor review', 'Delivered'],
      stageAt: 3
    }, {
      id: 'n5',
      icon: 'error',
      tone: 'danger',
      t: '23:58',
      title: 'Climate service unreachable',
      body: 'Forecast refresh failed. Auto-retrying every 30 min. Last successful sync 14:00.',
      cta: 'Inspect',
      stage: 'Retrying',
      stages: ['Detected', 'Retry queued', 'Auto-resolved'],
      stageAt: 1
    }]
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Closed-loop \xB7 last 24 h"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Notifications"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "AI-generated interventions and system alerts, with automated escalation if not acknowledged.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    icon: "mark_email_read"
  }, "Mark all read"), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    icon: "settings"
  }, "Preferences"))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 12px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      gap: 4
    }
  }, [{
    v: 'all',
    l: 'All',
    n: 5
  }, {
    v: 'danger',
    l: 'Critical',
    n: 2
  }, {
    v: 'warning',
    l: 'Watch',
    n: 2
  }, {
    v: 'info',
    l: 'Info',
    n: 1
  }, {
    v: 'resolved',
    l: 'Resolved',
    n: 12
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.v,
    onClick: () => setFilter(t.v),
    style: {
      padding: '8px 14px',
      borderRadius: 8,
      border: 0,
      cursor: 'pointer',
      background: filter === t.v ? 'var(--bg-selected)' : 'transparent',
      color: filter === t.v ? 'var(--primary-hover)' : 'var(--fg-2)',
      font: filter === t.v ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, t.l, /*#__PURE__*/React.createElement("span", {
    style: {
      font: '500 11px var(--font-mono)',
      padding: '1px 6px',
      borderRadius: 999,
      background: 'var(--bg-canvas)',
      color: 'var(--fg-3)',
      border: '1px solid var(--border-1)'
    }
  }, t.n)))), groups.map((g, gi) => /*#__PURE__*/React.createElement("div", {
    key: gi
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px 6px',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, g.label)), g.items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    style: {
      display: 'grid',
      gridTemplateColumns: '44px 1fr 360px 100px',
      gap: 16,
      alignItems: 'flex-start',
      padding: '16px 20px',
      borderTop: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: `var(--${it.tone}-bg)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: it.icon,
    size: 20,
    style: {
      color: `var(--${it.tone})`
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, it.title), /*#__PURE__*/React.createElement(Chip, {
    tone: it.tone,
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, it.stage)), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginTop: 4
    }
  }, it.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 0
    }
  }, it.stages.map((s, si) => {
    const done = si < it.stageAt;
    const active = si === it.stageAt;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: si
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        flex: '0 0 auto'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 14,
        height: 14,
        borderRadius: 999,
        background: done ? `var(--${it.tone})` : active ? `var(--${it.tone}-bg)` : 'var(--bg-canvas)',
        border: active ? `2px solid var(--${it.tone})` : done ? 'none' : '1.5px solid var(--border-2)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        font: '500 9px var(--font-sans)',
        color: done || active ? 'var(--fg-2)' : 'var(--fg-4)',
        textAlign: 'center',
        maxWidth: 60,
        lineHeight: 1.2,
        whiteSpace: 'nowrap'
      }
    }, s)), si < it.stages.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        height: 1,
        background: done ? `var(--${it.tone})` : 'var(--border-1)',
        marginTop: -12
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 11,
      color: 'var(--fg-3)'
    }
  }, it.t), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm"
  }, it.cta))))))));
}

// ============================================================================
// 2. SETTINGS & PROFILE
// ============================================================================
function SettingsProfile({
  initialTab
}) {
  const [tab, setTab] = React.useState(initialTab || 'profile');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("header", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 6
    }
  }, "Account"), /*#__PURE__*/React.createElement("h1", {
    className: "type-h1"
  }, "Settings"), /*#__PURE__*/React.createElement("p", {
    className: "type-body",
    style: {
      marginTop: 6
    }
  }, "Manage your profile, security, notifications, and integrations.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    padding: 8
  }, [{
    v: 'profile',
    l: 'Profile',
    i: 'person'
  }, {
    v: 'security',
    l: 'Security',
    i: 'security'
  }, {
    v: 'notifications',
    l: 'Notifications',
    i: 'notifications'
  }, {
    v: 'privacy',
    l: 'Privacy &amp; PHI',
    i: 'shield_person'
  }, {
    v: 'integrations',
    l: 'Integrations',
    i: 'extension'
  }, {
    v: 'preferences',
    l: 'Preferences',
    i: 'tune'
  }].map(it => {
    const active = it.v === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: it.v,
      onClick: () => setTab(it.v),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        border: 0,
        background: active ? 'var(--bg-selected)' : 'transparent',
        borderRadius: 8,
        cursor: 'pointer',
        color: active ? 'var(--primary-hover)' : 'var(--fg-2)',
        font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
        marginBottom: 2,
        textAlign: 'left'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.i,
      size: 20,
      style: {
        color: active ? 'var(--primary)' : 'var(--fg-3)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      dangerouslySetInnerHTML: {
        __html: it.l
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, tab === 'profile' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Profile",
    title: "Personal details"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      marginBottom: 20,
      paddingBottom: 20,
      borderBottom: '1px dashed var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Priyanga Withana",
    size: 72,
    color: "var(--role-doctor)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "photo_camera"
  }, "Change photo"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 6
    }
  }, "JPG or PNG \xB7 max 2 MB \xB7 256\xD7256 recommended"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "First name",
    value: "Priyanga",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Last name",
    value: "Withana",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Title",
    value: "Dr.",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Display name",
    value: "Dr. Withana",
    onChange: () => {},
    hint: "Shown across the app"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Email",
    value: "p.withana@corp.lk",
    disabled: true,
    hint: "Managed by your organisation"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Phone",
    value: "+94 77 123 4567",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Department",
    value: "medical",
    options: [{
      value: 'medical',
      label: 'Medical'
    }, {
      value: 'pharm',
      label: 'Pharmacy'
    }, {
      value: 'hr',
      label: 'HR'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Time zone",
    value: "asia-colombo",
    options: [{
      value: 'asia-colombo',
      label: 'Asia/Colombo · UTC+05:30'
    }, {
      value: 'asia-singapore',
      label: 'Asia/Singapore · UTC+08:00'
    }],
    onChange: () => {}
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 20,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    kind: "ghost"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    icon: "check"
  }, "Save changes"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Role",
    title: "Permissions"
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-body-s",
    style: {
      marginBottom: 14
    }
  }, "Your current role is ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)'
    }
  }, "Doctor"), ". Permission changes require an admin."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    p: 'View patient records',
    g: true
  }, {
    p: 'JRISSI deep-dive (mental health score)',
    g: true
  }, {
    p: 'Sign prescriptions',
    g: true
  }, {
    p: 'Escalate to OH psychologist',
    g: true
  }, {
    p: 'Manage pharmacy inventory',
    g: false
  }, {
    p: 'Manage users &amp; roles',
    g: false
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 12px',
      borderRadius: 6,
      background: r.g ? 'var(--bg-canvas)' : 'transparent',
      opacity: r.g ? 1 : 0.6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.g ? 'check_circle' : 'remove_circle',
    size: 20,
    style: {
      color: r.g ? 'var(--success)' : 'var(--fg-4)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-body-s",
    style: {
      color: 'var(--fg-1)'
    },
    dangerouslySetInnerHTML: {
      __html: r.p
    }
  })))))), tab === 'security' && /*#__PURE__*/React.createElement(SettingsSecurity, null), tab === 'notifications' && /*#__PURE__*/React.createElement(SettingsNotifications, null), tab === 'privacy' && /*#__PURE__*/React.createElement(SettingsPrivacy, null), tab === 'integrations' && /*#__PURE__*/React.createElement(SettingsIntegrations, null), tab === 'preferences' && /*#__PURE__*/React.createElement(SettingsPreferences, null))));
}

// ----------------------------------------------------------------- Security
function SettingsSecurity() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Security",
    title: "Password"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      borderRadius: 8,
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, "Password"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, "Last changed 47 days ago \xB7 meets policy")), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "key"
  }, "Change"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Multi-factor",
    title: "Two-factor authentication"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [{
    i: 'phone_iphone',
    t: 'Authenticator app',
    s: 'Google Authenticator · added 14 Apr 2026',
    on: true,
    primary: true
  }, {
    i: 'sms',
    t: 'SMS to +94 77 *** 4567',
    s: 'Backup · used 2 times',
    on: true
  }, {
    i: 'mail',
    t: 'Email to p.withana@corp.lk',
    s: 'Last resort fallback',
    on: false
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: 12,
      borderRadius: 8,
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 8,
      background: r.on ? 'var(--success-bg)' : 'var(--bg-canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.i,
    size: 20,
    style: {
      color: r.on ? 'var(--success)' : 'var(--fg-3)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.t), r.primary && /*#__PURE__*/React.createElement(Chip, {
    tone: "info",
    style: {
      padding: '2px 8px'
    }
  }, "Primary")), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.s)), /*#__PURE__*/React.createElement(Toggle, {
    checked: r.on,
    onChange: () => {}
  }))))), /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Active sessions"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Where you\\u2019re signed in")), /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm",
    icon: "logout"
  }, "Sign out all others")), [{
    dev: 'MacBook Pro · Chrome 128',
    loc: 'Colombo, LK · 10.42.1.18',
    when: 'Now',
    current: true
  }, {
    dev: 'iPhone 15 · MRAS app 3.0.2',
    loc: 'Colombo, LK · 4G',
    when: '2 h ago'
  }, {
    dev: 'Workstation · Edge 130',
    loc: 'Medical Room · 10.42.0.4',
    when: 'Yesterday'
  }].map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '32px 1fr 1fr 100px 100px',
      gap: 14,
      alignItems: 'center',
      padding: '12px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.dev.includes('iPhone') ? 'phone_iphone' : s.dev.includes('Workstation') ? 'monitor' : 'laptop_mac',
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, s.dev), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, s.loc), /*#__PURE__*/React.createElement("span", {
    className: "type-mono",
    style: {
      fontSize: 12,
      color: 'var(--fg-3)'
    }
  }, s.when), s.current ? /*#__PURE__*/React.createElement(Chip, {
    tone: "success",
    dot: true
  }, "This device") : /*#__PURE__*/React.createElement(Button, {
    kind: "ghost",
    size: "sm"
  }, "Revoke")))));
}

// ----------------------------------------------------------------- Notifications
function SettingsNotifications() {
  const channels = ['In-app', 'Email', 'SMS', 'Push'];
  const rows = [{
    t: 'JRISSI escalation',
    s: 'Always on for doctors',
    on: [true, true, true, true],
    locked: true
  }, {
    t: 'Pre-visit briefing ready',
    s: '15 min before consultation',
    on: [true, true, false, true]
  }, {
    t: 'Forecast watch (pollen, heat, flu)',
    s: 'When risk crosses moderate',
    on: [true, true, false, false]
  }, {
    t: 'Stock low / FEFO',
    s: 'Pharmacy only',
    on: [false, false, false, false]
  }, {
    t: 'Audit anomalies',
    s: 'Admin only',
    on: [true, true, true, false]
  }, {
    t: 'Weekly digest',
    s: 'Mondays 08:00',
    on: [false, true, false, false]
  }];
  return /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Notification preferences"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Channels per event")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr repeat(4, 70px)',
      padding: '10px 20px',
      borderBottom: '1px solid var(--border-1)',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-eyebrow"
  }, "Event"), channels.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    className: "type-eyebrow",
    style: {
      textAlign: 'center'
    }
  }, c))), rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr repeat(4, 70px)',
      alignItems: 'center',
      padding: '14px 20px',
      borderTop: i === 0 ? 0 : '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, r.t), r.locked && /*#__PURE__*/React.createElement(Chip, {
    tone: "neutral",
    style: {
      padding: '2px 8px',
      fontSize: 11
    }
  }, "Locked")), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.s)), r.on.map((v, j) => /*#__PURE__*/React.createElement("div", {
    key: j,
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: v,
    disabled: r.locked,
    onChange: () => {}
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderTop: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-caption"
  }, "Locked rows are required by clinical-safety policy."), /*#__PURE__*/React.createElement(Button, {
    kind: "primary",
    size: "sm",
    icon: "check"
  }, "Save")));
}

// ----------------------------------------------------------------- Privacy & PHI
function SettingsPrivacy() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Banner, {
    tone: "info",
    title: "Your data is encrypted at rest and in transit."
  }, "MRAS follows HIPAA-equivalent controls. PHI access is logged in the audit trail and reviewed quarterly by your compliance officer."), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Sharing",
    title: "Who can see what"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, [{
    t: 'JRISSI score',
    who: 'Doctor only',
    strict: true
  }, {
    t: 'Vitals &amp; consultation history',
    who: 'Your doctor + occupational health'
  }, {
    t: 'Active prescriptions',
    who: 'Doctor + on-site pharmacy'
  }, {
    t: 'Aggregated wellness data',
    who: 'Anonymised, reported to HR quarterly'
  }, {
    t: 'Fitness device data',
    who: 'You control · share with doctor toggleable'
  }].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 12px',
      borderRadius: 8,
      background: r.strict ? 'var(--primary-tint)' : 'var(--bg-canvas)',
      border: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.strict ? 'shield' : 'visibility',
    size: 20,
    style: {
      color: r.strict ? 'var(--primary)' : 'var(--fg-3)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    },
    dangerouslySetInnerHTML: {
      __html: r.t
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, r.who)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Your data",
    title: "Export & deletion"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: 12,
      border: '1px solid var(--border-1)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, "Download all my data"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, "JSON + PDFs \xB7 everything we hold about you")), /*#__PURE__*/React.createElement(Button, {
    kind: "secondary",
    size: "sm",
    icon: "download"
  }, "Request")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      padding: 12,
      border: '1px solid var(--border-1)',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, "Delete my account"), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, "Medical records retained 7 years per regulation \xB7 personal data erased")), /*#__PURE__*/React.createElement(Button, {
    kind: "danger",
    size: "sm"
  }, "Request deletion")))));
}

// ----------------------------------------------------------------- Integrations
function SettingsIntegrations() {
  const apps = [{
    i: 'event',
    name: 'Google Calendar',
    d: 'Sync appointments to your work calendar',
    on: true
  }, {
    i: 'event_note',
    name: 'Outlook Calendar',
    d: 'Sync appointments + reminders',
    on: false
  }, {
    i: 'chat',
    name: 'Slack',
    d: 'Receive escalations and digests in #medical-room',
    on: true
  }, {
    i: 'forum',
    name: 'Microsoft Teams',
    d: 'Pre-visit briefings as chat cards',
    on: false
  }, {
    i: 'monitor_heart',
    name: 'WHOOP',
    d: 'Sleep, recovery, strain',
    on: true
  }, {
    i: 'directions_run',
    name: 'Garmin Health',
    d: 'Steps, HR, SpO₂',
    on: false
  }, {
    i: 'medical_services',
    name: 'Fitbit',
    d: 'Activity, sleep, stress',
    on: false
  }, {
    i: 'cloud',
    name: 'OpenFDA monograph sync',
    d: 'Daily drug data refresh · admin-managed',
    on: true,
    lock: true
  }];
  return /*#__PURE__*/React.createElement(Card, {
    padding: 0
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderBottom: '1px solid var(--border-1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow"
  }, "Connections"), /*#__PURE__*/React.createElement("div", {
    className: "type-h3",
    style: {
      marginTop: 2
    }
  }, "Integrations")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr'
    }
  }, apps.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: 16,
      borderBottom: '1px solid var(--border-1)',
      borderRight: i % 2 === 0 ? '1px solid var(--border-1)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 10,
      background: a.on ? 'var(--primary-tint)' : 'var(--bg-canvas)',
      border: '1px solid var(--border-1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.i,
    size: 24,
    style: {
      color: a.on ? 'var(--primary)' : 'var(--fg-3)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "type-label",
    style: {
      color: 'var(--fg-1)'
    }
  }, a.name), a.on && /*#__PURE__*/React.createElement(Chip, {
    tone: "success",
    dot: true,
    style: {
      padding: '2px 8px'
    }
  }, "Connected")), /*#__PURE__*/React.createElement("div", {
    className: "type-caption",
    style: {
      marginTop: 2
    }
  }, a.d)), a.lock ? /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    size: 20,
    style: {
      color: 'var(--fg-3)'
    }
  }) : /*#__PURE__*/React.createElement(Button, {
    kind: a.on ? 'ghost' : 'secondary',
    size: "sm"
  }, a.on ? 'Manage' : 'Connect')))));
}

// ----------------------------------------------------------------- Preferences
function SettingsPreferences() {
  const [theme, setTheme] = React.useState('system');
  const [density, setDensity] = React.useState('comfortable');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Appearance",
    title: "Theme"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10
    }
  }, [{
    v: 'light',
    l: 'Light',
    bg: '#F8FAFC',
    fg: '#0F172A',
    accent: '#0F766E'
  }, {
    v: 'dark',
    l: 'Dark',
    bg: '#0B1220',
    fg: '#E6ECF5',
    accent: '#2DD4BF'
  }, {
    v: 'system',
    l: 'System',
    bg: 'linear-gradient(135deg, #F8FAFC 50%, #0B1220 50%)',
    fg: '#0F172A',
    accent: '#0F766E'
  }].map((t, i) => {
    const sel = theme === t.v;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setTheme(t.v),
      style: {
        position: 'relative',
        padding: 0,
        cursor: 'pointer',
        border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
        borderRadius: 12,
        background: 'transparent',
        overflow: 'hidden',
        boxShadow: sel ? '0 0 0 3px var(--primary-tint)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 100,
        background: t.bg,
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 14,
        left: 14,
        right: 14,
        height: 8,
        borderRadius: 4,
        background: t.fg,
        opacity: 0.85
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        top: 28,
        left: 14,
        width: '60%',
        height: 5,
        borderRadius: 3,
        background: t.fg,
        opacity: 0.45
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 14,
        left: 14,
        width: 60,
        height: 18,
        borderRadius: 4,
        background: t.accent
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 30,
        height: 18,
        borderRadius: 4,
        background: t.fg,
        opacity: 0.2
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--surface-1)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-label",
      style: {
        color: 'var(--fg-1)'
      }
    }, t.l), sel && /*#__PURE__*/React.createElement(Icon, {
      name: "check_circle",
      size: 20,
      style: {
        color: 'var(--primary)'
      }
    })));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Layout",
    title: "Density"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 10
    }
  }, [{
    v: 'comfortable',
    l: 'Comfortable',
    s: 'Generous spacing · default'
  }, {
    v: 'medium',
    l: 'Medium',
    s: 'Clinical scanning'
  }, {
    v: 'compact',
    l: 'Compact',
    s: 'Power-user · max info'
  }].map((t, i) => {
    const sel = density === t.v;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      onClick: () => setDensity(t.v),
      style: {
        padding: 14,
        textAlign: 'left',
        cursor: 'pointer',
        border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
        borderRadius: 10,
        background: sel ? 'var(--primary-tint)' : 'var(--surface-1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "type-label",
      style: {
        color: 'var(--fg-1)'
      }
    }, t.l), sel && /*#__PURE__*/React.createElement(Icon, {
      name: "check_circle",
      size: 20,
      style: {
        color: 'var(--primary)',
        fontSize: 16
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "type-caption"
    }, t.s));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Region",
    title: "Language & format"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Select, {
    label: "Language",
    value: "en-LK",
    options: [{
      value: 'en-LK',
      label: 'English (Sri Lanka)'
    }, {
      value: 'si-LK',
      label: 'Sinhala'
    }, {
      value: 'ta-LK',
      label: 'Tamil'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Date format",
    value: "ddmmyyyy",
    options: [{
      value: 'ddmmyyyy',
      label: '14 May 2026'
    }, {
      value: 'mmddyyyy',
      label: 'May 14, 2026'
    }, {
      value: 'iso',
      label: '2026-05-14'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "Time format",
    value: "24",
    options: [{
      value: '24',
      label: '24-hour · 14:30'
    }, {
      value: '12',
      label: '12-hour · 2:30 PM'
    }],
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Select, {
    label: "First day of week",
    value: "mon",
    options: [{
      value: 'mon',
      label: 'Monday'
    }, {
      value: 'sun',
      label: 'Sunday'
    }],
    onChange: () => {}
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHeader, {
    eyebrow: "Accessibility",
    title: "Display options"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    checked: true,
    label: "Reduce motion (disables animation easing transitions)",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: false,
    label: "High-contrast borders",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: false,
    label: "Larger touch targets (44 px minimum)",
    onChange: () => {}
  }), /*#__PURE__*/React.createElement(Toggle, {
    checked: true,
    label: "Underline links",
    onChange: () => {}
  }))));
}
Object.assign(window, {
  NotificationsCenter,
  SettingsProfile,
  SettingsScreenWith: ({
    tab
  }) => /*#__PURE__*/React.createElement(SettingsProfile, {
    initialTab: tab
  }),
  SettingsSecurity,
  SettingsNotifications,
  SettingsPrivacy,
  SettingsIntegrations,
  SettingsPreferences
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/screens/SharedScreens.jsx", error: String((e && e.message) || e) }); }

// src/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  noDeckControls = false,
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  // Auto-inject a rail toggle when a <deck-stage> is on the page. The
  // toggle drives the deck's per-viewer _railVisible via window message;
  // state is mirrored from the same localStorage key the deck reads so
  // the control reflects reality across reloads. The mechanism is the
  // message — authors who want custom placement can post it directly
  // and pass noDeckControls to suppress this one.
  const hasDeckStage = React.useMemo(() => typeof document !== 'undefined' && !!document.querySelector('deck-stage'), []);
  // deck-stage enables its rail in connectedCallback, but this panel can
  // mount before that element has upgraded. The initial read catches the
  // common case; the listener covers mounting first. (Older deck-stage.js
  // copies still wait for the host's __omelette_rail_enabled postMessage —
  // same listener handles those.)
  const [railEnabled, setRailEnabled] = React.useState(() => hasDeckStage && !!document.querySelector('deck-stage')?._railEnabled);
  React.useEffect(() => {
    if (!hasDeckStage || railEnabled) return undefined;
    const onMsg = e => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);
  const [railVisible, setRailVisible] = React.useState(() => {
    try {
      return localStorage.getItem('deck-stage.railVisible') !== '0';
    } catch (e) {
      return true;
    }
  });
  const toggleRail = on => {
    setRailVisible(on);
    window.postMessage({
      type: '__deck_rail_visible',
      on
    }, '*');
  };
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-noncommentable": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children, hasDeckStage && railEnabled && !noDeckControls && /*#__PURE__*/React.createElement(TweakSection, {
    label: "Deck"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Thumbnail rail",
    value: railVisible,
    onChange: toggleRail
  })))));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// src/widgets.jsx
try { (() => {
/* eslint-disable */
// MRAS UI kit — shared primitives

const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// --------------------------------------------------------------------
// Icon
// --------------------------------------------------------------------
function Icon({
  name,
  size = 20,
  filled = false,
  color,
  style,
  className
}) {
  const cls = ['ms', size === 20 ? 'is-20' : size === 32 ? 'is-32' : size === 48 ? 'is-48' : '', filled ? 'is-filled' : '', className || ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", {
    className: cls,
    style: {
      color,
      ...style
    }
  }, name);
}

// --------------------------------------------------------------------
// Button
// --------------------------------------------------------------------
const btnStyles = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    border: 0,
    cursor: 'pointer',
    font: '500 14px var(--font-sans)',
    borderRadius: 8,
    padding: '0 16px',
    height: 36,
    transition: 'background var(--dur-micro) var(--ease-std), color var(--dur-micro) var(--ease-std)',
    whiteSpace: 'nowrap'
  },
  primary: {
    background: 'var(--primary)',
    color: '#fff'
  },
  secondary: {
    background: 'var(--surface-1)',
    color: 'var(--fg-1)',
    border: '1px solid var(--border-2)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--primary)'
  },
  danger: {
    background: 'var(--danger)',
    color: '#fff'
  }
};
function Button({
  kind = 'primary',
  icon,
  children,
  onClick,
  style,
  size
}) {
  const sizeStyle = size === 'sm' ? {
    height: 28,
    fontSize: 13,
    padding: '0 12px',
    borderRadius: 6
  } : size === 'lg' ? {
    height: 44,
    fontSize: 15,
    padding: '0 20px',
    borderRadius: 10
  } : {};
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      ...btnStyles.base,
      ...btnStyles[kind],
      ...sizeStyle,
      ...style
    },
    onMouseDown: e => e.currentTarget.style.filter = 'brightness(0.92)',
    onMouseUp: e => e.currentTarget.style.filter = '',
    onMouseLeave: e => e.currentTarget.style.filter = ''
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20
  }), children);
}

// --------------------------------------------------------------------
// Card
// --------------------------------------------------------------------
function Card({
  children,
  lifted,
  dense,
  padding,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: padding ?? (dense ? '14px 16px' : 20),
      boxShadow: lifted ? 'var(--shadow-1)' : 'none',
      ...style
    }
  }, children);
}
function CardHeader({
  eyebrow,
  title,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 14,
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      marginBottom: 4
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("div", {
    className: "type-h4"
  }, title)), action);
}

// --------------------------------------------------------------------
// Chip
// --------------------------------------------------------------------
function Chip({
  tone = 'neutral',
  icon,
  dot,
  children,
  style
}) {
  const map = {
    low: {
      bg: 'var(--risk-low-bg)',
      fg: 'var(--success-fg)',
      dotC: 'var(--risk-low)'
    },
    moderate: {
      bg: 'var(--risk-moderate-bg)',
      fg: 'var(--warning-fg)',
      dotC: 'var(--risk-moderate)'
    },
    high: {
      bg: 'var(--risk-high-bg)',
      fg: 'var(--danger-fg)',
      dotC: 'var(--risk-high)'
    },
    info: {
      bg: 'var(--info-bg)',
      fg: 'var(--info-fg)',
      dotC: 'var(--info)'
    },
    success: {
      bg: 'var(--success-bg)',
      fg: 'var(--success-fg)',
      dotC: 'var(--success)'
    },
    warning: {
      bg: 'var(--warning-bg)',
      fg: 'var(--warning-fg)',
      dotC: 'var(--warning)'
    },
    danger: {
      bg: 'var(--danger-bg)',
      fg: 'var(--danger-fg)',
      dotC: 'var(--danger)'
    },
    neutral: {
      bg: 'var(--slate-100)',
      fg: 'var(--fg-2)',
      dotC: 'var(--slate-400)'
    }
  };
  const t = map[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      font: '500 12px var(--font-sans)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: t.dotC
    }
  }), icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    style: {
      fontSize: 14,
      color: t.dotC
    }
  }), children);
}

// --------------------------------------------------------------------
// Banner
// --------------------------------------------------------------------
function Banner({
  tone = 'info',
  icon,
  title,
  children
}) {
  const map = {
    info: {
      bg: 'var(--info-bg)',
      bd: '#BFDBFE',
      fg: 'var(--info-fg)',
      ic: 'var(--info)',
      di: icon ?? 'info'
    },
    warning: {
      bg: 'var(--warning-bg)',
      bd: '#FDE68A',
      fg: 'var(--warning-fg)',
      ic: 'var(--warning)',
      di: icon ?? 'warning'
    },
    danger: {
      bg: 'var(--danger-bg)',
      bd: '#FECACA',
      fg: 'var(--danger-fg)',
      ic: 'var(--danger)',
      di: icon ?? 'priority_high'
    },
    success: {
      bg: 'var(--success-bg)',
      bd: '#A7F3D0',
      fg: 'var(--success-fg)',
      ic: 'var(--success)',
      di: icon ?? 'check_circle'
    }
  };
  const t = map[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 10,
      background: t.bg,
      border: `1px solid ${t.bd}`,
      color: t.fg,
      font: '400 13px var(--font-sans)',
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.di,
    size: 20,
    style: {
      color: t.ic,
      marginTop: 1,
      flex: '0 0 auto'
    }
  }), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--fg-1)',
      fontWeight: 600
    }
  }, title), title && ' ', children));
}

// --------------------------------------------------------------------
// Avatar
// --------------------------------------------------------------------
function Avatar({
  name,
  size = 32,
  color = 'var(--primary)'
}) {
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: 999,
      background: color,
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      font: `600 ${Math.round(size * 0.4)}px var(--font-sans)`,
      flex: '0 0 auto'
    }
  }, initials);
}

// --------------------------------------------------------------------
// StatTile — clinical readout cell
// --------------------------------------------------------------------
function StatTile({
  icon,
  label,
  value,
  unit,
  delta,
  deltaTone
}) {
  const dt = deltaTone === 'good' ? 'var(--success-fg)' : deltaTone === 'bad' ? 'var(--danger-fg)' : 'var(--fg-3)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "type-eyebrow",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--fg-3)'
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 20,
    style: {
      color: 'var(--primary)',
      fontSize: 16
    }
  }), label), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 22px var(--font-mono)',
      color: 'var(--fg-1)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em'
    }
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    style: {
      font: '400 12px var(--font-sans)',
      color: 'var(--fg-3)',
      marginLeft: 3
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 12px var(--font-mono)',
      color: dt
    }
  }, delta));
}

// --------------------------------------------------------------------
// SectionTitle
// --------------------------------------------------------------------
function SectionTitle({
  children,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "type-h2"
  }, children), action);
}

// --------------------------------------------------------------------
// JRISSI gauge
// --------------------------------------------------------------------
function JrissiGauge({
  score,
  size = 160
}) {
  const tone = score < 34 ? 'low' : score < 67 ? 'moderate' : 'high';
  const colorMap = {
    low: '#10B981',
    moderate: '#F59E0B',
    high: '#EF4444'
  };
  const labelMap = {
    low: 'Low',
    moderate: 'Moderate',
    high: 'High'
  };
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: '0 0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: `0 0 ${size} ${size}`,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: "#E2E8F0",
    strokeWidth: "12",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    stroke: colorMap[tone],
    strokeWidth: "12",
    fill: "none",
    strokeLinecap: "round",
    strokeDasharray: circ,
    strokeDashoffset: off
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      font: '600 34px var(--font-mono)',
      color: 'var(--fg-1)',
      lineHeight: 1
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      font: '500 10px var(--font-sans)',
      color: colorMap[tone],
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginTop: 4
    }
  }, labelMap[tone])));
}

// --------------------------------------------------------------------
// Sparkline
// --------------------------------------------------------------------
function Sparkline({
  data,
  width = 120,
  height = 32,
  color = 'var(--primary)'
}) {
  if (!data?.length) return null;
  const min = Math.min(...data),
    max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * width;
    const y = height - (v - min) / span * height;
    return `${x},${y}`;
  }).join(' ');
  return /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    fill: "none",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    points: pts
  }));
}

// --------------------------------------------------------------------
// Export to window
// --------------------------------------------------------------------
Object.assign(window, {
  Icon,
  Button,
  Card,
  CardHeader,
  Chip,
  Banner,
  Avatar,
  StatTile,
  SectionTitle,
  JrissiGauge,
  Sparkline
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "src/widgets.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.JrissiGauge = __ds_scope.JrissiGauge;

__ds_ns.RoleAvatar = __ds_scope.RoleAvatar;

__ds_ns.StatTile = __ds_scope.StatTile;

})();
