import React, { useEffect, useState } from 'react';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
import { api } from '../api/client';

// ============================================================================
// 1. WELLNESS HOME (timeline + your health)
// ============================================================================
export function EmployeeWellness() {
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [wellness, setWellness] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [patRes, welRes, apptRes] = await Promise.all([
          api.get('/patients/me'),
          api.get('/me/wellness'),
          api.get('/appointments/me')
        ]);
        setPatient(patRes.data);
        setWellness(welRes.data);
        setAppointments(apptRes.data);
      } catch (e) {
        console.error("Failed to load wellness data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  const nextAppt = appointments.find(a => new Date(a.scheduled_at) > new Date() && a.status !== 'CANCELLED');
  const weekLbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  if (loading) return <div style={{ padding: 20 }}>Loading wellness...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>{today}</div>
          <h1 className="type-h1">Good morning, {patient?.full_name?.split(' ')[0] || 'there'}.</h1>
          {nextAppt ? (
            <p className="type-body" style={{ marginTop: 6 }}>
              You’re trending well. Your next check-in is on {new Date(nextAppt.scheduled_at).toLocaleDateString('en-GB', { weekday: 'long' })} at {new Date(nextAppt.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.
            </p>
          ) : (
            <p className="type-body" style={{ marginTop: 6 }}>You’re trending well. You have no upcoming check-ins.</p>
          )}
        </div>
        <Button kind="primary" icon="qr_code_2">Open my QR</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="This week" title="Wellness score"
            action={<Chip tone="success" dot>Trending up</Chip>} />
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginBottom: 12 }}>
            <div className="type-clinical" style={{ fontSize: 48, lineHeight: 1 }}>{wellness?.score || 72}</div>
            <div className="type-body-s" style={{ paddingBottom: 6 }}>
              <span style={{ color: wellness?.score_delta >= 0 ? 'var(--success-fg)' : 'var(--danger-fg)' }}>
                {wellness?.score_delta >= 0 ? '↑' : '↓'} {Math.abs(wellness?.score_delta || 0)}
              </span> vs last week
            </div>
          </div>
          <BarChart data={wellness?.series || [72, 72, 72, 72, 72, 72, 72]} labels={weekLbls} width={520} height={130} color="var(--success)" max={100} />
        </Card>

        <Card>
          <CardHeader eyebrow="Next" title="Appointment" />
          {nextAppt ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, background: 'var(--primary)', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                  <span style={{ font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.85 }}>{new Date(nextAppt.scheduled_at).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span style={{ font: '700 22px var(--font-sans)', lineHeight: 1 }}>{new Date(nextAppt.scheduled_at).getDate()}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{nextAppt.notes || 'Routine check-in'}</div>
                  <div className="type-caption" style={{ marginTop: 2 }}>{new Date(nextAppt.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} · {nextAppt.duration_minutes || 15} min · Dr. {nextAppt.doctor_id}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Button kind="secondary" size="sm" icon="event_repeat" style={{ flex: 1 }}>Reschedule</Button>
                <Button kind="ghost" size="sm" icon="add_alert" style={{ flex: 1 }}>Add reminder</Button>
              </div>
            </>
          ) : (
            <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--fg-3)' }}>No upcoming appointments.</div>
          )}
          <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: 'var(--info-bg)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Icon name="info" size={20} style={{ color: 'var(--info)', marginTop: 1 }} />
            <div className="type-body-s" style={{ color: 'var(--info-fg)' }}>Your doctor has prepared a pre-visit briefing. You\u2019ll see it the morning of the visit.</div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {wellness?.metrics?.length > 0 ? wellness.metrics.map((m, i) => {
          const icon = m.key === 'hr' ? 'monitor_heart' : m.key === 'spo2' ? 'air' : m.key === 'steps' ? 'directions_run' : 'bedtime';
          const color = m.key === 'hr' ? 'var(--success)' : m.key === 'spo2' ? 'var(--success)' : m.key === 'steps' ? 'var(--info)' : 'var(--primary)';
          // Generate simulated recent data array based on the current value for the sparkline
          const sparkData = [m.value * 0.9, m.value, m.value * 1.05, m.value * 0.95, m.value * 1.02, m.value * 0.98, m.value];
          return (
            <Card key={i} dense>
              <div className="type-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Icon name={icon} size={20} style={{ color: 'var(--primary)', fontSize: 16 }} />
                {m.label}
              </div>
              <div className="type-clinical" style={{ fontSize: 22, marginBottom: 6 }}>{m.value}<span style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)', marginLeft: 3 }}>{m.unit}</span></div>
              <Sparkline data={sparkData} width={200} height={32} color={color} />
            </Card>
          );
        }) : (
          <div style={{ gridColumn: 'span 4', textAlign: 'center', color: 'var(--fg-3)', padding: 20 }}>No vitals data available.</div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
            <div className="type-eyebrow">Activity</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Your timeline</div>
          </div>
          <div>
            {appointments.length > 0 ? (
              appointments.slice(0, 6).map((appt, i) => {
                const isPast = new Date(appt.scheduled_at) < new Date();
                const icon = appt.status === 'CANCELLED' ? 'cancel' : isPast ? 'check_circle' : 'event';
                const tone = appt.status === 'CANCELLED' ? 'danger' : isPast ? 'success' : 'info';
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 36px 1fr 80px', gap: 12, alignItems: 'center', padding: '12px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
                    <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>
                      {new Date(appt.scheduled_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </span>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={icon} size={20} style={{ color: `var(--${tone})` }} />
                    </div>
                    <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>
                      {appt.notes || 'Routine check-in'} · {appt.status?.charAt(0) + appt.status?.slice(1).toLowerCase()}
                    </span>
                    <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)', textAlign: 'right' }}>
                      {new Date(appt.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            ) : (
              <div style={{ padding: '24px 20px', textAlign: 'center', color: 'var(--fg-3)' }}>No activity yet.</div>
            )}
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

// ============================================================================
// 1b. DAILY HEALTH CHECK-IN
// ============================================================================
export function DailyCheckIn() {
  const [form, setForm] = useState({ heart_rate: '', spo2: '', temperature: '', steps: '', sleep_hours: '', mood: 3 });
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {};
      if (form.heart_rate)   payload.heart_rate   = parseInt(form.heart_rate);
      if (form.spo2)         payload.spo2         = parseFloat(form.spo2);
      if (form.temperature)  payload.temperature  = parseFloat(form.temperature);
      if (form.steps)        payload.steps        = parseInt(form.steps);
      if (form.sleep_hours)  payload.sleep_hours  = parseFloat(form.sleep_hours);
      payload.mood = form.mood;
      await api.post('/me/vitals', payload);
      setDone(true);
    } catch (err) {
      console.error(err);
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const moods = [
    { v: 1, icon: 'sentiment_very_dissatisfied', label: 'Very low' },
    { v: 2, icon: 'sentiment_dissatisfied',      label: 'Low' },
    { v: 3, icon: 'sentiment_neutral',           label: 'Okay' },
    { v: 4, icon: 'sentiment_satisfied',         label: 'Good' },
    { v: 5, icon: 'sentiment_very_satisfied',    label: 'Great' },
  ];

  if (done) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 48 }}>
      <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="check" size={32} style={{ color: 'var(--success)' }} />
      </div>
      <h1 className="type-h1">Check-in saved!</h1>
      <p className="type-body" style={{ textAlign: 'center', maxWidth: 360 }}>
        Your health data has been recorded. Your wellness score will be updated shortly.
      </p>
      <Button kind="secondary" onClick={() => { setDone(false); setForm({ heart_rate: '', spo2: '', temperature: '', steps: '', sleep_hours: '', mood: 3 }); }}>
        Log another reading
      </Button>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header>
        <div className="type-eyebrow" style={{ marginBottom: 6 }}>Employee · self-report</div>
        <h1 className="type-h1">Daily health check-in</h1>
        <p className="type-body" style={{ marginTop: 6 }}>Log your vitals for today. All fields are optional — submit whatever you have.</p>
      </header>
      {error && <Banner tone="danger" title="Submission error">{error}</Banner>}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Vitals" title="Today's readings" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Input label="Heart Rate (bpm)" value={form.heart_rate} onChange={set('heart_rate')} placeholder="e.g. 72" />
            <Input label="SpO₂ (%)" value={form.spo2} onChange={set('spo2')} placeholder="e.g. 98" />
            <Input label="Temperature (°C)" value={form.temperature} onChange={set('temperature')} placeholder="e.g. 36.8" />
            <Input label="Steps today" value={form.steps} onChange={set('steps')} placeholder="e.g. 8500" />
            <Input label="Sleep last night (hours)" value={form.sleep_hours} onChange={set('sleep_hours')} placeholder="e.g. 7.5" />
          </div>
        </Card>
        <Card>
          <CardHeader eyebrow="Mood" title="How are you feeling?" />
          <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0' }}>
            {moods.map(m => (
              <button key={m.v} onClick={() => set('mood')(m.v)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '14px 12px',
                borderRadius: 12, border: `2px solid ${form.mood === m.v ? 'var(--primary)' : 'var(--border-1)'}`,
                background: form.mood === m.v ? 'var(--primary-tint)' : 'transparent',
                cursor: 'pointer', transition: 'all var(--dur-micro) var(--ease-std)',
              }}>
                <Icon name={m.icon} size={32} style={{ color: form.mood === m.v ? 'var(--primary)' : 'var(--fg-3)' }} />
                <span style={{ font: '500 11px var(--font-sans)', color: form.mood === m.v ? 'var(--primary)' : 'var(--fg-3)' }}>{m.label}</span>
              </button>
            ))}
          </div>
          <div style={{ marginTop: 12, paddingTop: 14, borderTop: '1px dashed var(--border-1)' }}>
            <div className="type-caption" style={{ marginBottom: 14, color: 'var(--fg-3)' }}>
              Data is only visible to your assigned doctor.
            </div>
            <Button kind="primary" icon="check_circle" style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleSubmit} disabled={saving}>
              {saving ? 'Saving...' : 'Submit check-in'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AppointmentScheduling() {

  const [date, setDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [slot, setSlot] = React.useState('10:00');
  const [loading, setLoading] = React.useState(false);
  const [successAppt, setSuccessAppt] = React.useState(null);

  const handleBook = async () => {
    setLoading(true);
    try {
      // Create a datetime for the scheduled slot
      const scheduledAt = new Date(`${date}T${slot}:00`).toISOString();
      const res = await api.post('/appointments', {
        doctor_id: '6a5cc6d0f5cd542744e4b924', // Hardcoded valid ObjectId for now
        scheduled_at: scheduledAt,
        duration_minutes: 15,
        notes: "Routine check-in"
      });
      setSuccessAppt(res.data);
      // Wait to simulate loading, then show toast (or just rely on state)
    } catch (e) {
      console.error(e);
      alert("Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  if (successAppt) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', paddingTop: 40 }}>
        <div style={{ width: 64, height: 64, borderRadius: 32, background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
          <Icon name="check" size={32} />
        </div>
        <h1 className="type-h1">Booking confirmed</h1>
        <p className="type-body" style={{ textAlign: 'center', maxWidth: 400 }}>
          Your appointment is confirmed for {new Date(successAppt.scheduled_at).toLocaleDateString('en-GB')} at {new Date(successAppt.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.
        </p>
        <Card style={{ marginTop: 20, width: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 30 }}>
          <div className="type-eyebrow" style={{ marginBottom: 20 }}>Your check-in QR code</div>
          <QrPlaceholder size={180} />
          <div className="type-caption" style={{ textAlign: 'center', marginTop: 20 }}>
            Scan this code at the MRAS kiosk when you arrive.
          </div>
        </Card>
        <Button kind="secondary" style={{ marginTop: 20 }} onClick={() => setSuccessAppt(null)}>Book another</Button>
      </div>
    );
  }

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
          <Button kind="primary" icon="check" style={{ marginTop: 14, width: '100%', justifyContent: 'center' }} onClick={handleBook} disabled={loading}>
            {loading ? 'Booking...' : 'Confirm booking'}
          </Button>
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

export function QrPlaceholder({ size = 140 }) {
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
export function KioskCheckIn() {
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

const Row = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span className="type-body-s" style={{ color: 'var(--fg-3)' }}>{label}</span>
    <span className="type-body" style={{ fontWeight: 500, color: 'var(--fg-1)' }}>{value}</span>
  </div>
);


