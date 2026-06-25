/* eslint-disable */
// Employee-facing screens: wellness home (timeline), appointment / QR check-in.

// ============================================================================
// 1. WELLNESS HOME (timeline + your health)
// ============================================================================
function EmployeeWellness() {
  const week = [62, 68, 71, 64, 75, 70, 73];
  const weekLbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Thursday · 14 May 2026</div>
          <h1 className="type-h1">Good morning, Shashika.</h1>
          <p className="type-body" style={{ marginTop: 6 }}>You\u2019re trending well. Your next check-in is on Tuesday at 10:00.</p>
        </div>
        <Button kind="primary" icon="qr_code_2">Open my QR</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="This week" title="Wellness score"
            action={<Chip tone="success" dot>Trending up</Chip>} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 12 }}>
            <div className="type-clinical" style={{ fontSize: 48, lineHeight: 1 }}>73</div>
            <div className="type-body-s" style={{ paddingBottom: 6 }}>
              <span style={{ color: 'var(--success-fg)' }}>↑ 4</span> vs last week
            </div>
          </div>
          <BarChart data={week} labels={weekLbls} width={520} height={130} color="var(--success)" max={100} />
        </Card>

        <Card>
          <CardHeader eyebrow="Next" title="Appointment" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
            <div style={{ width: 56, height: 56, borderRadius: 10, background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <span style={{ font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.85 }}>Tue</span>
              <span style={{ font: '700 22px var(--font-sans)', lineHeight: 1 }}>19</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>Routine check-in</div>
              <div className="type-caption" style={{ marginTop: 2 }}>10:00 · 15 min · Dr. Withana · Room MR-1</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <Button kind="secondary" size="sm" icon="event_repeat" style={{ flex: 1 }}>Reschedule</Button>
            <Button kind="ghost" size="sm" icon="add_alert" style={{ flex: 1 }}>Add reminder</Button>
          </div>
          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: 'var(--info-bg)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="info" size={20} style={{ color: 'var(--info)', marginTop: 1 }} />
            <div className="type-body-s" style={{ color: 'var(--info-fg)' }}>Your doctor has prepared a pre-visit briefing. You\u2019ll see it the morning of the visit.</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { i: 'monitor_heart', l: 'Heart rate · resting', v: '72', u: 'bpm', d: [70,72,71,74,72,71,73,72], c: 'var(--success)' },
          { i: 'air',           l: 'SpO₂',                v: '98', u: '%',   d: [98,97,98,98,97,98,98,98], c: 'var(--success)' },
          { i: 'directions_run', l: 'Steps · today',       v: '7,432', u: '', d: [6500,7200,6800,7400,7100,7300,7400,7432], c: 'var(--info)' },
          { i: 'bedtime',        l: 'Sleep · 7-day avg',   v: '7.2', u: 'h', d: [6.8,7.1,7.0,7.4,7.2,7.1,7.3,7.2], c: 'var(--primary)' },
        ].map((m, i) => (
          <Card key={i} dense>
            <div className="type-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
              <Icon name={m.i} size={20} style={{ color: 'var(--primary)', fontSize: 16 }} />
              {m.l}
            </div>
            <div className="type-clinical" style={{ fontSize: 22, marginBottom: 6 }}>{m.v}<span style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)', marginLeft: 3 }}>{m.u}</span></div>
            <Sparkline data={m.d} width={200} height={32} color={m.c} />
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
            <div className="type-eyebrow">Activity</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Your timeline</div>
          </div>
          <div>
            {[
              { d: 'Today',   t: '08:14', e: 'Wellness score updated to 73', icon: 'trending_up', tone: 'success' },
              { d: 'Today',   t: '07:30', e: 'Synced fitness data · 7,432 steps yesterday', icon: 'sync', tone: 'info' },
              { d: 'Yesterday', t: '14:20', e: 'Pre-visit briefing prepared for Tue 10:00', icon: 'description', tone: 'info' },
              { d: '12 May',  t: '09:34', e: 'Allergy follow-up · cetirizine prescribed', icon: 'medication', tone: 'primary' },
              { d: '05 May',  t: '10:15', e: 'JRISSI self-report submitted', icon: 'psychology', tone: 'primary' },
              { d: '28 Apr',  t: '09:00', e: 'Annual health check completed', icon: 'check_circle', tone: 'success' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 36px 1fr 80px', gap: 12, alignItems: 'center', padding: '12px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
                <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{row.d}</span>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={row.icon} size={20} style={{ color: `var(--${row.tone === 'primary' ? 'primary' : row.tone})` }} />
                </div>
                <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>{row.e}</span>
                <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'right' }}>{row.t}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Personal" title="Your goals" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Progress label="Steps (10,000 / day)" value={74} tone="primary" />
            <Progress label="Sleep (7.5 h / night)" value={86} tone="success" />
            <Progress label="Mindfulness sessions · this week" value={40} tone="warning" />
            <Progress label="Hydration (2 L / day)" value={62} tone="primary" />
          </div>
          <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px dashed var(--border-2)' }}>
            <div className="type-eyebrow" style={{ marginBottom: 4 }}>Suggested · this evening</div>
            <div className="type-body-s" style={{ color: 'var(--fg-1)' }}>10-minute breathing exercise. Your stress signal is slightly elevated.</div>
            <Button kind="ghost" size="sm" icon="play_arrow" style={{ marginTop: 8 }}>Start session</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ============================================================================
// 2. APPOINTMENT SCHEDULING + QR CHECK-IN
// ============================================================================
function AppointmentScheduling() {
  const [date, setDate] = React.useState('2026-05-19');
  const [slot, setSlot] = React.useState('10:00');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Employee · book</div>
          <h1 className="type-h1">Schedule a check-in</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Pick a date and time. You\u2019ll receive a QR code to scan on arrival.</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 360px', gap: 20, alignItems: 'flex-start' }}>
        <Card padding={16}>
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Select date</div>
          <MiniCalendar value={date} onChange={setDate} marks={{
            '2026-05-19': true, '2026-05-22': true, '2026-05-26': true,
          }} />
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 14, padding: '8px 10px', borderRadius: 8, background: 'var(--bg-canvas)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--primary)' }} />
            <span className="type-caption">Marked dates have your existing bookings</span>
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow={new Date(date).toLocaleDateString('en', { weekday: 'long' })}
            title={new Date(date).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}
            action={<Select value="routine" options={[
              { value: 'routine', label: 'Routine check-in (15 min)' },
              { value: 'followup', label: 'Follow-up (20 min)' },
              { value: 'urgent', label: 'Urgent (30 min)' },
            ]} onChange={() => {}} />}
          />
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Morning</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
            {['09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:30', '11:45'].map((t, i) => {
              const taken = ['09:15', '09:45', '10:30'].includes(t);
              const sel = slot === t;
              return (
                <button key={i} disabled={taken} onClick={() => setSlot(t)} style={{
                  padding: '10px 8px', borderRadius: 8, cursor: taken ? 'not-allowed' : 'pointer',
                  border: `1px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
                  background: sel ? 'var(--primary)' : taken ? 'var(--bg-canvas)' : 'var(--surface-1)',
                  color: sel ? '#fff' : taken ? 'var(--fg-4)' : 'var(--fg-1)',
                  font: '500 13px var(--font-mono)',
                  textDecoration: taken ? 'line-through' : 'none',
                }}>{t}</button>
              );
            })}
          </div>
          <div className="type-eyebrow" style={{ marginBottom: 10 }}>Afternoon</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {['14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45'].map((t, i) => (
              <button key={i} onClick={() => setSlot(t)} style={{
                padding: '10px 8px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${slot === t ? 'var(--primary)' : 'var(--border-1)'}`,
                background: slot === t ? 'var(--primary)' : 'var(--surface-1)',
                color: slot === t ? '#fff' : 'var(--fg-1)',
                font: '500 13px var(--font-mono)',
              }}>{t}</button>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Confirm" title="Your booking" />
          <div style={{ padding: 16, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Row label="Date" value={new Date(date).toLocaleDateString('en', { weekday: 'short', month: 'short', day: 'numeric' })} />
            <Row label="Time" value={slot} />
            <Row label="Type" value="Routine · 15 min" />
            <Row label="Doctor" value="Dr. Withana" />
            <Row label="Room" value="MR-1" />
          </div>
          <Button kind="primary" icon="check" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }}>Confirm booking</Button>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px dashed var(--border-1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div className="type-eyebrow">Check-in QR · preview</div>
            <QrPlaceholder size={140} />
            <div className="type-caption" style={{ textAlign: 'center' }}>Sent to your phone after confirmation. Scan at the MRAS kiosk on arrival.</div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function QrPlaceholder({ size = 140 }) {
  // Minimal QR-ish svg for placeholder rendering
  const grid = 17;
  const cells = [];
  const seed = 'mras-qr-placeholder';
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) | 0;
  for (let y = 0; y < grid; y++) {
    for (let x = 0; x < grid; x++) {
      h = (h * 1103515245 + 12345) | 0;
      const on = (h >>> 16) % 100 < 50;
      const corner = (x < 4 && y < 4) || (x > grid - 5 && y < 4) || (x < 4 && y > grid - 5);
      cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={corner || on ? 'var(--fg-1)' : 'transparent'} />);
    }
  }
  return (
    <div style={{ background: 'var(--surface-1)', padding: 10, border: '1px solid var(--border-1)', borderRadius: 8 }}>
      <svg width={size} height={size} viewBox={`0 0 ${grid} ${grid}`}>{cells}
        {[[0, 0], [grid - 7, 0], [0, grid - 7]].map((p, i) => (
          <g key={i}>
            <rect x={p[0]} y={p[1]} width="7" height="7" fill="none" stroke="var(--fg-1)" strokeWidth="1" />
            <rect x={p[0] + 2} y={p[1] + 2} width="3" height="3" fill="var(--fg-1)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ============================================================================
// 3. KIOSK CHECK-IN (compact / large display)
// ============================================================================
function KioskCheckIn() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 24, minHeight: 600, background: 'linear-gradient(160deg, var(--teal-800) 0%, var(--teal-900) 100%)', borderRadius: 12 }}>
      <img src={(window.__resources&&window.__resources.mrasWordmark)||"assets/mras-wordmark.svg"} alt="MRAS" style={{ height: 40, filter: 'brightness(0) invert(1)', opacity: 0.92 }} />
      <div style={{ background: 'var(--surface-1)', padding: 36, borderRadius: 20, boxShadow: 'var(--shadow-3)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, maxWidth: 460, width: '100%' }}>
        <div className="type-eyebrow" style={{ color: 'var(--primary)' }}>MRAS Kiosk · Room MR-1</div>
        <div className="type-h1" style={{ textAlign: 'center' }}>Scan to check in</div>
        <QrPlaceholder size={240} />
        <div className="type-body" style={{ textAlign: 'center', maxWidth: 320 }}>
          Hold your MRAS QR code up to the camera. Your record will load on the doctor\u2019s screen automatically.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 8 }}>
          <span style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--success)', animation: 'mrasPulse 1.6s ease-in-out infinite' }} />
          <span className="type-body-s">Camera ready · waiting for scan</span>
        </div>
      </div>
      <div className="type-caption" style={{ color: 'rgba(255,255,255,0.65)' }}>No QR code? <span style={{ textDecoration: 'underline' }}>Sign in with employee ID instead</span></div>
    </div>
  );
}

Object.assign(window, { EmployeeWellness, AppointmentScheduling, KioskCheckIn, QrPlaceholder });
