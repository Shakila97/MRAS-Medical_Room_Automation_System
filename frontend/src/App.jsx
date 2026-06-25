/* eslint-disable */
// MRAS Design System — main showcase composition

// ---------- Tweaks defaults (persisted via __edit_mode_set_keys) -------------
const MRAS_TWEAKS = /*EDITMODE-BEGIN*/{
  "darkMode": false
}/*EDITMODE-END*/;

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

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Theme">
        <TweakToggle label="Dark mode" value={t.darkMode}
          onChange={(v) => setTweak('darkMode', v)} />
        <div style={{ marginTop: 8, padding: 10, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', font: '400 12px var(--font-sans)', color: 'var(--fg-3)', lineHeight: 1.45 }}>
          Toggles <span style={{ font: '500 11px var(--font-mono)', color: 'var(--fg-2)' }}>[data-theme]</span> on the root.
          All tokens flow from a single CSS variable map — colours, borders, shadows reassign in one place.
        </div>
      </TweakSection>
    </TweaksPanel>
  );
}

// ---------- Light wrapper to give each artboard correct background ----------
const ABG = { background: 'var(--bg-canvas)', borderRadius: 12, border: '1px solid var(--border-1)', overflow: 'hidden' };

// ---------- App --------------------------------------------------------------
function App() {
  return (
    <>
      <GlobalAnims />
      <MrasTweaksPanel />

      <DesignCanvas>
        {/* ============ INTRO ============ */}
        <DCSection id="intro" title="MRAS v3.0 — Design System &amp; UI Kit"
          subtitle="Intelligent Predictive Health Platform · React 18 + TypeScript + MUI handoff · FastAPI 0.115+ backend">
          <DCArtboard id="cover" label="Cover · brand" width={1280} height={520}>
            <CoverArtboard />
          </DCArtboard>
          <DCArtboard id="contents" label="What\u2019s inside" width={720} height={520}>
            <ContentsArtboard />
          </DCArtboard>
        </DCSection>

        {/* ============ BRAND ============ */}
        <DCSection id="brand" title="Brand &amp; content" subtitle="Logo, content voice, copywriting do\u2019s &amp; don\u2019ts">
          <DCArtboard id="logo" label="Wordmark &amp; monogram" width={760} height={560}><BrandLogo /></DCArtboard>
          <DCArtboard id="voice" label="Voice &amp; tone" width={840} height={560}><ContentVoice /></DCArtboard>
        </DCSection>

        {/* ============ COLOR ============ */}
        <DCSection id="color" title="Colour" subtitle="Tokens · semantic roles · JRISSI risk · persona accents">
          <DCArtboard id="teal" label="Primary · teal" width={920} height={260}>
            <ColorScale name="Teal · primary" stops={[
              { step: 50, value: '#F0FDFA' }, { step: 100, value: '#CCFBF1' }, { step: 200, value: '#99F6E4' },
              { step: 300, value: '#5EEAD4' }, { step: 400, value: '#2DD4BF' }, { step: 500, value: '#14B8A6' },
              { step: 600, value: '#0F766E' }, { step: 700, value: '#115E59' }, { step: 800, value: '#134E4A' },
              { step: 900, value: '#0B3F3C' },
            ]} />
          </DCArtboard>
          <DCArtboard id="slate" label="Neutrals · slate" width={920} height={260}>
            <ColorScale name="Slate · neutrals" stops={[
              { step: 0, value: '#FFFFFF' }, { step: 50, value: '#F8FAFC' }, { step: 100, value: '#F1F5F9' },
              { step: 200, value: '#E2E8F0' }, { step: 300, value: '#CBD5E1' }, { step: 400, value: '#94A3B8' },
              { step: 500, value: '#64748B' }, { step: 600, value: '#475569' }, { step: 700, value: '#334155' },
              { step: 800, value: '#1E293B' },
            ]} />
          </DCArtboard>
          <DCArtboard id="semantic" label="Semantic roles" width={920} height={420}><SemanticColors /></DCArtboard>
          <DCArtboard id="roles" label="Persona accents" width={760} height={300}><RoleColors /></DCArtboard>
          <DCArtboard id="risk" label="JRISSI risk scale" width={760} height={360}><RiskScale /></DCArtboard>
        </DCSection>

        {/* ============ TYPE ============ */}
        <DCSection id="type" title="Type" subtitle="IBM Plex Sans + Mono · clinical-data-grade legibility">
          <DCArtboard id="typescale" label="Type scale" width={1100} height={760}><TypeSpecimen /></DCArtboard>
        </DCSection>

        {/* ============ SPACING / RADIUS / SHADOW / MOTION ============ */}
        <DCSection id="layout" title="Spacing, radius, shadow, motion" subtitle="Layout primitives">
          <DCArtboard id="spacing" label="Spacing · 4 px base" width={520} height={580}><SpacingScale /></DCArtboard>
          <DCArtboard id="radius" label="Radius" width={760} height={300}><RadiusScale /></DCArtboard>
          <DCArtboard id="shadow" label="Shadow scale" width={760} height={340}><ShadowScale /></DCArtboard>
          <DCArtboard id="motion" label="Motion · duration &amp; easing" width={760} height={320}><MotionTokens /></DCArtboard>
        </DCSection>

        {/* ============ ICONOGRAPHY ============ */}
        <DCSection id="icons" title="Iconography" subtitle="Material Symbols Rounded · weight 400 · fill 0">
          <DCArtboard id="ms" label="Material Symbols (sample)" width={1100} height={460}><IconographyShowcase /></DCArtboard>
        </DCSection>

        {/* ============ COMPONENTS — ACTIONS ============ */}
        <DCSection id="comp-action" title="Components · actions" subtitle="Buttons, chips, banners, cards">
          <DCArtboard id="buttons" label="Buttons" width={1000} height={460}><ButtonsDemo /></DCArtboard>
          <DCArtboard id="chips" label="Chips &amp; banners" width={760} height={560}><ChipsBanners /></DCArtboard>
          <DCArtboard id="cards" label="Cards" width={1100} height={460}><CardsDemo /></DCArtboard>
        </DCSection>

        {/* ============ COMPONENTS — INPUTS ============ */}
        <DCSection id="comp-input" title="Components · inputs &amp; forms" subtitle="Text inputs, selects, toggles, tabs, dates, file upload">
          <DCArtboard id="inputs" label="Inputs &amp; controls" width={1000} height={680}><FormControlsDemo /></DCArtboard>
          <DCArtboard id="dates" label="Date picker" width={840} height={480}><CalendarDemo /></DCArtboard>
          <DCArtboard id="upload" label="File upload" width={620} height={460}><FileUploadDemo /></DCArtboard>
          <DCArtboard id="stepper" label="Multi-step wizard" width={840} height={420}><StepperDemo /></DCArtboard>
        </DCSection>

        {/* ============ COMPONENTS — DATA ============ */}
        <DCSection id="comp-data" title="Components · data" subtitle="Tables &amp; charts">
          <DCArtboard id="table" label="Data table · sortable, filter, pagination" width={1200} height={560}><DataTableDemo /></DCArtboard>
          <DCArtboard id="charts" label="Charts · lines, bars, donut, sparklines" width={1200} height={620}><ChartsDemo /></DCArtboard>
        </DCSection>

        {/* ============ COMPONENTS — OVERLAYS ============ */}
        <DCSection id="comp-over" title="Components · overlays &amp; feedback" subtitle="Modals, drawers, toasts, command palette">
          <DCArtboard id="modal" label="Confirmation modal" width={760} height={520}><ModalDemo /></DCArtboard>
          <DCArtboard id="drawer" label="Side drawer · patient quick-view" width={760} height={580}><DrawerDemo /></DCArtboard>
          <DCArtboard id="toast" label="Toasts" width={920} height={360}><ToastsDemo /></DCArtboard>
          <DCArtboard id="cmdk" label="Command palette" width={760} height={540}><CommandPaletteDemo /></DCArtboard>
        </DCSection>

        {/* ============ COMPONENTS — STATES ============ */}
        <DCSection id="comp-states" title="Components · states" subtitle="Empty · loading · error · skeleton">
          <DCArtboard id="states" label="State patterns" width={1200} height={420}><StatesDemo /></DCArtboard>
        </DCSection>

        {/* ============ DOCTOR SCREENS ============ */}
        <DCSection id="doctor" title="Screens · doctor"
          subtitle="Lead clinician — dashboard, patient record, SOAP, prescription, JRISSI, forecasting">
          <DCArtboard id="doc-dash" label="Dashboard" width={1440} height={900}>
            <ScreenFrame role="doctor" screen="dashboard" height={900}>
              <DoctorDashboard onOpenPatient={() => {}} />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-rec" label="Patient record" width={1440} height={900}>
            <ScreenFrame role="doctor" screen="patients" height={900}>
              <PatientRecord patientId="E-002417" onBack={() => {}} />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-soap" label="SOAP consultation editor" width={1440} height={900}>
            <ScreenFrame role="doctor" screen="consultations" height={900}>
              <SoapEditor />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-rx" label="Prescription writer · interaction check" width={1440} height={900}>
            <ScreenFrame role="doctor" screen="consultations" height={900}>
              <PrescriptionWriter />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-jr" label="JRISSI deep-dive" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="jrissi" height={1100}>
              <JrissiDeepDive />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-ai" label="JRISSI / AI · scores &amp; predictions" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="ai" height={1100}>
              <JrissiAiOverview onOpenPatient={() => {}} />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="doc-fc" label="Predictive forecasting" width={1440} height={1000}>
            <ScreenFrame role="doctor" screen="forecasts" height={1000}>
              <ForecastingView />
            </ScreenFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ EMPLOYEE SCREENS ============ */}
        <DCSection id="employee" title="Screens · employee"
          subtitle="Self-service — wellness home, scheduling, QR check-in, kiosk">
          <DCArtboard id="emp-home" label="Wellness home · timeline" width={1440} height={1100}>
            <ScreenFrame role="employee" screen="home" height={1100}>
              <EmployeeWellness />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="emp-sched" label="Appointment scheduling" width={1440} height={900}>
            <ScreenFrame role="employee" screen="checkin" height={900}>
              <AppointmentScheduling />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="emp-kiosk" label="Kiosk · QR check-in (large display)" width={920} height={720}>
            <KioskCheckIn />
          </DCArtboard>
          <DCArtboard id="emp-orig" label="Employee home (original)" width={1440} height={900}>
            <ScreenFrame role="employee" screen="home" height={900}>
              <EmployeeHome />
            </ScreenFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ PHARMACY SCREENS ============ */}
        <DCSection id="pharmacy" title="Screens · pharmacy"
          subtitle="Stock &amp; dispensing — dashboard, inventory, GRN receive, FEFO expiry watch">
          <DCArtboard id="ph-dash" label="Dashboard" width={1440} height={900}>
            <ScreenFrame role="pharmacy" screen="dashboard" height={900}>
              <PharmacyDashboard onOpenInventory={() => {}} />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ph-inv" label="Inventory" width={1440} height={900}>
            <ScreenFrame role="pharmacy" screen="inventory" height={900}>
              <PharmacyInventory />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ph-grn" label="GRN · receive stock (5-step)" width={1440} height={1000}>
            <ScreenFrame role="pharmacy" screen="grn" height={1000}>
              <GrnReceive />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ph-exp" label="Expiry watch · FEFO" width={1440} height={900}>
            <ScreenFrame role="pharmacy" screen="expiry" height={900}>
              <ExpiryWatch />
            </ScreenFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ ADMIN SCREENS ============ */}
        <DCSection id="admin" title="Screens · admin"
          subtitle="System owner — console, users &amp; roles, audit log, reports">
          <DCArtboard id="ad-con" label="Console" width={1440} height={900}>
            <ScreenFrame role="admin" screen="console" height={900}>
              <AdminDashboard />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ad-users" label="Users &amp; roles" width={1440} height={900}>
            <ScreenFrame role="admin" screen="users" height={900}>
              <AdminUsers />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ad-audit" label="Audit log" width={1440} height={900}>
            <ScreenFrame role="admin" screen="audit" height={900}>
              <AuditLog />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="ad-rep" label="Reports &amp; analytics" width={1440} height={1000}>
            <ScreenFrame role="admin" screen="services" height={1000}>
              <ReportsAnalytics />
            </ScreenFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ SHARED SCREENS ============ */}
        <DCSection id="shared" title="Screens · shared" subtitle="Notifications center, settings, account">
          <DCArtboard id="sh-notif" label="Notifications · closed-loop" width={1440} height={1000}>
            <ScreenFrame role="doctor" screen="dashboard" height={1000}>
              <NotificationsCenter />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set" label="Settings · profile" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="reports" height={1100}>
              <SettingsProfile />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set-sec" label="Settings · security" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="reports" height={1100}>
              <SettingsScreenWith tab="security" />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set-not" label="Settings · notifications" width={1440} height={1000}>
            <ScreenFrame role="doctor" screen="reports" height={1000}>
              <SettingsScreenWith tab="notifications" />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set-priv" label="Settings · privacy &amp; PHI" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="reports" height={1100}>
              <SettingsScreenWith tab="privacy" />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set-int" label="Settings · integrations" width={1440} height={900}>
            <ScreenFrame role="doctor" screen="reports" height={900}>
              <SettingsScreenWith tab="integrations" />
            </ScreenFrame>
          </DCArtboard>
          <DCArtboard id="sh-set-pref" label="Settings · preferences" width={1440} height={1100}>
            <ScreenFrame role="doctor" screen="reports" height={1100}>
              <SettingsScreenWith tab="preferences" />
            </ScreenFrame>
          </DCArtboard>
        </DCSection>

        {/* ============ AUTH ============ */}
        <DCSection id="auth" title="Screens · authentication"
          subtitle="Login, sign-up &amp; first-run onboarding · both modes">
          <DCArtboard id="auth-login" label="Sign in" width={1280} height={780}>
            <div style={ABG}><MrasLogin /></div>
          </DCArtboard>
          <DCArtboard id="auth-signup" label="Create account · with validation" width={1280} height={820}>
            <div style={ABG}><MrasSignUp /></div>
          </DCArtboard>
          <DCArtboard id="auth-reg" label="Onboarding · register (4-step)" width={1280} height={900}>
            <div style={ABG}><MrasRegister /></div>
          </DCArtboard>
          <DCArtboard id="auth-signup-dark" label="Create account · forced dark" width={1280} height={820}>
            <div data-theme="dark" style={ABG}><MrasSignUp /></div>
          </DCArtboard>
          <DCArtboard id="auth-login-dark" label="Sign in · forced dark" width={1280} height={780}>
            <div data-theme="dark" style={ABG}><MrasLogin /></div>
          </DCArtboard>
        </DCSection>

        {/* ============ HANDOFF ============ */}
        <DCSection id="handoff" title="Handoff — for Claude Code &amp; your repo"
          subtitle="Component specs, token reference, MUI theme, FastAPI ↔ frontend contract notes">
          <DCArtboard id="hi" label="Read me first" width={1080} height={620}><HandoffIntro /></DCArtboard>
        </DCSection>
      </DesignCanvas>
    </>
  );
}

// ---------- Intro artboards --------------------------------------------------
function CoverArtboard() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: 'linear-gradient(160deg, var(--teal-800) 0%, var(--teal-900) 60%, #062321 100%)', color: '#fff', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Decorative grid */}
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.06 }} xmlns="http://www.w3.org/2000/svg">
        <defs><pattern id="cg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" stroke="white" strokeWidth="0.5" fill="none"/></pattern></defs>
        <rect width="100%" height="100%" fill="url(#cg)" />
      </svg>
      {/* Soft glow */}
      <div style={{ position: 'absolute', right: -120, top: -120, width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,234,212,0.32), transparent 65%)' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
        <img src={(window.__resources&&window.__resources.mrasMark)||"assets/mras-mark.svg"} alt="" style={{ height: 36, filter: 'brightness(0) invert(1)' }} />
        <div>
          <div style={{ font: '500 11px var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.16em', opacity: 0.7 }}>MRAS v3.0 · Design System</div>
        </div>
      </div>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ font: '700 14px var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--teal-300)' }}>Predict. Prevent. Personalise.</div>
        <h1 style={{ font: '600 56px var(--font-sans)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, maxWidth: 900 }}>Intelligent predictive health, for the corporate medical room.</h1>
        <p style={{ font: '400 17px var(--font-sans)', lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', maxWidth: 720, margin: 0 }}>
          Tokens, components and full UI kit for four roles — doctor, employee, pharmacy, admin — over one shared interface. Tuned for React 18 + TypeScript + MUI, wired for a FastAPI 0.115+ backend.
        </p>
      </div>

      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { k: 'Foundation', v: '124 tokens', s: 'Colour · type · spacing · radius · shadow · motion' },
          { k: 'Components', v: '30+ patterns', s: 'Buttons through command palette · React + MUI handoff' },
          { k: 'Screens', v: '16 surfaces', s: 'Four roles · dashboards · flows · kiosk' },
          { k: 'Theme', v: 'Light + dark', s: 'Single CSS-var swap · WCAG AA on both' },
        ].map((s, i) => (
          <div key={i} style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
            <div style={{ font: '500 11px var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.65 }}>{s.k}</div>
            <div style={{ font: '600 18px var(--font-sans)', marginTop: 6 }}>{s.v}</div>
            <div style={{ font: '400 12px var(--font-sans)', marginTop: 4, opacity: 0.7, lineHeight: 1.4 }}>{s.s}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContentsArtboard() {
  const sections = [
    { n: '01', t: 'Brand &amp; content', s: 'Logo · voice · do\u2019s &amp; don\u2019ts' },
    { n: '02', t: 'Colour', s: 'Teal · slate · semantic · JRISSI risk' },
    { n: '03', t: 'Type', s: 'IBM Plex Sans &amp; Mono · 11-step scale' },
    { n: '04', t: 'Spacing, radius, shadow, motion', s: '4 px base · Material easing' },
    { n: '05', t: 'Iconography', s: 'Material Symbols Rounded' },
    { n: '06', t: 'Components', s: '30+ — actions, inputs, data, overlays, states' },
    { n: '07', t: 'Doctor screens', s: 'Dashboard · SOAP · Rx · JRISSI · forecasting' },
    { n: '08', t: 'Employee screens', s: 'Wellness · scheduling · kiosk' },
    { n: '09', t: 'Pharmacy screens', s: 'Inventory · GRN · FEFO expiry watch' },
    { n: '10', t: 'Admin screens', s: 'Console · users · audit · reports' },
    { n: '11', t: 'Shared', s: 'Notifications · settings' },
    { n: '12', t: 'Handoff', s: 'Specs · tokens · MUI theme · FastAPI contract' },
  ];
  return (
    <div style={{ padding: 36, background: 'var(--bg-canvas)', height: '100%', overflow: 'auto' }}>
      <div className="type-eyebrow" style={{ marginBottom: 6 }}>Contents</div>
      <h2 className="type-display-m" style={{ marginBottom: 28 }}>What\u2019s inside</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {sections.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 14px', borderRadius: 8, background: 'var(--surface-1)', border: '1px solid var(--border-1)' }}>
            <span className="type-mono" style={{ color: 'var(--primary)', fontSize: 13, minWidth: 24 }}>{s.n}</span>
            <div style={{ minWidth: 0 }}>
              <div className="type-label" style={{ color: 'var(--fg-1)' }} dangerouslySetInnerHTML={{ __html: s.t }} />
              <div className="type-caption" style={{ marginTop: 2 }} dangerouslySetInnerHTML={{ __html: s.s }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HandoffIntro() {
  return (
    <div style={{ padding: 32, background: 'var(--bg-canvas)', height: '100%', overflow: 'auto' }}>
      <div className="type-eyebrow" style={{ marginBottom: 6 }}>For engineering</div>
      <h2 className="type-h1" style={{ marginBottom: 8 }}>Handoff package</h2>
      <p className="type-body-l" style={{ marginBottom: 24, maxWidth: 720 }}>
        Everything you need to wire this UI kit into your React 18 + TypeScript + MUI codebase, against the FastAPI 0.115+ backend. Read in order.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {[
          { i: 'menu_book', t: 'README.md', d: 'Architecture overview, install steps, file map. Start here.', f: 'handoff/README.md' },
          { i: 'palette',   t: 'tokens.md', d: 'Every CSS variable with description, scale step, and MUI mapping.', f: 'handoff/tokens.md' },
          { i: 'widgets',   t: 'components.md', d: 'Component-by-component spec: props, anatomy, states, do\u2019s and don\u2019ts.', f: 'handoff/components.md' },
          { i: 'cable',     t: 'api-contracts.md', d: 'Frontend ↔ FastAPI contract notes. Endpoints, schemas, role gating.', f: 'handoff/api-contracts.md' },
          { i: 'palette',   t: 'theme.ts (MUI)', d: 'Drop-in MUI theme: palette, typography, shape, components overrides.', f: 'handoff/mui/theme.ts.txt' },
          { i: 'inventory_2', t: 'MrasComponents.tsx', d: 'Typed wrappers (Chip, Banner, JrissiGauge, DataTable…) over MUI primitives.', f: 'handoff/mui/MrasComponents.tsx.txt' },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, padding: 16, borderRadius: 10, background: 'var(--surface-1)', border: '1px solid var(--border-1)' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <Icon name={r.i} size={24} style={{ color: 'var(--primary)' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="type-h4">{r.t}</div>
              <div className="type-body-s" style={{ marginTop: 4 }}>{r.d}</div>
              <div className="type-mono" style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 6 }}>{r.f}</div>
            </div>
          </div>
        ))}
      </div>

      <Banner tone="info" title="Designed for Claude Code." >
        Open the <span className="type-mono" style={{ font: '500 12px var(--font-mono)' }}>handoff/</span> folder in Claude Code with this prompt:
        <span className="type-mono" style={{ display: 'block', marginTop: 6, padding: 8, borderRadius: 6, background: 'var(--surface-1)', color: 'var(--fg-1)' }}>
          Read handoff/README.md and follow the build plan. Generate the MUI theme &amp; wrappers, scaffold the role-aware routing, and stub out a couple of FastAPI fetchers.
        </span>
      </Banner>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
