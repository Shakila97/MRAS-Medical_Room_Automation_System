/* eslint-disable */
// Doctor dashboard — queue, JRISSI watchlist, forecasts

const PATIENTS = [
  { id: 'E-002417', name: 'A. Perera',     dept: 'Engineering', jrissi: 78, jr_delta: '+12', last: '2 d ago', flags: ['JRISSI High', 'Asthma'] },
  { id: 'E-002104', name: 'S. Fernando',   dept: 'HR',          jrissi: 52, jr_delta: '+6',  last: '5 d ago', flags: ['Allergy watch'] },
  { id: 'E-001998', name: 'D. Anuradha',   dept: 'Engineering', jrissi: 31, jr_delta: '-3',  last: '1 d ago', flags: [] },
  { id: 'E-001890', name: 'P. Jayasinghe', dept: 'Operations',  jrissi: 44, jr_delta: '+2',  last: '3 d ago', flags: ['Hypertension'] },
  { id: 'E-001705', name: 'K. Silva',      dept: 'Finance',     jrissi: 19, jr_delta: '-1',  last: 'today',   flags: [] },
];

function DoctorDashboard({ onOpenPatient }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Thursday · 14 May 2026</div>
          <h1 className="type-h1">Good morning, Dr. Withana.</h1>
          <p className="type-body" style={{ marginTop: 6 }}>3 employees flagged overnight. 1 escalation pending review.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="download">Export day report</Button>
          <Button kind="primary" icon="add">New consultation</Button>
        </div>
      </header>

      <Banner tone="danger" title="JRISSI sustained High for 14 days.">
        A. Perera (E-002417) requires escalation. <a href="#" onClick={(e) => { e.preventDefault(); onOpenPatient('E-002417'); }} style={{ color: 'var(--danger-fg)', textDecoration: 'underline' }}>Open record</a>.
      </Banner>

      {/* Top stat strip */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', borderRadius: 10, overflow: 'hidden' }}>
          {[
            { icon: 'groups',          label: 'Active employees',  value: '1,284' },
            { icon: 'event_available', label: 'Today\'s queue',     value: '12', delta: '3 pre-visit briefings ready', deltaTone: 'good' },
            { icon: 'psychology',      label: 'JRISSI High',        value: '4',  delta: '+1 vs last week', deltaTone: 'bad' },
            { icon: 'insights',        label: 'Forecast watch',     value: '3',  delta: 'Pollen rising Thu',  deltaTone: 'neutral' },
            { icon: 'priority_high',   label: 'Escalations',        value: '1' },
          ].map((s, i) => (
            <div key={i} style={{ borderRight: i < 4 ? '1px solid var(--border-1)' : 0 }}>
              <StatTile {...s} />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        {/* Watchlist */}
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="type-eyebrow">Doctor-only</div>
              <div className="type-h3" style={{ marginTop: 2 }}>JRISSI watchlist</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <Chip tone="high" dot>High · 4</Chip>
              <Chip tone="moderate" dot>Moderate · 11</Chip>
            </div>
          </div>
          <div>
            {PATIENTS.map((p, i) => {
              const tone = p.jrissi < 34 ? 'low' : p.jrissi < 67 ? 'moderate' : 'high';
              return (
                <div key={p.id} onClick={() => onOpenPatient(p.id)} style={{
                  display: 'grid', gridTemplateColumns: '36px 1.5fr 1fr 110px 1fr 32px',
                  alignItems: 'center', gap: 12,
                  padding: '12px 20px',
                  borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
                  cursor: 'pointer',
                  transition: 'background var(--dur-micro) var(--ease-std)',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = ''}
                >
                  <Avatar name={p.name} size={32} color="var(--slate-500)" />
                  <div>
                    <div className="type-label" style={{ color: 'var(--fg-1)' }}>{p.name}</div>
                    <div className="type-caption">{p.id} · {p.dept}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ font: '500 16px var(--font-mono)', color: 'var(--fg-1)' }}>{p.jrissi}</span>
                    <Chip tone={tone} dot style={{ padding: '2px 8px' }}>{tone === 'high' ? 'High' : tone === 'moderate' ? 'Moderate' : 'Low'}</Chip>
                  </div>
                  <div className="type-mono" style={{ color: p.jr_delta.startsWith('+') ? 'var(--danger-fg)' : 'var(--success-fg)' }}>
                    {p.jr_delta.startsWith('+') ? '↑' : '↓'} {p.jr_delta.replace(/^[-+]/, '')}
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {p.flags.length ? p.flags.map((f, j) => (
                      <Chip key={j} tone={f.includes('JRISSI') ? 'high' : 'neutral'} style={{ padding: '2px 8px', fontSize: 11 }}>{f}</Chip>
                    )) : <span className="type-caption">No flags</span>}
                  </div>
                  <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Forecast + queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card>
            <CardHeader eyebrow="Predictive layer" title="14-day forecast" action={<Button kind="ghost" size="sm" icon="open_in_new">Open</Button>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: 'cloud', label: 'Pollen levels rising', when: 'Thu 14 May', tone: 'moderate', meta: '3 allergy-history employees flagged' },
                { icon: 'thermostat', label: 'Heat-stress probable', when: 'Sat 16 May', tone: 'moderate', meta: '2 hypertension flags' },
                { icon: 'water_drop', label: 'Air-quality stable', when: 'Sun 17 May', tone: 'low', meta: 'No flags' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={r.icon} size={20} style={{ color: 'var(--primary)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                      <span className="type-label" style={{ color: 'var(--fg-1)' }}>{r.label}</span>
                      <span className="type-caption">{r.when}</span>
                    </div>
                    <div className="type-caption" style={{ marginTop: 2 }}>{r.meta}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Today" title="Next consultations" />
            {[
              { t: '09:30', n: 'A. Perera',    r: 'Pre-visit briefing ready', icon: 'description' },
              { t: '10:15', n: 'S. Fernando',  r: 'Follow-up · allergy',       icon: 'event_repeat' },
              { t: '11:00', n: 'K. Silva',     r: 'Routine check-in',          icon: 'event_available' },
              { t: '11:45', n: 'P. Jayasinghe', r: 'BP review',                icon: 'monitor_heart' },
            ].map((q, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
                <span style={{ font: '500 13px var(--font-mono)', color: 'var(--fg-1)', width: 44 }}>{q.t}</span>
                <Avatar name={q.n} size={28} color="var(--slate-500)" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{q.n}</div>
                  <div className="type-caption">{q.r}</div>
                </div>
                <Icon name={q.icon} size={20} style={{ color: 'var(--primary)' }} />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DoctorDashboard, PATIENTS });
