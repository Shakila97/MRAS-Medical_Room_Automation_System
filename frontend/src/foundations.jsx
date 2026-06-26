/* eslint-disable */
// MRAS foundations — visual specimen tiles for the design canvas

// ---------------------------------------------------------------- ColorScale
function ColorScale({ name, stops }) {
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Scale</div>
      <div className="type-h3" style={{ marginBottom: 16 }}>{name}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 8 }}>
        {stops.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ height: 56, borderRadius: 8, background: s.value, border: '1px solid var(--border-1)' }} />
            <div className="type-mono" style={{ fontSize: 11 }}>{s.step}</div>
            <div className="type-caption" style={{ fontSize: 10 }}>{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- SemanticColors
function SemanticColors() {
  const groups = [
    {
      title: 'Foreground', items: [
        { name: '--fg-1', desc: 'Primary text · headings', token: '--fg-1' },
        { name: '--fg-2', desc: 'Body', token: '--fg-2' },
        { name: '--fg-3', desc: 'Labels · secondary', token: '--fg-3' },
        { name: '--fg-4', desc: 'Disabled · tertiary', token: '--fg-4' },
      ]
    },
    {
      title: 'Surface', items: [
        { name: '--bg-canvas', desc: 'Page background', token: '--bg-canvas' },
        { name: '--surface-1', desc: 'Cards · panels', token: '--surface-1' },
        { name: '--surface-2', desc: 'Nested · inset', token: '--surface-2' },
        { name: '--bg-hover', desc: 'Row hover', token: '--bg-hover' },
      ]
    },
    {
      title: 'Status', items: [
        { name: '--success', desc: 'Healthy ranges', token: '--success' },
        { name: '--warning', desc: 'Predictive watch', token: '--warning' },
        { name: '--danger', desc: 'Escalation only', token: '--danger' },
        { name: '--info', desc: 'Informational', token: '--info' },
      ]
    },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Semantic roles</div>
      <div className="type-h3" style={{ marginBottom: 16 }}>Colour roles</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            <div className="type-label" style={{ color: 'var(--fg-3)', marginBottom: 10 }}>{g.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {g.items.map((it, ii) => (
                <div key={ii} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: `var(${it.token})`, border: '1px solid var(--border-1)', flex: '0 0 auto' }} />
                  <div style={{ minWidth: 0 }}>
                    <div className="type-mono" style={{ fontSize: 12, color: 'var(--fg-1)' }}>{it.name}</div>
                    <div className="type-caption">{it.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- RoleColors
function RoleColors() {
  const roles = [
    { token: '--role-doctor', name: 'Doctor', sub: 'Lead clinician', icon: 'stethoscope' },
    { token: '--role-employee', name: 'Employee', sub: 'Self-service', icon: 'badge' },
    { token: '--role-pharmacy', name: 'Pharmacy', sub: 'Stock & dispensing', icon: 'pill' },
    { token: '--role-admin', name: 'Admin', sub: 'System owner', icon: 'admin_panel_settings' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Persona</div>
      <div className="type-h3" style={{ marginBottom: 16 }}>Role accents</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {roles.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
            <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: `var(${r.token})` }} />
            <div style={{ width: 36, height: 36, borderRadius: 8, background: `var(${r.token})`, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={r.icon} size={20} />
            </div>
            <div>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>{r.name}</div>
              <div className="type-caption">{r.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- RiskScale
function RiskScale() {
  const rows = [
    { label: 'Low', range: '0 – 33', fg: 'var(--risk-low)', bg: 'var(--risk-low-bg)', advice: 'Continue monitoring' },
    { label: 'Moderate', range: '34 – 66', fg: 'var(--risk-moderate)', bg: 'var(--risk-moderate-bg)', advice: 'Pre-visit briefing recommended' },
    { label: 'High', range: '67 – 100', fg: 'var(--risk-high)', bg: 'var(--risk-high-bg)', advice: 'Consultation required · 14d sustained → escalate' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Doctor-only</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>JRISSI risk scale</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Mental-health risk score (0–100). Named distinctly from generic status so it can be retuned for accessibility.</div>
      <div style={{ display: 'grid', gap: 10 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 90px 1fr', gap: 12, alignItems: 'center', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--border-1)', background: r.bg }}>
            <span style={{ font: '600 13px var(--font-sans)', color: r.fg, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{r.label}</span>
            <span className="type-mono" style={{ color: 'var(--fg-1)' }}>{r.range}</span>
            <span className="type-body-s" style={{ color: 'var(--fg-2)' }}>{r.advice}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- TypeSpecimen
function TypeSpecimen() {
  const rows = [
    { cls: 'type-display-l', label: 'Display L', meta: '48 / 700 / -0.01em', sample: 'Predict. Prevent. Personalise.' },
    { cls: 'type-h1', label: 'H1', meta: '30 / 600', sample: 'Good morning, Dr. Withana.' },
    { cls: 'type-h2', label: 'H2', meta: '24 / 600', sample: 'Patient records' },
    { cls: 'type-h3', label: 'H3', meta: '20 / 600', sample: 'JRISSI watchlist' },
    { cls: 'type-h4', label: 'H4', meta: '16 / 600', sample: 'Today\u2019s queue' },
    { cls: 'type-body-l', label: 'Body L', meta: '16 / 400', sample: '3 employees flagged overnight. 1 escalation pending review.' },
    { cls: 'type-body', label: 'Body', meta: '14 / 400', sample: 'Patient is showing elevated JRISSI score over 14 days.' },
    { cls: 'type-label', label: 'Label', meta: '13 / 500', sample: 'Blood pressure' },
    { cls: 'type-eyebrow', label: 'Eyebrow', meta: '12 / 600 / +0.04em / uppercase', sample: 'Predictive layer' },
    { cls: 'type-clinical', label: 'Clinical', meta: '20 / 500 / mono / tabular', sample: '120/80 mmHg' },
    { cls: 'type-mono', label: 'Mono', meta: '13 / 400 / tabular', sample: 'E-002417 · BMI 24.1 · ↑ 4%' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Typography</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Type scale</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>IBM Plex Sans (UI) · IBM Plex Mono (clinical values, IDs). Tabular figures everywhere they line up.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr 220px', gap: 16, alignItems: 'baseline', padding: '10px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
            <div className="type-mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{r.label}</div>
            <div className={r.cls}>{r.sample}</div>
            <div className="type-mono" style={{ fontSize: 11, color: 'var(--fg-3)', textAlign: 'right' }}>{r.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- SpacingScale
function SpacingScale() {
  const steps = [
    { name: '--space-1', px: 4 },
    { name: '--space-2', px: 8 },
    { name: '--space-3', px: 12 },
    { name: '--space-4', px: 16 },
    { name: '--space-5', px: 20 },
    { name: '--space-6', px: 24 },
    { name: '--space-8', px: 32 },
    { name: '--space-10', px: 40 },
    { name: '--space-12', px: 48 },
    { name: '--space-16', px: 64 },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Spacing</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>4 px base scale</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Dashboards lean on 16–24. Modals use 24–32. Compact tables use 8–12.</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 60px 1fr', gap: 12, alignItems: 'center' }}>
            <span className="type-mono" style={{ fontSize: 12 }}>{s.name}</span>
            <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{s.px} px</span>
            <span style={{ height: 14, width: s.px, background: 'var(--primary)', borderRadius: 3 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- RadiusScale
function RadiusScale() {
  const items = [
    { name: '--radius-sm', px: 6, use: 'Inputs · chips' },
    { name: '--radius-md', px: 10, use: 'Cards (default)' },
    { name: '--radius-lg', px: 16, use: 'Dialogs · feature cards' },
    { name: '--radius-xl', px: 24, use: 'Hero blocks' },
    { name: '--radius-pill', px: 999, use: 'Status pills' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Radii</div>
      <div className="type-h3" style={{ marginBottom: 16 }}>Corner radius</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {items.map((r, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ width: '100%', aspectRatio: '1.2', borderRadius: r.px, background: 'var(--bg-canvas)', border: '1px dashed var(--border-2)' }} />
            <div className="type-mono" style={{ fontSize: 11 }}>{r.name}</div>
            <div className="type-caption">{r.use} · {r.px === 999 ? '999' : r.px} px</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- ShadowScale
function ShadowScale() {
  const items = [
    { name: '--shadow-1', use: 'Lifted card · subtle elevation' },
    { name: '--shadow-2', use: 'Menus · popovers' },
    { name: '--shadow-3', use: 'Dialogs · drawers' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Elevation</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Shadows</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Borders are the primary separator — shadows reserved for elevation transitions.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, padding: '12px 0 4px' }}>
        {items.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ height: 88, borderRadius: 12, background: 'var(--surface-1)', boxShadow: `var(${s.name})`, border: '1px solid var(--border-1)' }} />
            <div className="type-mono" style={{ fontSize: 11 }}>{s.name}</div>
            <div className="type-caption">{s.use}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- MotionTokens
function MotionTokens() {
  const [tick, setTick] = React.useState(0);
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Motion</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Duration & easing</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Functional and small. No bounce, no overshoot. Material standard easing throughout.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        {[
          { name: '--dur-micro', label: '120 ms', use: 'Hover · press' },
          { name: '--dur-fast', label: '180 ms', use: 'Show / hide' },
          { name: '--dur-medium', label: '260 ms', use: 'Overlay enter' },
        ].map((d, i) => (
          <div key={i} style={{ padding: 14, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
            <div className="type-mono" style={{ fontSize: 11, marginBottom: 4 }}>{d.name}</div>
            <div className="type-h4" style={{ marginBottom: 4 }}>{d.label}</div>
            <div className="type-caption" style={{ marginBottom: 12 }}>{d.use}</div>
            <div style={{ position: 'relative', height: 8, borderRadius: 999, background: 'var(--bg-hover)', overflow: 'hidden' }}>
              <div key={tick} style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 26, borderRadius: 999, background: 'var(--primary)',
                animation: `mrasMove ${d.label.replace(' ms', 'ms')} var(--ease-std) infinite alternate`,
              }} />
            </div>
          </div>
        ))}
      </div>
      <style>{`@keyframes mrasMove { from { transform: translateX(0); } to { transform: translateX(calc(100% - 26px)); } }`}</style>
      <button onClick={() => setTick(t => t + 1)} style={{ marginTop: 16, border: '1px solid var(--border-1)', background: 'var(--surface-1)', borderRadius: 8, padding: '6px 12px', font: '500 12px var(--font-sans)', color: 'var(--fg-2)', cursor: 'pointer' }}>Replay</button>
    </div>
  );
}

// ---------------------------------------------------------------- IconographyShowcase
function IconographyShowcase() {
  const icons = [
    'dashboard', 'groups', 'stethoscope', 'psychology', 'insights', 'description',
    'home', 'qr_code_2', 'monitor_heart', 'history', 'event_available', 'event_repeat',
    'pill', 'inventory_2', 'schedule', 'cloud', 'thermostat', 'water_drop',
    'admin_panel_settings', 'group', 'fact_check', 'settings', 'priority_high', 'notifications',
    'search', 'add', 'download', 'open_in_new', 'check_circle', 'warning', 'error', 'info',
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Iconography</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Material Symbols Rounded</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Weight 400, fill 0 (default). Filled variant reserved for active state &amp; a small list of status glyphs.</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 8 }}>
        {icons.map((n, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 10, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
            <Icon name={n} size={24} style={{ color: 'var(--primary)' }} />
            <span className="type-mono" style={{ fontSize: 10, color: 'var(--fg-3)', textAlign: 'center', wordBreak: 'break-all' }}>{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- BrandLogo
function BrandLogo() {
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 24 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Brand</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Wordmark &amp; monogram</div>
      <div className="type-body-s" style={{ marginBottom: 20 }}>Placeholder marks inferred from the README — replace with the team\u2019s real artwork when available.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', minHeight: 120 }}>
          <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 36 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', minHeight: 120 }}>
          <img src={(window.__resources&&window.__resources.mrasMark)||"assets/mras-mark.svg"} alt="MRAS" style={{ height: 48 }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, borderRadius: 10, background: 'var(--teal-800)', minHeight: 120 }}>
          <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 36, filter: 'brightness(0) invert(1)' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, borderRadius: 10, background: 'var(--teal-800)', minHeight: 120 }}>
          <img src={(window.__resources&&window.__resources.mrasMark)||"assets/mras-mark.svg"} alt="MRAS" style={{ height: 48, filter: 'brightness(0) invert(1)' }} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- ContentVoice
function ContentVoice() {
  const rows = [
    { context: 'Empty state', good: 'No consultations recorded yet.', bad: 'Nothing to see here! 🎉' },
    { context: 'Risk warning', good: 'JRISSI sustained High for 14 days. Recommend consultation.', bad: 'Uh oh — looks like things are getting risky!' },
    { context: 'Success toast', good: 'Prescription saved.', bad: 'Awesome! Your prescription is saved.' },
    { context: 'Forecast', good: 'Pollen levels are forecast to rise on Thursday. 3 employees flagged.', bad: 'Heads up — bad allergy day coming!' },
    { context: 'Error', good: 'Couldn\u2019t reach the climate service. Forecast last updated 2 hours ago.', bad: 'Oops! Something went wrong.' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', padding: 20 }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Content</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Voice — clinical, plain, reassuring</div>
      <div className="type-body-s" style={{ marginBottom: 16 }}>Like a senior nurse explaining a chart to a colleague — informed, concrete, never alarmist, never breezy. Sentence case everywhere. No emoji in product UI.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: 12, font: '500 11px var(--font-sans)', color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.04em', paddingBottom: 8, borderBottom: '1px solid var(--border-1)' }}>
        <span>Context</span><span style={{ color: 'var(--success-fg)' }}>✓ Write this</span><span style={{ color: 'var(--danger-fg)' }}>✗ Not this</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: 12, padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)', alignItems: 'flex-start' }}>
          <span className="type-label" style={{ color: 'var(--fg-1)' }}>{r.context}</span>
          <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>{r.good}</span>
          <span className="type-body-s" style={{ color: 'var(--fg-3)', textDecoration: 'line-through', textDecorationColor: 'var(--danger)' }}>{r.bad}</span>
        </div>
      ))}
    </div>
  );
}

Object.assign(window, {
  ColorScale, SemanticColors, RoleColors, RiskScale,
  TypeSpecimen, SpacingScale, RadiusScale, ShadowScale, MotionTokens,
  IconographyShowcase, BrandLogo, ContentVoice,
});
