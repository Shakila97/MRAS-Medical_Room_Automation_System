/* eslint-disable */
// Patient record — vitals, JRISSI panel, trends, consultations

function PatientRecord({ patientId, onBack }) {
  const p = (window.PATIENTS || []).find(x => x.id === patientId) || {
    id: patientId || 'E-002417', name: 'A. Perera', dept: 'Engineering',
    jrissi: 78, jr_delta: '+12', last: '2 d ago',
    flags: ['JRISSI High', 'Asthma'],
  };

  const sleepTrend  = [7.2, 7.0, 6.8, 6.3, 6.0, 5.5, 5.3, 5.0, 4.8, 5.1, 4.6, 4.4, 4.7, 4.3];
  const stepsTrend  = [9200, 8400, 8800, 7600, 7100, 6800, 6500, 5900, 6200, 5400, 5100, 5700, 4900, 5200];
  const moodTrend   = [4, 4, 3, 3, 3, 2, 2, 3, 2, 2, 1, 2, 1, 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, font: '400 13px var(--font-sans)', color: 'var(--fg-3)' }}>
        <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ color: 'var(--primary)', textDecoration: 'none' }}>Patients</a>
        <Icon name="chevron_right" size={20} style={{ fontSize: 14 }} />
        <span style={{ color: 'var(--fg-1)' }}>{p.name}</span>
      </div>

      {/* Header */}
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Avatar name={p.name} size={64} color="var(--slate-500)" />
          <div style={{ flex: 1 }}>
            <h1 className="type-h1" style={{ marginBottom: 4 }}>{p.name}</h1>
            <div className="type-body-s" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <span><b style={{ color: 'var(--fg-1)' }}>{p.id}</b> · {p.dept}</span>
              <span>32 y · M · O+</span>
              <span>Last seen {p.last}</span>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
              <Chip tone="high" dot>JRISSI High · {p.jrissi}</Chip>
              <Chip tone="warning" icon="warning">Asthma · seasonal</Chip>
              <Chip tone="info">Allergy: pollen, dust</Chip>
              <Chip tone="neutral">Non-smoker</Chip>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button kind="primary" icon="stethoscope">Start consultation</Button>
            <Button kind="secondary" icon="description">Pre-visit briefing</Button>
          </div>
        </div>
      </Card>

      <Banner tone="danger" title="Auto-escalation triggered.">
        JRISSI score has been ≥ 67 for 14 consecutive days without consultation. Behaviour-correction engine has paused notifications pending clinician review.
      </Banner>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Vitals strip */}
          <Card padding={0}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
              <div className="type-eyebrow">Vital signs · last check-in</div>
              <div className="type-h3" style={{ marginTop: 2 }}>Thu 12 May · 09:14</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
              {[
                { icon: 'ecg_heart',     label: 'Heart rate',    value: '72',     unit: 'bpm',  delta: '↓ 3 vs avg', deltaTone: 'good' },
                { icon: 'monitor_heart', label: 'Blood pressure', value: '138/86', unit: 'mmHg', delta: '↑ Stage 1',  deltaTone: 'bad' },
                { icon: 'thermostat',    label: 'Temperature',    value: '36.6',   unit: '°C',   delta: 'Normal',     deltaTone: 'neutral' },
                { icon: 'scale',         label: 'Weight',         value: '78.2',   unit: 'kg',   delta: '↑ 1.4 kg / mo', deltaTone: 'bad' },
                { icon: 'air',           label: 'SpO₂',           value: '97',     unit: '%',    delta: 'Normal',     deltaTone: 'neutral' },
              ].map((s, i) => (
                <div key={i} style={{ borderRight: i < 4 ? '1px solid var(--border-1)' : 0 }}>
                  <StatTile {...s} />
                </div>
              ))}
            </div>
          </Card>

          {/* Trends */}
          <Card>
            <CardHeader eyebrow="Longitudinal health · 14 d" title="Trends" action={
              <div style={{ display: 'flex', gap: 4, background: 'var(--slate-100)', borderRadius: 8, padding: 3 }}>
                {['14 d', '30 d', '90 d', '6 mo'].map((t, i) => (
                  <button key={t} style={{
                    border: 0, padding: '4px 10px', borderRadius: 6,
                    font: '500 12px var(--font-sans)', cursor: 'pointer',
                    background: i === 0 ? 'var(--surface-1)' : 'transparent',
                    color: i === 0 ? 'var(--fg-1)' : 'var(--fg-3)',
                    boxShadow: i === 0 ? 'var(--shadow-1)' : 'none',
                  }}>{t}</button>
                ))}
              </div>
            } />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                { label: 'Sleep',  data: sleepTrend, suffix: 'h',  cur: '4.3 h',  color: 'var(--warning)' },
                { label: 'Steps',  data: stepsTrend, suffix: '',   cur: '5,200',  color: 'var(--danger)'  },
                { label: 'Mood (self-report)', data: moodTrend, suffix: '/5', cur: '1 / 5', color: 'var(--danger)' },
              ].map((t, i) => (
                <div key={i} style={{ padding: 14, border: '1px solid var(--border-1)', borderRadius: 10 }}>
                  <div className="type-eyebrow">{t.label}</div>
                  <div style={{ font: '500 22px var(--font-mono)', color: 'var(--fg-1)', margin: '4px 0 6px' }}>{t.cur}</div>
                  <Sparkline data={t.data} width={200} height={40} color={t.color} />
                  <div className="type-caption" style={{ marginTop: 4 }}>Down-trending</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Consultations history */}
          <Card padding={0}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="type-h3">Consultations</div>
              <Button kind="ghost" size="sm" icon="add">New</Button>
            </div>
            {[
              { d: '12 May 2026', who: 'Dr. Withana', sum: 'BP elevated, advised diet review. Cetirizine 10 mg ×7 d.', icon: 'monitor_heart' },
              { d: '02 May 2026', who: 'Dr. Withana', sum: 'Mild allergic rhinitis, prescribed antihistamine.', icon: 'pill' },
              { d: '18 Apr 2026', who: 'Dr. Fernando', sum: 'Routine check, all parameters within range.', icon: 'check_circle' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <Icon name={c.icon} size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                    <span className="type-label" style={{ color: 'var(--fg-1)' }}>{c.who}</span>
                    <span className="type-caption">{c.d}</span>
                  </div>
                  <p className="type-body-s" style={{ marginTop: 4 }}>{c.sum}</p>
                </div>
                <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
              </div>
            ))}
          </Card>
        </div>

        {/* Right column: JRISSI + briefing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Card style={{ background: 'linear-gradient(180deg, var(--surface-1) 0%, var(--surface-1) 100%)' }}>
            <CardHeader eyebrow="Doctor-only" title="JRISSI · mental health" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <JrissiGauge score={p.jrissi} size={140} />
              <div style={{ flex: 1 }}>
                <div className="type-body-s" style={{ marginBottom: 8 }}>
                  Sustained High for <b style={{ color: 'var(--fg-1)' }}>14 days</b>. Driving factors:
                </div>
                <ul style={{ margin: 0, padding: '0 0 0 14px', display: 'flex', flexDirection: 'column', gap: 4, font: '400 13px var(--font-sans)', color: 'var(--fg-2)' }}>
                  <li>Sleep ↓ 42% vs 30-day baseline</li>
                  <li>Social-contact signal ↓ 22%</li>
                  <li>Job-intensity index <b style={{ color: 'var(--fg-1)' }}>High</b></li>
                  <li>2 missed daily check-ins</li>
                </ul>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <Button kind="primary" icon="psychology">Open JRISSI detail</Button>
              <Button kind="secondary" icon="forum">Schedule check-in</Button>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="AI · Claude" title="Pre-visit briefing" action={<Chip tone="info" dot>Ready</Chip>} />
            <p className="type-body-s" style={{ lineHeight: 1.5 }}>
              Patient presents with elevated stage-1 hypertension and a sustained High JRISSI over 14 days, principally driven by sleep deficit and reduced social signals. Pollen forecast Thursday may compound their seasonal asthma — antihistamine prophylaxis is current.
            </p>
            <p className="type-body-s" style={{ lineHeight: 1.5, marginTop: 8, color: 'var(--fg-3)' }}>
              Recommended: discuss workload, consider 2-week CBT referral, monitor BP weekly.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <Button kind="secondary" size="sm" icon="content_copy">Copy</Button>
              <Button kind="ghost" size="sm" icon="thumb_up">Useful</Button>
            </div>
          </Card>

          <Card>
            <CardHeader eyebrow="Behaviour-correction" title="Active interventions" />
            {[
              { name: 'Sleep window 22:30–06:30', state: 'Day 3 of 14', tone: 'info' },
              { name: 'Walking 30 min · 5 d/wk',  state: 'Adherence 60%', tone: 'warning' },
              { name: 'Caffeine cut-off · 14:00', state: 'Paused (escalation)', tone: 'neutral' },
            ].map((iv, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
                <div>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{iv.name}</div>
                  <div className="type-caption" style={{ marginTop: 2 }}>{iv.state}</div>
                </div>
                <Chip tone={iv.tone} dot>{iv.tone === 'info' ? 'Active' : iv.tone === 'warning' ? 'Watch' : 'Paused'}</Chip>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PatientRecord });
