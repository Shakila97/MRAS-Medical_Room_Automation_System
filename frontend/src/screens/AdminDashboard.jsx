/* eslint-disable */
// Admin dashboard — system health, users, audit log, no PHI / no JRISSI

function AdminDashboard() {
  const users = [
    { name: 'Dr. W.I.L. Withana',    role: 'Doctor',   dept: 'Clinical',     status: 'active', last: '2 min',  accent: 'var(--role-doctor)' },
    { name: 'Dr. C. Jeewan',          role: 'Doctor',   dept: 'Clinical',     status: 'active', last: '14 min', accent: 'var(--role-doctor)' },
    { name: 'L. Koralage',            role: 'Pharmacy', dept: 'Pharmacy',     status: 'active', last: '1 min',  accent: 'var(--role-pharmacy)' },
    { name: 'D. Anuradha',            role: 'Admin',    dept: 'Administration', status: 'active', last: 'now',  accent: 'var(--role-admin)' },
    { name: 'P. Jayasinghe',          role: 'Employee', dept: 'Operations',   status: 'active', last: '38 min', accent: 'var(--role-employee)' },
    { name: 'S. Fernando',            role: 'Employee', dept: 'HR',           status: 'invited', last: '—',     accent: 'var(--role-employee)' },
  ];

  const audit = [
    { t: '09:48', who: 'system',          action: 'Auto-escalation triggered',          target: 'E-002417 · JRISSI 14 d', tone: 'warning', icon: 'priority_high' },
    { t: '09:42', who: 'Dr. Withana',     action: 'Viewed patient record',              target: 'E-002417',               tone: 'info',    icon: 'visibility' },
    { t: '09:31', who: 'L. Koralage',     action: 'Dispensed prescription',             target: 'Rx-9421 · Cetirizine',   tone: 'info',    icon: 'pill' },
    { t: '09:14', who: 'system',          action: 'Daily OpenFDA sync complete',        target: '2 monographs ingested',  tone: 'info',    icon: 'sync' },
    { t: '08:56', who: 'B.W.S.S. Naw…',   action: 'Employee check-in',                  target: 'QR · medical room',      tone: 'info',    icon: 'qr_code_2' },
    { t: '08:00', who: 'system',          action: 'Forecast batch run · pollen',        target: '3 employees flagged',    tone: 'info',    icon: 'insights' },
    { t: '07:45', who: 'admin',           action: 'Role updated · Pharmacy → Lead',     target: 'L. Koralage',            tone: 'warning', icon: 'admin_panel_settings' },
    { t: 'Wed',   who: 'system',          action: 'Failed login throttled · 5 attempts', target: 'IP 10.0.2.41',          tone: 'danger',  icon: 'lock' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Thursday · 14 May 2026</div>
          <h1 className="type-h1">Admin console</h1>
          <p className="type-body" style={{ marginTop: 6 }}>All services healthy. 1 security event in the last 24 h. No PHI or JRISSI data is visible from this role.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="download">Export audit log</Button>
          <Button kind="primary" icon="person_add">Invite user</Button>
        </div>
      </header>

      <Banner tone="info" icon="verified_user" title="PHI shielded.">
        Admin role does not have access to patient records, vital signs, prescriptions, or JRISSI mental-health scores. Aggregate counts only.
      </Banner>

      {/* System health */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {[
            { icon: 'group',            label: 'Active users',     value: '1,284', delta: '+6 this week', deltaTone: 'good' },
            { icon: 'shield_person',    label: 'Roles assigned',   value: '1,284 / 1,284' },
            { icon: 'cloud_done',       label: 'Service uptime',   value: '99.97', unit: '%',   delta: 'SLA 99.9%', deltaTone: 'good' },
            { icon: 'database',         label: 'DB latency p95',   value: '42',   unit: 'ms' },
            { icon: 'security',         label: 'Security events',  value: '1',    delta: '24 h window', deltaTone: 'neutral' },
          ].map((s, i) => (
            <div key={i} style={{ borderRight: i < 4 ? '1px solid var(--border-1)' : 0 }}>
              <StatTile {...s} />
            </div>
          ))}
        </div>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader eyebrow="Backing services" title="Status" action={<Chip tone="success" dot>All systems normal</Chip>} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { name: 'FastAPI backend',     state: 'up', meta: 'v3.0.4 · ECS' },
            { name: 'PostgreSQL · Timescale', state: 'up', meta: 'p95 42 ms' },
            { name: 'Claude API',          state: 'up', meta: 'sonnet-4-6' },
            { name: 'OpenWeatherMap',      state: 'degraded', meta: '1 retry/h' },
            { name: 'Twilio WhatsApp',     state: 'up', meta: '99.99%' },
            { name: 'SendGrid email',      state: 'up', meta: '99.97%' },
            { name: 'OpenFDA monographs',  state: 'up', meta: 'last sync 09:14' },
            { name: 'Tomorrow.io (fallback)', state: 'idle', meta: 'standby' },
          ].map((s, i) => {
            const tone = s.state === 'up' ? 'low' : s.state === 'degraded' ? 'moderate' : 'neutral';
            const label = s.state === 'up' ? 'Up' : s.state === 'degraded' ? 'Degraded' : 'Idle';
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: '1px solid var(--border-1)', borderRadius: 10, background: 'var(--bg-canvas)' }}>
                <Chip tone={tone} dot style={{ padding: '2px 8px' }}>{label}</Chip>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div className="type-caption">{s.meta}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* User list */}
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="type-eyebrow">User management</div>
              <div className="type-h3" style={{ marginTop: 2 }}>Recent activity</div>
            </div>
            <Button kind="ghost" size="sm" icon="open_in_new">All users</Button>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '40px 1.6fr 1fr 1fr 0.7fr',
            gap: 12, padding: '10px 20px',
            background: 'var(--bg-canvas)',
            borderBottom: '1px solid var(--border-1)',
            font: '600 11px var(--font-sans)', color: 'var(--fg-3)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            <div></div><div>Name</div><div>Role</div><div>Department</div><div>Last seen</div>
          </div>
          {users.map((u, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '40px 1.6fr 1fr 1fr 0.7fr',
              gap: 12, alignItems: 'center',
              padding: '12px 20px',
              borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
            }}>
              <Avatar name={u.name} size={32} color={u.accent} />
              <div>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{u.name}</div>
                {u.status === 'invited' && <div className="type-caption" style={{ color: 'var(--warning-fg)' }}>Invite pending</div>}
              </div>
              <Chip tone="neutral" style={{ width: 'fit-content', padding: '2px 8px' }}>{u.role}</Chip>
              <div className="type-body-s">{u.dept}</div>
              <div className="type-mono" style={{ color: 'var(--fg-3)' }}>{u.last}</div>
            </div>
          ))}
        </Card>

        {/* Role distribution */}
        <Card>
          <CardHeader eyebrow="RBAC" title="Role distribution" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
            {[
              { name: 'Employee',  count: 1248, pct: 97.2, color: 'var(--role-employee)' },
              { name: 'Doctor',    count: 12,   pct: 0.9,  color: 'var(--role-doctor)' },
              { name: 'Pharmacy',  count: 18,   pct: 1.4,  color: 'var(--role-pharmacy)' },
              { name: 'Admin',     count: 6,    pct: 0.5,  color: 'var(--role-admin)' },
            ].map((r, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: r.color }} />
                    <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>{r.name}</span>
                  </div>
                  <span className="type-mono" style={{ color: 'var(--fg-2)' }}>{r.count.toLocaleString()} · {r.pct}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--slate-100)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`, background: r.color, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px dashed var(--border-1)' }}>
            <div className="type-eyebrow" style={{ marginBottom: 10 }}>Notable counts</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={{ padding: 10, border: '1px solid var(--border-1)', borderRadius: 8, background: 'var(--bg-canvas)' }}>
                <div className="type-caption">Pending invites</div>
                <div style={{ font: '500 18px var(--font-mono)', color: 'var(--fg-1)' }}>3</div>
              </div>
              <div style={{ padding: 10, border: '1px solid var(--border-1)', borderRadius: 8, background: 'var(--bg-canvas)' }}>
                <div className="type-caption">MFA enrolled</div>
                <div style={{ font: '500 18px var(--font-mono)', color: 'var(--fg-1)' }}>94%</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit log */}
      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="type-eyebrow">Compliance</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Audit log</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip tone="info" dot>System</Chip>
            <Chip tone="warning" dot>Privileged</Chip>
            <Chip tone="danger" dot>Security</Chip>
          </div>
        </div>
        {audit.map((a, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '70px 32px 1.4fr 1fr 100px',
            gap: 12, alignItems: 'center',
            padding: '10px 20px',
            borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
          }}>
            <span className="type-mono" style={{ color: 'var(--fg-3)' }}>{a.t}</span>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={a.icon} size={20} style={{
                color: a.tone === 'danger' ? 'var(--danger)' : a.tone === 'warning' ? 'var(--warning)' : 'var(--primary)',
              }} />
            </div>
            <div>
              <div className="type-label" style={{ color: 'var(--fg-1)' }}>{a.action}</div>
              <div className="type-caption">by {a.who}</div>
            </div>
            <div className="type-mono" style={{ color: 'var(--fg-2)' }}>{a.target}</div>
            <Chip tone={a.tone === 'danger' ? 'danger' : a.tone === 'warning' ? 'warning' : 'info'} dot style={{ padding: '2px 8px' }}>
              {a.tone === 'danger' ? 'Security' : a.tone === 'warning' ? 'Privileged' : 'System'}
            </Chip>
          </div>
        ))}
      </Card>
    </div>
  );
}

Object.assign(window, { AdminDashboard });
