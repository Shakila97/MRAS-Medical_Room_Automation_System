/* eslint-disable */
// Employee check-in / personal health view

function EmployeeHome({ onCheckIn }) {
  const [checkedIn, setCheckedIn] = React.useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Thursday · 14 May 2026</div>
          <h1 className="type-h1">Hi, Sandun.</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Your next consultation is on Friday at 10:15 with Dr. Withana.</p>
        </div>
        <Button kind="primary" icon="qr_code_2" size="lg" onClick={() => setCheckedIn(true)}>
          {checkedIn ? 'Checked in' : 'Check in'}
        </Button>
      </header>

      {checkedIn && (
        <Banner tone="success" title="Checked in.">
          Your pre-visit briefing is being prepared for Dr. Withana. You can leave the medical room — we'll notify you when it's your turn.
        </Banner>
      )}

      {/* Today */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Today's snapshot" title="How you're tracking" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '1px solid var(--border-1)', borderRadius: 10, overflow: 'hidden' }}>
            {[
              { icon: 'bedtime',        label: 'Sleep',   value: '6.4', unit: 'h',  delta: 'Below target' },
              { icon: 'directions_walk', label: 'Steps',  value: '4,210', unit: '', delta: '52% of 8k goal' },
              { icon: 'ecg_heart',      label: 'Resting HR', value: '68', unit: 'bpm', delta: 'Normal' },
              { icon: 'self_improvement', label: 'Mood',  value: '3', unit: '/ 5', delta: 'Steady' },
            ].map((s, i) => (
              <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--border-1)' : 0 }}>
                <StatTile {...s} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader eyebrow="Daily log" title="How are you feeling today?" />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {['terrible', 'poor', 'okay', 'good', 'great'].map((m, i) => (
              <button key={m} style={{
                flex: 1, border: '1px solid var(--border-2)', background: 'var(--surface-1)',
                borderRadius: 10, padding: '10px 0', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                color: 'var(--fg-2)', font: '500 11px var(--font-sans)',
              }}>
                <Icon name={['sentiment_very_dissatisfied','sentiment_dissatisfied','sentiment_neutral','sentiment_satisfied','sentiment_very_satisfied'][i]} size={20} style={{ color: 'var(--fg-3)' }} />
                <span style={{ textTransform: 'capitalize' }}>{m}</span>
              </button>
            ))}
          </div>
          <Button kind="secondary" icon="edit_note" style={{ width: '100%' }}>Add a note (optional)</Button>
        </Card>
      </div>

      {/* Notifications + upcoming */}
      <Card>
        <CardHeader eyebrow="From your medical team" title="Notifications" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Banner tone="info" icon="cloud" title="Pollen forecast rising Thursday.">
            Take your prescribed antihistamine before leaving home. Set as reminder?
          </Banner>
          <Banner tone="warning" icon="bedtime" title="Sleep trending low.">
            Your average is 5.9 h over the last 7 days. Try winding down 30 minutes earlier tonight.
          </Banner>
          <Banner tone="success" icon="celebration" title="14-day walking streak.">
            Keep going — you're 3 days from a personal best.
          </Banner>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Upcoming" title="Consultations" />
          {[
            { d: 'Fri 15 May · 10:15', who: 'Dr. Withana', sub: 'BP review · in-person' },
            { d: 'Wed 03 Jun · 11:00', who: 'Dr. Fernando', sub: 'Annual check-up' },
          ].map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
              <div>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{c.who}</div>
                <div className="type-caption" style={{ marginTop: 2 }}>{c.sub}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="type-body-s" style={{ color: 'var(--fg-1)' }}>{c.d}</div>
                <a href="#" style={{ font: '500 12px var(--font-sans)', color: 'var(--primary)', textDecoration: 'none' }}>Reschedule</a>
              </div>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader eyebrow="Active prescriptions" title="Medicines" />
          {[
            { n: 'Cetirizine 10 mg', sub: '1 tab · before bed · until 19 May', icon: 'pill' },
            { n: 'Amlodipine 5 mg', sub: '1 tab · morning · ongoing', icon: 'vaccines' },
          ].map((m, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={m.icon} size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{m.n}</div>
                <div className="type-caption" style={{ marginTop: 2 }}>{m.sub}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

Object.assign(window, { EmployeeHome });
