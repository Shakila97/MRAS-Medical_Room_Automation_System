/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
// ============================================================================
// 1. NOTIFICATIONS CENTER (Closed-loop, with escalation timeline)
// ============================================================================
export function NotificationsCenter() {
  const [filter, setFilter] = useState('all');
  const [notifs, setNotifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/notifications/?status=open&limit=50')
      .then(res => setNotifs(res.data))
      .catch(err => console.error('Failed to load notifications:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleAck = async (id) => {
    try {
      await api.post(`/notifications/${id}/ack`);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, status: 'acked' } : n));
    } catch (e) { console.error(e); }
  };

  const toneMap = { danger: 'danger', warning: 'warning', info: 'info', success: 'success' };
  const filtered = filter === 'all' ? notifs : notifs.filter(n => n.tone === filter || n.status === filter);

  // Group by date
  const groups = [];
  const seen = new Set();
  for (const n of filtered) {
    const dateLabel = n.created_at
      ? new Date(n.created_at).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
      : 'Today';
    if (!seen.has(dateLabel)) {
      seen.add(dateLabel);
      groups.push({ label: dateLabel, items: [] });
    }
    groups.find(g => g.label === dateLabel).items.push(n);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Closed-loop · last 24 h</div>
          <h1 className="type-h1">Notifications</h1>
          <p className="type-body" style={{ marginTop: 6 }}>AI-generated interventions and system alerts, with automated escalation if not acknowledged.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="mark_email_read">Mark all read</Button>
          <Button kind="secondary" icon="settings">Preferences</Button>
        </div>
      </header>

      <Card padding={0}>
        <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border-1)', display: 'flex', gap: 4 }}>
          {[
            { v: 'all',     l: 'All',      n: notifs.length },
            { v: 'danger',  l: 'Critical', n: notifs.filter(n => n.tone === 'danger').length },
            { v: 'warning', l: 'Watch',    n: notifs.filter(n => n.tone === 'warning').length },
            { v: 'info',    l: 'Info',     n: notifs.filter(n => n.tone === 'info').length },
            { v: 'acked',   l: 'Resolved', n: notifs.filter(n => n.status === 'acked' || n.status === 'resolved').length },
          ].map(t => (
            <button key={t.v} onClick={() => setFilter(t.v)} style={{
              padding: '8px 14px', borderRadius: 8, border: 0, cursor: 'pointer',
              background: filter === t.v ? 'var(--bg-selected)' : 'transparent',
              color: filter === t.v ? 'var(--primary-hover)' : 'var(--fg-2)',
              font: filter === t.v ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {t.l}
              <span style={{ font: '500 11px var(--font-mono)', padding: '1px 6px', borderRadius: 999, background: 'var(--bg-canvas)', color: 'var(--fg-3)', border: '1px solid var(--border-1)' }}>{t.n}</span>
            </button>
          ))}
        </div>

        {loading && <div style={{ padding: 32 }}><Skeleton rows={5} /></div>}

        {!loading && groups.length === 0 && (
          <EmptyState icon="notifications_none" title="All clear" description="No open notifications right now." />
        )}

        {groups.map((g, gi) => (
          <div key={gi}>
            <div style={{ padding: '14px 20px 6px', background: 'var(--bg-canvas)' }}>
              <div className="type-eyebrow">{g.label}</div>
            </div>
            {g.items.map((it, i) => {
              const tone = it.tone || 'info';
              const icon = it.icon || (tone === 'danger' ? 'priority_high' : tone === 'warning' ? 'warning' : tone === 'success' ? 'check_circle' : 'info');
              const timeStr = it.created_at ? new Date(it.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
              const isAcked = it.status === 'acked' || it.status === 'resolved';
              return (
                <div key={it.id} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 100px', gap: 16, alignItems: 'flex-start', padding: '16px 20px', borderTop: '1px solid var(--border-1)', opacity: isAcked ? 0.6 : 1 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `var(--${tone}-bg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={icon} size={20} style={{ color: `var(--${tone})` }} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="type-label" style={{ color: 'var(--fg-1)' }}>{it.title}</span>
                      <Chip tone={tone} dot style={{ padding: '2px 8px' }}>{it.status || 'open'}</Chip>
                    </div>
                    <div className="type-body-s" style={{ marginTop: 4 }}>{it.body || it.message}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                    <span className="type-mono" style={{ fontSize: 11, color: 'var(--fg-3)' }}>{timeStr}</span>
                    {!isAcked && (
                      <Button kind="secondary" size="sm" onClick={() => handleAck(it.id)}>Acknowledge</Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ============================================================================
// 2. SETTINGS & PROFILE
// ============================================================================
export function SettingsProfile({ initialTab }) {
  const [tab, setTab] = React.useState(initialTab || 'profile');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header>
        <div className="type-eyebrow" style={{ marginBottom: 6 }}>Account</div>
        <h1 className="type-h1">Settings</h1>
        <p className="type-body" style={{ marginTop: 6 }}>Manage your profile, security, notifications, and integrations.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 20, alignItems: 'flex-start' }}>
        <Card padding={8}>
          {[
            { v: 'profile',       l: 'Profile',          i: 'person' },
            { v: 'security',      l: 'Security',         i: 'security' },
            { v: 'notifications', l: 'Notifications',    i: 'notifications' },
            { v: 'privacy',       l: 'Privacy &amp; PHI',    i: 'shield_person' },
            { v: 'integrations',  l: 'Integrations',     i: 'extension' },
            { v: 'preferences',   l: 'Preferences',      i: 'tune' },
          ].map(it => {
            const active = it.v === tab;
            return (
              <button key={it.v} onClick={() => setTab(it.v)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', border: 0,
                background: active ? 'var(--bg-selected)' : 'transparent',
                borderRadius: 8, cursor: 'pointer',
                color: active ? 'var(--primary-hover)' : 'var(--fg-2)',
                font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
                marginBottom: 2, textAlign: 'left',
              }}>
                <Icon name={it.i} size={20} style={{ color: active ? 'var(--primary)' : 'var(--fg-3)' }} />
                <span dangerouslySetInnerHTML={{ __html: it.l }} />
              </button>
            );
          })}
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {tab === 'profile' && (
            <>
              <Card>
                <CardHeader eyebrow="Profile" title="Personal details" />
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, paddingBottom: 20, borderBottom: '1px dashed var(--border-1)' }}>
                  <Avatar name="Priyanga Withana" size={72} color="var(--role-doctor)" />
                  <div>
                    <Button kind="secondary" size="sm" icon="photo_camera">Change photo</Button>
                    <div className="type-caption" style={{ marginTop: 6 }}>JPG or PNG · max 2 MB · 256×256 recommended</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <Input label="First name" value="Priyanga" onChange={() => {}} />
                  <Input label="Last name" value="Withana" onChange={() => {}} />
                  <Input label="Title" value="Dr." onChange={() => {}} />
                  <Input label="Display name" value="Dr. Withana" onChange={() => {}} hint="Shown across the app" />
                  <Input label="Email" value="p.withana@corp.lk" disabled hint="Managed by your organisation" />
                  <Input label="Phone" value="+94 77 123 4567" onChange={() => {}} />
                  <Select label="Department" value="medical" options={[
                    { value: 'medical', label: 'Medical' }, { value: 'pharm', label: 'Pharmacy' }, { value: 'hr', label: 'HR' },
                  ]} onChange={() => {}} />
                  <Select label="Time zone" value="asia-colombo" options={[
                    { value: 'asia-colombo', label: 'Asia/Colombo · UTC+05:30' },
                    { value: 'asia-singapore', label: 'Asia/Singapore · UTC+08:00' },
                  ]} onChange={() => {}} />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
                  <Button kind="ghost">Cancel</Button>
                  <Button kind="primary" icon="check">Save changes</Button>
                </div>
              </Card>

              <Card>
                <CardHeader eyebrow="Role" title="Permissions" />
                <div className="type-body-s" style={{ marginBottom: 14 }}>Your current role is <b style={{ color: 'var(--fg-1)' }}>Doctor</b>. Permission changes require an admin.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { p: 'View patient records', g: true },
                    { p: 'JRISSI deep-dive (mental health score)', g: true },
                    { p: 'Sign prescriptions', g: true },
                    { p: 'Escalate to OH psychologist', g: true },
                    { p: 'Manage pharmacy inventory', g: false },
                    { p: 'Manage users &amp; roles', g: false },
                  ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 6, background: r.g ? 'var(--bg-canvas)' : 'transparent', opacity: r.g ? 1 : 0.6 }}>
                      <Icon name={r.g ? 'check_circle' : 'remove_circle'} size={20} style={{ color: r.g ? 'var(--success)' : 'var(--fg-4)' }} />
                      <span className="type-body-s" style={{ color: 'var(--fg-1)' }} dangerouslySetInnerHTML={{ __html: r.p }} />
                    </div>
                  ))}
                </div>
              </Card>
            </>
          )}

          {tab === 'security' && <SettingsSecurity />}
          {tab === 'notifications' && <SettingsNotifications />}
          {tab === 'privacy' && <SettingsPrivacy />}
          {tab === 'integrations' && <SettingsIntegrations />}
          {tab === 'preferences' && <SettingsPreferences />}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------- Security
export function SettingsSecurity() {
  return (
    <>
      <Card>
        <CardHeader eyebrow="Security" title="Password" />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
          <div>
            <div className="type-label" style={{ color: 'var(--fg-1)' }}>Password</div>
            <div className="type-caption" style={{ marginTop: 2 }}>Last changed 47 days ago · meets policy</div>
          </div>
          <Button kind="secondary" size="sm" icon="key">Change</Button>
        </div>
      </Card>
      <Card>
        <CardHeader eyebrow="Multi-factor" title="Two-factor authentication" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { i: 'phone_iphone', t: 'Authenticator app', s: 'Google Authenticator · added 14 Apr 2026', on: true, primary: true },
            { i: 'sms', t: 'SMS to +94 77 *** 4567', s: 'Backup · used 2 times', on: true },
            { i: 'mail', t: 'Email to p.withana@corp.lk', s: 'Last resort fallback', on: false },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, border: '1px solid var(--border-1)' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: r.on ? 'var(--success-bg)' : 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={r.i} size={20} style={{ color: r.on ? 'var(--success)' : 'var(--fg-3)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span className="type-label" style={{ color: 'var(--fg-1)' }}>{r.t}</span>
                  {r.primary && <Chip tone="info" style={{ padding: '2px 8px' }}>Primary</Chip>}
                </div>
                <div className="type-caption" style={{ marginTop: 2 }}>{r.s}</div>
              </div>
              <Toggle checked={r.on} onChange={() => {}} />
            </div>
          ))}
        </div>
      </Card>
      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="type-eyebrow">Active sessions</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Where you\u2019re signed in</div>
          </div>
          <Button kind="ghost" size="sm" icon="logout">Sign out all others</Button>
        </div>
        {[
          { dev: 'MacBook Pro · Chrome 128', loc: 'Colombo, LK · 10.42.1.18', when: 'Now', current: true },
          { dev: 'iPhone 15 · MRAS app 3.0.2', loc: 'Colombo, LK · 4G', when: '2 h ago' },
          { dev: 'Workstation · Edge 130', loc: 'Medical Room · 10.42.0.4', when: 'Yesterday' },
        ].map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 100px 100px', gap: 14, alignItems: 'center', padding: '12px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
            <Icon name={s.dev.includes('iPhone') ? 'phone_iphone' : s.dev.includes('Workstation') ? 'monitor' : 'laptop_mac'} size={20} style={{ color: 'var(--fg-3)' }} />
            <span className="type-label" style={{ color: 'var(--fg-1)' }}>{s.dev}</span>
            <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{s.loc}</span>
            <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{s.when}</span>
            {s.current ? <Chip tone="success" dot>This device</Chip> : <Button kind="ghost" size="sm">Revoke</Button>}
          </div>
        ))}
      </Card>
    </>
  );
}

// ----------------------------------------------------------------- Notifications
export function SettingsNotifications() {
  const channels = ['In-app', 'Email', 'SMS', 'Push'];
  const rows = [
    { t: 'JRISSI escalation', s: 'Always on for doctors', on: [true, true, true, true], locked: true },
    { t: 'Pre-visit briefing ready', s: '15 min before consultation', on: [true, true, false, true] },
    { t: 'Forecast watch (pollen, heat, flu)', s: 'When risk crosses moderate', on: [true, true, false, false] },
    { t: 'Stock low / FEFO', s: 'Pharmacy only', on: [false, false, false, false] },
    { t: 'Audit anomalies', s: 'Admin only', on: [true, true, true, false] },
    { t: 'Weekly digest', s: 'Mondays 08:00', on: [false, true, false, false] },
  ];
  return (
    <Card padding={0}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
        <div className="type-eyebrow">Notification preferences</div>
        <div className="type-h3" style={{ marginTop: 2 }}>Channels per event</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 70px)', padding: '10px 20px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>
        <span className="type-eyebrow">Event</span>
        {channels.map((c, i) => <span key={i} className="type-eyebrow" style={{ textAlign: 'center' }}>{c}</span>)}
      </div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 70px)', alignItems: 'center', padding: '14px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="type-label" style={{ color: 'var(--fg-1)' }}>{r.t}</span>
              {r.locked && <Chip tone="neutral" style={{ padding: '2px 8px', fontSize: 11 }}>Locked</Chip>}
            </div>
            <div className="type-caption" style={{ marginTop: 2 }}>{r.s}</div>
          </div>
          {r.on.map((v, j) => (
            <div key={j} style={{ display: 'flex', justifyContent: 'center' }}>
              <Toggle checked={v} disabled={r.locked} onChange={() => {}} />
            </div>
          ))}
        </div>
      ))}
      <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-canvas)' }}>
        <span className="type-caption">Locked rows are required by clinical-safety policy.</span>
        <Button kind="primary" size="sm" icon="check">Save</Button>
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------- Privacy & PHI
export function SettingsPrivacy() {
  return (
    <>
      <Banner tone="info" title="Your data is encrypted at rest and in transit.">
        MRAS follows HIPAA-equivalent controls. PHI access is logged in the audit trail and reviewed quarterly by your compliance officer.
      </Banner>
      <Card>
        <CardHeader eyebrow="Sharing" title="Who can see what" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { t: 'JRISSI score', who: 'Doctor only', strict: true },
            { t: 'Vitals &amp; consultation history', who: 'Your doctor + occupational health' },
            { t: 'Active prescriptions', who: 'Doctor + on-site pharmacy' },
            { t: 'Aggregated wellness data', who: 'Anonymised, reported to HR quarterly' },
            { t: 'Fitness device data', who: 'You control · share with doctor toggleable' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: r.strict ? 'var(--primary-tint)' : 'var(--bg-canvas)', border: '1px solid var(--border-1)' }}>
              <Icon name={r.strict ? 'shield' : 'visibility'} size={20} style={{ color: r.strict ? 'var(--primary)' : 'var(--fg-3)' }} />
              <div style={{ flex: 1 }}>
                <div className="type-label" style={{ color: 'var(--fg-1)' }} dangerouslySetInnerHTML={{ __html: r.t }} />
                <div className="type-caption" style={{ marginTop: 2 }}>{r.who}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHeader eyebrow="Your data" title="Export &amp; deletion" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 12, border: '1px solid var(--border-1)', borderRadius: 8 }}>
            <div>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>Download all my data</div>
              <div className="type-caption" style={{ marginTop: 2 }}>JSON + PDFs · everything we hold about you</div>
            </div>
            <Button kind="secondary" size="sm" icon="download">Request</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 12, border: '1px solid var(--border-1)', borderRadius: 8 }}>
            <div>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>Delete my account</div>
              <div className="type-caption" style={{ marginTop: 2 }}>Medical records retained 7 years per regulation · personal data erased</div>
            </div>
            <Button kind="danger" size="sm">Request deletion</Button>
          </div>
        </div>
      </Card>
    </>
  );
}

// ----------------------------------------------------------------- Integrations
export function SettingsIntegrations() {
  const apps = [
    { i: 'event', name: 'Google Calendar', d: 'Sync appointments to your work calendar', on: true },
    { i: 'event_note', name: 'Outlook Calendar', d: 'Sync appointments + reminders', on: false },
    { i: 'chat', name: 'Slack', d: 'Receive escalations and digests in #medical-room', on: true },
    { i: 'forum', name: 'Microsoft Teams', d: 'Pre-visit briefings as chat cards', on: false },
    { i: 'monitor_heart', name: 'WHOOP', d: 'Sleep, recovery, strain', on: true },
    { i: 'directions_run', name: 'Garmin Health', d: 'Steps, HR, SpO₂', on: false },
    { i: 'medical_services', name: 'Fitbit', d: 'Activity, sleep, stress', on: false },
    { i: 'cloud', name: 'OpenFDA monograph sync', d: 'Daily drug data refresh · admin-managed', on: true, lock: true },
  ];
  return (
    <Card padding={0}>
      <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
        <div className="type-eyebrow">Connections</div>
        <div className="type-h3" style={{ marginTop: 2 }}>Integrations</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
        {apps.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, borderBottom: '1px solid var(--border-1)', borderRight: i % 2 === 0 ? '1px solid var(--border-1)' : 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: a.on ? 'var(--primary-tint)' : 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
              <Icon name={a.i} size={24} style={{ color: a.on ? 'var(--primary)' : 'var(--fg-3)' }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="type-label" style={{ color: 'var(--fg-1)' }}>{a.name}</span>
                {a.on && <Chip tone="success" dot style={{ padding: '2px 8px' }}>Connected</Chip>}
              </div>
              <div className="type-caption" style={{ marginTop: 2 }}>{a.d}</div>
            </div>
            {a.lock ? <Icon name="lock" size={20} style={{ color: 'var(--fg-3)' }} />
              : <Button kind={a.on ? 'ghost' : 'secondary'} size="sm">{a.on ? 'Manage' : 'Connect'}</Button>}
          </div>
        ))}
      </div>
    </Card>
  );
}

// ----------------------------------------------------------------- Preferences
export function SettingsPreferences() {
  const [theme, setTheme] = React.useState('system');
  const [density, setDensity] = React.useState('comfortable');
  return (
    <>
      <Card>
        <CardHeader eyebrow="Appearance" title="Theme" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { v: 'light', l: 'Light', bg: '#F8FAFC', fg: '#0F172A', accent: '#0F766E' },
            { v: 'dark',  l: 'Dark',  bg: '#0B1220', fg: '#E6ECF5', accent: '#2DD4BF' },
            { v: 'system', l: 'System', bg: 'linear-gradient(135deg, #F8FAFC 50%, #0B1220 50%)', fg: '#0F172A', accent: '#0F766E' },
          ].map((t, i) => {
            const sel = theme === t.v;
            return (
              <button key={i} onClick={() => setTheme(t.v)} style={{
                position: 'relative', padding: 0, cursor: 'pointer',
                border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
                borderRadius: 12, background: 'transparent', overflow: 'hidden',
                boxShadow: sel ? '0 0 0 3px var(--primary-tint)' : 'none',
              }}>
                <div style={{ height: 100, background: t.bg, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 14, left: 14, right: 14, height: 8, borderRadius: 4, background: t.fg, opacity: 0.85 }} />
                  <div style={{ position: 'absolute', top: 28, left: 14, width: '60%', height: 5, borderRadius: 3, background: t.fg, opacity: 0.45 }} />
                  <div style={{ position: 'absolute', bottom: 14, left: 14, width: 60, height: 18, borderRadius: 4, background: t.accent }} />
                  <div style={{ position: 'absolute', bottom: 14, right: 14, width: 30, height: 18, borderRadius: 4, background: t.fg, opacity: 0.2 }} />
                </div>
                <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface-1)' }}>
                  <span className="type-label" style={{ color: 'var(--fg-1)' }}>{t.l}</span>
                  {sel && <Icon name="check_circle" size={20} style={{ color: 'var(--primary)' }} />}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader eyebrow="Layout" title="Density" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { v: 'comfortable', l: 'Comfortable', s: 'Generous spacing · default' },
            { v: 'medium',      l: 'Medium',      s: 'Clinical scanning' },
            { v: 'compact',     l: 'Compact',     s: 'Power-user · max info' },
          ].map((t, i) => {
            const sel = density === t.v;
            return (
              <button key={i} onClick={() => setDensity(t.v)} style={{
                padding: 14, textAlign: 'left', cursor: 'pointer',
                border: `1.5px solid ${sel ? 'var(--primary)' : 'var(--border-1)'}`,
                borderRadius: 10, background: sel ? 'var(--primary-tint)' : 'var(--surface-1)',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span className="type-label" style={{ color: 'var(--fg-1)' }}>{t.l}</span>
                  {sel && <Icon name="check_circle" size={20} style={{ color: 'var(--primary)', fontSize: 16 }} />}
                </div>
                <span className="type-caption">{t.s}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader eyebrow="Region" title="Language &amp; format" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Select label="Language" value="en-LK" options={[
            { value: 'en-LK', label: 'English (Sri Lanka)' },
            { value: 'si-LK', label: 'Sinhala' },
            { value: 'ta-LK', label: 'Tamil' },
          ]} onChange={() => {}} />
          <Select label="Date format" value="ddmmyyyy" options={[
            { value: 'ddmmyyyy', label: '14 May 2026' },
            { value: 'mmddyyyy', label: 'May 14, 2026' },
            { value: 'iso',      label: '2026-05-14' },
          ]} onChange={() => {}} />
          <Select label="Time format" value="24" options={[
            { value: '24', label: '24-hour · 14:30' },
            { value: '12', label: '12-hour · 2:30 PM' },
          ]} onChange={() => {}} />
          <Select label="First day of week" value="mon" options={[
            { value: 'mon', label: 'Monday' },
            { value: 'sun', label: 'Sunday' },
          ]} onChange={() => {}} />
        </div>
      </Card>

      <Card>
        <CardHeader eyebrow="Accessibility" title="Display options" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Toggle checked label="Reduce motion (disables animation easing transitions)" onChange={() => {}} />
          <Toggle checked={false} label="High-contrast borders" onChange={() => {}} />
          <Toggle checked={false} label="Larger touch targets (44 px minimum)" onChange={() => {}} />
          <Toggle checked label="Underline links" onChange={() => {}} />
        </div>
      </Card>
    </>
  );
}

export const SettingsScreenWith = ({ tab }) => <SettingsProfile initialTab={tab} />;

