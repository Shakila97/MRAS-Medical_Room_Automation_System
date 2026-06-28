/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
import { api } from '../api/client';

export function EmployeeHome({ onCheckIn }) {
  const [checkedIn, setCheckedIn] = useState(false);
  
  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState(null);
  const [wellness, setWellness] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [patRes, welRes, apptRes, rxRes] = await Promise.all([
          api.get('/patients/me'),
          api.get('/me/wellness'),
          api.get('/appointments/me'),
          api.get('/prescriptions/me')
        ]);
        setPatient(patRes.data);
        setWellness(welRes.data);
        setAppointments(apptRes.data);
        setPrescriptions(rxRes.data);
      } catch (e) {
        console.error("Failed to load dashboard data:", e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCheckIn = async () => {
    if (!nextAppt) return alert("No upcoming appointments to check in for.");
    if (!nextAppt.qr_token) return alert("Appointment does not have a valid QR token generated yet.");
    try {
      await api.post('/checkin', { qr_token: nextAppt.qr_token });
      setCheckedIn(true);
    } catch (e) {
      console.error(e);
      alert("Check-in failed. " + (e.response?.data?.detail || ""));
    }
  };

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  const nextAppt = appointments.find(a => new Date(a.scheduled_at) > new Date() && a.status !== 'CANCELLED');

  if (loading) return <div style={{ padding: 20 }}>Loading dashboard...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1100, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>{today}</div>
          <h1 className="type-h1">Hi, {patient?.full_name?.split(' ')[0] || 'there'}.</h1>
          {nextAppt ? (
            <p className="type-body" style={{ marginTop: 6 }}>
              Your next consultation is on {new Date(nextAppt.scheduled_at).toLocaleDateString('en-GB', { weekday: 'long' })} at {new Date(nextAppt.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}.
            </p>
          ) : (
            <p className="type-body" style={{ marginTop: 6 }}>You have no upcoming consultations.</p>
          )}
        </div>
        <Button kind="primary" icon="qr_code_2" size="lg" onClick={handleCheckIn}>
          {checkedIn ? 'Checked in' : 'Check in (Simulate Scan)'}
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
            {wellness?.metrics?.length > 0 ? wellness.metrics.map((m, i) => (
              <div key={i} style={{ borderRight: i < wellness.metrics.length - 1 ? '1px solid var(--border-1)' : 0 }}>
                <StatTile icon={m.key === 'hr' ? 'ecg_heart' : m.key === 'spo2' ? 'air' : m.key === 'steps' ? 'directions_walk' : 'bedtime'} 
                          label={m.label} value={m.value} unit={m.unit} delta={m.trend} />
              </div>
            )) : (
              <div style={{ padding: 20, gridColumn: 'span 4', textAlign: 'center', color: 'var(--fg-3)' }}>No vitals data available.</div>
            )}
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
          {appointments.filter(a => a.status !== 'COMPLETED').length > 0 ? appointments.filter(a => a.status !== 'COMPLETED').map((c, i) => (
            <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
              <div>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>Dr. ID: {c.doctor_id}</div>
                <div className="type-caption" style={{ marginTop: 2 }}>{c.notes || 'Consultation'}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="type-body-s" style={{ color: 'var(--fg-1)' }}>
                  {new Date(c.scheduled_at).toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })} · {new Date(c.scheduled_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </div>
                <a href="#" style={{ font: '500 12px var(--font-sans)', color: 'var(--primary)', textDecoration: 'none' }}>Reschedule</a>
              </div>
            </div>
          )) : (
            <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--fg-3)' }}>No upcoming consultations.</div>
          )}
        </Card>

        <Card>
          <CardHeader eyebrow="Active prescriptions" title="Medicines" />
          {prescriptions.length > 0 ? prescriptions.map((m, i) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="pill" size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>Prescription #{m.id}</div>
                <div className="type-caption" style={{ marginTop: 2 }}>Valid until: {new Date(m.valid_until).toLocaleDateString('en-GB')}</div>
              </div>
            </div>
          )) : (
            <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--fg-3)' }}>No active prescriptions.</div>
          )}
        </Card>
      </div>
    </div>
  );
}


