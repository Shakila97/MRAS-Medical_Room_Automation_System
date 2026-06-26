/* eslint-disable */
// MRAS — component showcase artboards (for the design canvas)

// ---------------------------------------------------------------- Buttons demo
function ButtonsDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Action</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Buttons</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {[
          { kind: 'primary', label: 'Primary' },
          { kind: 'secondary', label: 'Secondary' },
          { kind: 'ghost', label: 'Ghost' },
          { kind: 'danger', label: 'Danger' },
        ].map((b, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
            <div className="type-eyebrow">{b.label}</div>
            <Button kind={b.kind} size="sm" icon="add">Small</Button>
            <Button kind={b.kind} icon="add">Default</Button>
            <Button kind={b.kind} size="lg" icon="add">Large</Button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--border-1)' }}>
        <div className="type-eyebrow" style={{ marginBottom: 10 }}>In context</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button kind="primary" icon="add">New consultation</Button>
          <Button kind="secondary" icon="download">Export</Button>
          <Button kind="ghost" icon="open_in_new">Open record</Button>
          <Button kind="danger" icon="cancel">Escalate</Button>
          <Button kind="primary" icon="check" size="sm">Sign</Button>
          <Button kind="secondary" size="sm">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Chips & Banners
function ChipsBanners() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Status</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Chips &amp; banners</div>

      <div className="type-eyebrow" style={{ marginBottom: 10 }}>Risk chips</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <Chip tone="low" dot>Low · 19</Chip>
        <Chip tone="moderate" dot>Moderate · 52</Chip>
        <Chip tone="high" dot>High · 78</Chip>
      </div>

      <div className="type-eyebrow" style={{ marginBottom: 10 }}>Status chips</div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
        <Chip tone="success" icon="check_circle">Healthy</Chip>
        <Chip tone="warning" icon="schedule">Expires 14d</Chip>
        <Chip tone="danger" icon="priority_high">Stock-out</Chip>
        <Chip tone="info" icon="info">Pre-visit ready</Chip>
        <Chip tone="neutral">Draft</Chip>
      </div>

      <div className="type-eyebrow" style={{ marginBottom: 10 }}>Banners</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Banner tone="info" title="3 pre-visit briefings ready.">Open the queue to review before the 09:30 consultations begin.</Banner>
        <Banner tone="warning" title="Pollen levels forecast to rise Thursday.">3 employees with seasonal allergy history have been flagged.</Banner>
        <Banner tone="danger" title="JRISSI sustained High for 14 days.">A. Perera (E-002417) requires escalation.</Banner>
        <Banner tone="success" title="Prescription saved.">Sent to pharmacy queue.</Banner>
      </div>
    </div>
  );
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
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Forms</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Inputs &amp; controls</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <Input label="Patient name" value={t1} onChange={setT1} leading="person" required />
        <Input label="Employee ID" value="E-002417" leading="badge" hint="Auto-filled from scan" />
        <Select label="Department" value={sel} onChange={setSel} options={[
          { value: 'engineering', label: 'Engineering' }, { value: 'hr', label: 'HR' },
          { value: 'finance', label: 'Finance' }, { value: 'ops', label: 'Operations' },
        ]} />
        <DateField label="Consultation date" value={date} onChange={setDate} />
        <Input label="Dose" value="" placeholder="500 mg" leading="medication" error="Required for prescription" onChange={setT2} />
        <Input label="Disabled" value="Read-only" disabled />
      </div>

      <Textarea label="Plan" placeholder="Continue antihistamine. Review JRISSI in 7 days." rows={3} />

      <div style={{ display: 'flex', gap: 28, marginTop: 24, paddingTop: 20, borderTop: '1px dashed var(--border-1)' }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Toggle</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Toggle checked={tog} onChange={setTog} label="Auto-send to pharmacy" />
            <Toggle checked={!tog} onChange={(v) => setTog(!v)} label="Compact rows" />
            <Toggle checked={false} disabled label="Two-factor (admin only)" />
          </div>
        </div>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Checkbox</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Checkbox checked={chk} onChange={setChk} label="Acknowledge JRISSI alert" />
            <Checkbox checked={false} indeterminate label="3 of 8 patients selected" />
            <Checkbox checked={false} label="Include in monthly report" />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Tabs</div>
          <Tabs value={tab} onChange={setTab} items={[
            { value: 'subjective', label: 'Subjective', icon: 'edit_note', count: 1 },
            { value: 'objective', label: 'Objective', icon: 'monitor_heart' },
            { value: 'assessment', label: 'Assessment', icon: 'psychology' },
            { value: 'plan', label: 'Plan', icon: 'task_alt' },
          ]} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- DataTable demo
function DataTableDemo() {
  const rows = [
    { id: 'E-002417', name: 'A. Perera', dept: 'Engineering', jrissi: 78, last: '2026-05-12', flag: 'High' },
    { id: 'E-002104', name: 'S. Fernando', dept: 'HR', jrissi: 52, last: '2026-05-09', flag: 'Moderate' },
    { id: 'E-001998', name: 'D. Anuradha', dept: 'Engineering', jrissi: 31, last: '2026-05-13', flag: 'Low' },
    { id: 'E-001890', name: 'P. Jayasinghe', dept: 'Operations', jrissi: 44, last: '2026-05-11', flag: 'Moderate' },
    { id: 'E-001705', name: 'K. Silva', dept: 'Finance', jrissi: 19, last: '2026-05-14', flag: 'Low' },
    { id: 'E-001602', name: 'M. Karunaratne', dept: 'Engineering', jrissi: 66, last: '2026-05-08', flag: 'Moderate' },
  ];
  return (
    <div style={{ background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
      <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Data</div>
          <div className="type-h3">Data table</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Input value="" placeholder="Search…" leading="search" style={{ width: 220 }} onChange={() => {}} />
          <Button kind="secondary" icon="filter_list">Filter</Button>
          <Button kind="primary" icon="add">New</Button>
        </div>
      </div>
      <DataTable
        selectable
        columns={[
          { key: 'id', label: 'Employee ID', sortable: true, mono: true, width: 130 },
          { key: 'name', label: 'Name', sortable: true, render: (v, r) => (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={v} size={28} color="var(--slate-500)" />
              <div>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{v}</div>
                <div className="type-caption">{r.dept}</div>
              </div>
            </div>
          ) },
          { key: 'jrissi', label: 'JRISSI', sortable: true, align: 'right', mono: true },
          { key: 'flag', label: 'Risk', render: (v) => <Chip tone={v.toLowerCase()} dot>{v}</Chip> },
          { key: 'last', label: 'Last visit', sortable: true, mono: true, muted: true },
          { key: 'actions', label: '', width: 40, render: () => <Icon name="more_horiz" size={20} style={{ color: 'var(--fg-3)' }} /> },
        ]}
        rows={rows}
        totalLabel="6 of 1,284 employees"
        page={1} pageCount={214} onPage={() => {}}
        onRowClick={() => {}}
      />
    </div>
  );
}

// ---------------------------------------------------------------- Toasts demo
function ToastsDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Feedback</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Toasts &amp; alerts</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Toast tone="success" title="Prescription saved." description="Sent to pharmacy queue · ETA 4 min." onClose={() => {}} />
        <Toast tone="info" title="Pre-visit briefing ready." description="A. Perera · open before 09:30." onClose={() => {}} />
        <Toast tone="warning" title="Stock low: amoxicillin 250 mg." description="6 packs remaining · expires 2026-07-12." onClose={() => {}} />
        <Toast tone="danger" title="Sync paused." description="Climate service unreachable. Retrying in 30 s." onClose={() => {}} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Stepper demo
function StepperDemo() {
  const [step, setStep] = React.useState(1);
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Forms</div>
      <div className="type-h3" style={{ marginBottom: 24 }}>Multi-step wizard</div>
      <Stepper current={step} steps={['Identify', 'Vitals', 'Assessment', 'Prescription', 'Sign']} />
      <div style={{ marginTop: 24, padding: 20, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', borderRadius: 10 }}>
        <div className="type-eyebrow" style={{ marginBottom: 6 }}>Step {step + 1} · {['Identify patient', 'Capture vitals', 'Subjective + objective', 'Prescription', 'Sign &amp; close'][step]}</div>
        <div className="type-body" style={{ marginBottom: 16 }}>
          {['Scan the employee QR or search by name / ID.',
            'Read vitals from the connected cuff &amp; thermometer. Manual entry available.',
            'Record symptoms and assessment. JRISSI score auto-attached for doctor view.',
            'Search drug catalog. Interactions checked against patient history in real-time.',
            'Sign electronically. Record is locked and sent to the pharmacy queue.'][step]}
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          <Button kind="ghost" icon="arrow_back" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
          <Button kind="primary" icon="arrow_forward" onClick={() => setStep(Math.min(4, step + 1))}>{step === 4 ? 'Finish' : 'Continue'}</Button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Charts demo
function ChartsDemo() {
  const vitals = [118, 122, 119, 124, 121, 126, 123, 120, 128, 125, 122, 120, 119, 121];
  const days = ['1', '', '3', '', '5', '', '7', '', '9', '', '11', '', '13', '14'];
  const dispensed = [42, 68, 51, 73, 88, 64, 55];
  const dayLbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Data viz</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Charts</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
        <Card>
          <CardHeader eyebrow="Vitals · 14 days" title="Systolic BP" action={<Chip tone="moderate" dot>Borderline</Chip>} />
          <LineChart data={vitals} width={420} height={180} xLabels={days} unit="" refLines={[{ value: 130, label: 'Hypertension', color: 'var(--warning)' }]} />
        </Card>
        <Card>
          <CardHeader eyebrow="Pharmacy · this week" title="Items dispensed" />
          <BarChart data={dispensed} labels={dayLbls} width={300} height={180} />
        </Card>
        <Card>
          <CardHeader eyebrow="Workforce · health" title="JRISSI distribution" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Donut size={130} thickness={18} segments={[
              { value: 968, color: 'var(--success)' },
              { value: 271, color: 'var(--warning)' },
              { value: 45, color: 'var(--danger)' },
            ]} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <LegendRow color="var(--success)" label="Low" value="968" />
              <LegendRow color="var(--warning)" label="Moderate" value="271" />
              <LegendRow color="var(--danger)" label="High" value="45" />
            </div>
          </div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16 }}>
        {[
          { label: 'Heart rate', v: '72', u: 'bpm', d: [70, 72, 71, 74, 72, 71, 73, 72], c: 'var(--success)' },
          { label: 'SpO₂', v: '98', u: '%', d: [98, 97, 98, 98, 97, 98, 98, 98], c: 'var(--success)' },
          { label: 'Temp', v: '36.6', u: '°C', d: [36.5, 36.6, 36.7, 36.6, 36.6, 36.5, 36.6, 36.6], c: 'var(--primary)' },
          { label: 'Steps', v: '7,432', u: '', d: [6500, 7200, 6800, 7400, 7100, 7300, 7400, 7432], c: 'var(--info)' },
        ].map((t, i) => (
          <Card key={i} dense>
            <div className="type-eyebrow" style={{ marginBottom: 4 }}>{t.label}</div>
            <div className="type-clinical" style={{ marginBottom: 6 }}>{t.v}<span style={{ fontSize: 12, color: 'var(--fg-3)', marginLeft: 4 }}>{t.u}</span></div>
            <Sparkline data={t.d} width={160} height={32} color={t.c} />
          </Card>
        ))}
      </div>
    </div>
  );
}
function LegendRow({ color, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 130 }}>
      <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
      <span className="type-body-s" style={{ flex: 1, color: 'var(--fg-2)' }}>{label}</span>
      <span className="type-mono" style={{ color: 'var(--fg-1)' }}>{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------- Modal demo
function ModalDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Overlay</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Modals &amp; confirmation</div>
      <div className="type-body-s" style={{ marginBottom: 20 }}>Use modals for destructive confirmations and short, focused tasks. For long forms, prefer the side drawer.</div>
      <div style={{ position: 'relative', height: 360, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 440, background: 'var(--surface-1)', borderRadius: 12, border: '1px solid var(--border-1)', boxShadow: 'var(--shadow-3)' }}>
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="priority_high" size={20} style={{ color: 'var(--danger)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="type-h4">Escalate to occupational psychologist?</div>
              <div className="type-body-s" style={{ marginTop: 4 }}>A. Perera (E-002417) has sustained JRISSI High for 14 days. Escalation will notify the OH team and lock further changes pending review.</div>
            </div>
          </div>
          <div style={{ padding: '14px 20px', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Button kind="secondary">Cancel</Button>
            <Button kind="danger" icon="forward">Escalate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Drawer demo
function DrawerDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Overlay</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Side drawer · patient quick-view</div>
      <div style={{ position: 'relative', height: 420, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.35)' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 360, background: 'var(--surface-1)', borderLeft: '1px solid var(--border-1)', boxShadow: 'var(--shadow-3)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-1)' }}>
            <div className="type-eyebrow" style={{ marginBottom: 4 }}>Patient quick-view</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar name="A. Perera" size={40} color="var(--slate-500)" />
              <div>
                <div className="type-h4">A. Perera</div>
                <div className="type-caption">E-002417 · Engineering</div>
              </div>
            </div>
          </div>
          <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14, overflow: 'auto' }}>
            <Banner tone="danger" title="JRISSI 78 · High">14-day sustained. Escalation recommended.</Banner>
            <Card dense>
              <div className="type-eyebrow" style={{ marginBottom: 8 }}>Latest vitals · 12 May</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                <div><div className="type-caption">BP</div><div className="type-clinical" style={{ fontSize: 16 }}>128/84</div></div>
                <div><div className="type-caption">HR</div><div className="type-clinical" style={{ fontSize: 16 }}>76 bpm</div></div>
                <div><div className="type-caption">Temp</div><div className="type-clinical" style={{ fontSize: 16 }}>36.7 °C</div></div>
                <div><div className="type-caption">SpO₂</div><div className="type-clinical" style={{ fontSize: 16 }}>97 %</div></div>
              </div>
            </Card>
            <Card dense>
              <div className="type-eyebrow" style={{ marginBottom: 8 }}>Active flags</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <Chip tone="high" dot>JRISSI High</Chip>
                <Chip tone="warning">Asthma</Chip>
                <Chip tone="info">Allergy: pollen</Chip>
              </div>
            </Card>
          </div>
          <div style={{ padding: 14, borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8 }}>
            <Button kind="secondary" style={{ flex: 1 }}>Close</Button>
            <Button kind="primary" icon="open_in_new" style={{ flex: 1 }}>Open record</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- FileUpload demo
function FileUploadDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Inputs</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>File upload</div>
      <FileUpload label="Attach lab reports or imaging" hint="PDF, PNG, JPG up to 25 MB"
        files={[
          { name: 'CBC_2026-05-10.pdf', size: 184320, type: 'application/pdf' },
          { name: 'chest-xray.png', size: 1843200, type: 'image/png' },
        ]} />
    </div>
  );
}

// ---------------------------------------------------------------- Empty / Loading / Error
function StatesDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · States</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Empty · loading · error</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        <div style={{ background: 'var(--bg-canvas)', borderRadius: 10, border: '1px solid var(--border-1)' }}>
          <EmptyState icon="folder_open" title="No consultations recorded yet."
            description="Records appear here once a doctor signs a consultation note for this employee."
            action={<Button kind="ghost" icon="add">Start consultation</Button>} />
        </div>
        <div style={{ background: 'var(--bg-canvas)', borderRadius: 10, border: '1px solid var(--border-1)', padding: 24 }}>
          <div className="type-eyebrow" style={{ marginBottom: 12 }}>Loading</div>
          <LoadingRows rows={5} />
        </div>
        <div style={{ background: 'var(--bg-canvas)', borderRadius: 10, border: '1px solid var(--border-1)' }}>
          <ErrorState title="Couldn't reach the climate service."
            description="Forecast last updated 2 hours ago. Retrying automatically."
            onRetry={() => {}} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Calendar demo
function CalendarDemo() {
  const [d, setD] = React.useState('2026-05-14');
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Inputs</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Date picker</div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <MiniCalendar value={d} onChange={setD} marks={{
          '2026-05-12': true, '2026-05-14': true, '2026-05-16': true, '2026-05-20': true, '2026-05-22': true,
        }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <DateField label="Consultation date" value={d} onChange={setD} hint="Marked dates have existing bookings" />
          <div style={{ marginTop: 16 }}>
            <div className="type-eyebrow" style={{ marginBottom: 8 }}>Available slots · {new Date(d).toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'].map((t, i) => (
                <button key={i} style={{
                  padding: '8px 10px', borderRadius: 6,
                  border: '1px solid var(--border-1)', background: i === 4 ? 'var(--primary)' : 'var(--surface-1)',
                  color: i === 4 ? '#fff' : 'var(--fg-1)',
                  font: '500 12px var(--font-mono)', cursor: 'pointer',
                }}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Command Palette demo
function CommandPaletteDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Search</div>
      <div className="type-h3" style={{ marginBottom: 6 }}>Command palette</div>
      <div className="type-body-s" style={{ marginBottom: 20 }}>Cmd-K opens global search across patients, drugs, screens. Fuzzy match · keyboard-navigable.</div>
      <div style={{ position: 'relative', height: 380, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)', backdropFilter: 'blur(2px)' }} />
        <div style={{ position: 'absolute', top: 30, left: '50%', transform: 'translateX(-50%)', width: 480, background: 'var(--surface-1)', borderRadius: 12, border: '1px solid var(--border-1)', boxShadow: 'var(--shadow-3)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border-1)' }}>
            <Icon name="search" size={20} style={{ color: 'var(--fg-3)' }} />
            <span style={{ flex: 1, font: '400 15px var(--font-sans)', color: 'var(--fg-1)' }}>perera</span>
            <kbd style={{ font: '500 11px var(--font-mono)', color: 'var(--fg-3)', border: '1px solid var(--border-1)', borderRadius: 4, padding: '2px 6px' }}>ESC</kbd>
          </div>
          <div style={{ padding: 6 }}>
            {[
              { icon: 'person', t: 'A. Perera', s: 'E-002417 · Engineering · JRISSI 78', sel: true },
              { icon: 'person', t: 'M. Perera-Silva', s: 'E-002133 · Operations · JRISSI 41' },
              { icon: 'description', t: 'Consultation · A. Perera · 12 May', s: 'Allergic rhinitis · follow-up' },
              { icon: 'medication', t: 'Cetirizine 10 mg', s: 'In stock · 124 packs' },
            ].map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: it.sel ? 'var(--bg-selected)' : 'transparent' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={it.icon} size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{it.t}</div>
                  <div className="type-caption">{it.s}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 16, padding: '8px 12px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>
            <span className="type-caption">↑↓ Navigate</span>
            <span className="type-caption">↵ Open</span>
            <span className="type-caption" style={{ marginLeft: 'auto' }}>⌘K Toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Cards demo
function CardsDemo() {
  return (
    <div style={{ padding: 28, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 'var(--radius-md)' }}>
      <div className="type-eyebrow" style={{ marginBottom: 4 }}>Components · Surfaces</div>
      <div className="type-h3" style={{ marginBottom: 20 }}>Cards</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Card>
          <CardHeader eyebrow="Default" title="Resting card" action={<Button kind="ghost" size="sm" icon="more_horiz" />} />
          <div className="type-body-s">Border-only separator. No resting shadow. 20 px padding.</div>
        </Card>
        <Card lifted>
          <CardHeader eyebrow="Lifted" title="With shadow-1" action={<Chip tone="info" dot>Live</Chip>} />
          <div className="type-body-s">For dashboard widgets that should feel "alive". Subtle elevation only.</div>
        </Card>
        <Card dense>
          <CardHeader eyebrow="Dense" title="Compact" />
          <div className="type-body-s">14/16 px padding. For tables, side panels, dense lists.</div>
        </Card>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
        {[
          { i: 'monitor_heart', l: 'Active employees', v: '1,284', d: '+12 vs last month', t: 'good' },
          { i: 'event_available', l: 'Today\'s queue', v: '12', d: '3 pre-visit ready', t: 'good' },
          { i: 'psychology', l: 'JRISSI High', v: '4', d: '+1 vs last week', t: 'bad' },
          { i: 'insights', l: 'Forecast watch', v: '3', d: 'Pollen rising Thu' },
        ].map((s, idx) => (
          <Card key={idx} dense>
            <StatTile icon={s.i} label={s.l} value={s.v} delta={s.d} deltaTone={s.t} />
          </Card>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  ButtonsDemo, ChipsBanners, FormControlsDemo, DataTableDemo, ToastsDemo, StepperDemo,
  ChartsDemo, ModalDemo, DrawerDemo, FileUploadDemo, StatesDemo, CalendarDemo,
  CommandPaletteDemo, CardsDemo,
});
