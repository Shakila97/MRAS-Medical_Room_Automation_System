/* eslint-disable */
import React from 'react';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
import { api } from '../api/client';

// ============================================================================
// 1. USERS & ROLES
// ============================================================================
export function AdminUsers() {
  const [users, setUsers] = React.useState([]);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/admin/users/stats');
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users?active_only=false');
      setUsers(res.data.map(u => ({
        name: u.full_name,
        email: u.email,
        role: u.role === 'pharmacy_staff' ? 'Pharmacy' : u.role.charAt(0).toUpperCase() + u.role.slice(1),
        status: u.is_active ? 'Active' : 'Suspended',
        last: u.last_login ? new Date(u.last_login).toLocaleDateString() : 'Never',
        perms: u.role === 'admin' ? ['All'] : ['Standard']
      })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    const email = window.prompt("Enter new user email:");
    if (!email) return;
    const fullName = window.prompt("Enter full name:");
    if (!fullName) return;
    const role = window.prompt("Enter role (employee, doctor, pharmacy, admin):", "employee");
    
    try {
      await api.post('/admin/users', { email, full_name: fullName, role: role.toLowerCase() });
      alert("User invited!");
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Failed to invite user");
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Admin · console</div>
          <h1 className="type-h1">Users &amp; roles</h1>
          <p className="type-body" style={{ marginTop: 6 }}>
            {stats ? `${stats.employees.total} employees · ${stats.doctors.total + stats.pharmacy.total} staff · ${stats.admins.total} admins · SSO via corporate OIDC.` : "Loading..."}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="upload_file">Bulk import</Button>
          <Button kind="secondary" icon="key">Manage roles</Button>
          <Button kind="primary" icon="person_add" onClick={handleInvite}>Invite user</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'Doctors',   v: stats?.doctors?.total || '-',     d: stats?.doctors?.subtitle || '-' },
          { l: 'Pharmacy',  v: stats?.pharmacy?.total || '-',    d: stats?.pharmacy?.subtitle || '-' },
          { l: 'Employees', v: stats?.employees?.total || '-',   d: stats?.employees?.subtitle || '-' },
          { l: 'Admins',    v: stats?.admins?.total || '-',      d: stats?.admins?.subtitle || '-' },
        ].map((s, i) => (
          <Card key={i} dense>
            <div className="type-eyebrow" style={{ marginBottom: 4 }}>{s.l}</div>
            <div className="type-clinical" style={{ fontSize: 26 }}>{s.v}</div>
            <div className="type-caption" style={{ marginTop: 2 }}>{s.d}</div>
          </Card>
        ))}
      </div>

      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Input value="" placeholder="Search users…" leading="search" style={{ flex: 1 }} onChange={() => {}} />
          <Select value="all" options={[
            { value: 'all', label: 'All roles' }, { value: 'doctor', label: 'Doctors' },
            { value: 'pharmacy', label: 'Pharmacy' }, { value: 'employee', label: 'Employees' }, { value: 'admin', label: 'Admins' },
          ]} onChange={() => {}} style={{ width: 160 }} />
          <Select value="active" options={[
            { value: 'active', label: 'Active' }, { value: 'pending', label: 'Pending' }, { value: 'suspended', label: 'Suspended' }, { value: 'all', label: 'All' },
          ]} onChange={() => {}} style={{ width: 140 }} />
        </div>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              {['', 'Name', 'Email', 'Role', 'Permissions', 'Status', 'Last active', ''].map((h, i) => (
                <th key={i} style={{ font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--fg-3)', padding: '12px 16px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)', textAlign: 'left' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td style={{ ...tdAdm, width: 40 }}><Checkbox checked={false} onChange={() => {}} /></td>
                <td style={tdAdm}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar name={u.name} size={28} color={{
                      'Doctor': 'var(--role-doctor)', 'Employee': 'var(--role-employee)', 'Pharmacy': 'var(--role-pharmacy)', 'Admin': 'var(--role-admin)'
                    }[u.role] || 'var(--role-employee)'} />
                    <span className="type-label" style={{ color: 'var(--fg-1)' }}>{u.name}</span>
                  </div>
                </td>
                <td style={tdAdm}><span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{u.email}</span></td>
                <td style={tdAdm}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: {
                      'Doctor': 'var(--role-doctor)', 'Employee': 'var(--role-employee)', 'Pharmacy': 'var(--role-pharmacy)', 'Admin': 'var(--role-admin)'
                    }[u.role] || 'var(--role-employee)' }} />
                    {u.role}
                  </span>
                </td>
                <td style={tdAdm}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {u.perms.map((p, j) => <Chip key={j} tone="neutral" style={{ fontSize: 11, padding: '2px 8px' }}>{p}</Chip>)}
                  </div>
                </td>
                <td style={tdAdm}>
                  <Chip tone={u.status === 'Active' ? 'success' : u.status === 'Pending' ? 'warning' : 'danger'} dot>{u.status}</Chip>
                </td>
                <td style={tdAdm}><span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{u.last}</span></td>
                <td style={tdAdm}><Icon name="more_horiz" size={20} style={{ color: 'var(--fg-3)' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--border-1)' }}>
          <span className="type-caption">7 of 1,294 users</span>
          <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>Page 1 / 130</span>
        </div>
      </Card>
    </div>
  );
}
const tdAdm = { padding: '12px 16px', borderBottom: '1px solid var(--border-1)', font: '400 13px var(--font-sans)', color: 'var(--fg-1)' };

// ============================================================================
// 2. AUDIT LOG
// ============================================================================
export function AuditLog() {
  const [entries, setEntries] = React.useState([]);

  React.useEffect(() => {
    api.get('/admin/audit').then(res => {
      setEntries(res.data.map(e => ({
        t: new Date(e.created_at).toLocaleString(),
        actor: e.actor_label,
        action: e.action,
        tgt: e.target,
        ip: e.ip_address || '—',
        ok: true,
        level: e.level === 'warn' || e.level === 'error' ? 'err' : 'info'
      })));
    }).catch(console.error);
  }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Admin · compliance</div>
          <h1 className="type-h1">Audit log</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Every state-changing action across MRAS · PHI-aware · 7-year retention.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="filter_list">Filter</Button>
          <Button kind="secondary" icon="download">Export CSV</Button>
        </div>
      </header>

      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', gap: 10, alignItems: 'center' }}>
          <Input value="" placeholder="Search by actor, action, or target id…" leading="search" style={{ flex: 1 }} onChange={() => {}} />
          <Select value="all" options={[
            { value: 'all', label: 'All actions' }, { value: 'auth', label: 'Auth' },
            { value: 'rx', label: 'Prescription' }, { value: 'cn', label: 'Consultation' }, { value: 'sys', label: 'System' },
          ]} onChange={() => {}} style={{ width: 160 }} />
          <DateField value="2026-05-14" onChange={() => {}} />
        </div>
        <div style={{ fontFamily: 'var(--font-mono)' }}>
          {entries.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '170px 22px 200px 1fr 1fr 100px', gap: 12, alignItems: 'center', padding: '10px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)' }}>
              <span style={{ font: '400 12px var(--font-mono)', color: 'var(--fg-3)' }}>{e.t}</span>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: e.level === 'err' ? 'var(--danger)' : e.level === 'warn' ? 'var(--warning)' : 'var(--success)' }} />
              <span style={{ font: '500 12px var(--font-sans)', color: 'var(--fg-1)' }}>{e.actor}</span>
              <span style={{ font: '500 12px var(--font-mono)', color: 'var(--fg-1)' }}>{e.action}</span>
              <span style={{ font: '400 12px var(--font-mono)', color: 'var(--fg-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.tgt}</span>
              <span style={{ font: '400 11px var(--font-mono)', color: 'var(--fg-3)', textAlign: 'right' }}>{e.ip}</span>
            </div>
          ))}
        </div>
        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>
          <span className="type-caption">Showing 10 of 4,221 entries for today · <a href="#" style={{ color: 'var(--primary)' }}>Load more</a></span>
        </div>
      </Card>
    </div>
  );
}

// ============================================================================
// 3. REPORTS & ANALYTICS
// ============================================================================
export function ReportsAnalytics() {
  const consultByMonth = [82, 91, 88, 102, 119, 124, 138, 142];
  const monthLbls = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const topConditions = [
    { name: 'Allergic rhinitis', count: 142, change: '↑ 12%' },
    { name: 'Tension headache',  count: 118, change: '↑ 8%' },
    { name: 'Upper resp. infection', count: 96, change: '↓ 4%' },
    { name: 'Hypertension watch', count: 78, change: '↑ 2%' },
    { name: 'Lower back pain',   count: 64, change: 'stable' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Admin · reports</div>
          <h1 className="type-h1">Reports &amp; analytics</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Aggregate, de-identified data only. Drilldown to individual records requires JRISSI permission.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Select value="ytd" options={[
            { value: 'mtd', label: 'This month' }, { value: 'qtd', label: 'This quarter' },
            { value: 'ytd', label: 'YTD' }, { value: 'lt', label: 'Last 12 months' },
          ]} onChange={() => {}} style={{ width: 160 }} />
          <Button kind="secondary" icon="download">Export</Button>
          <Button kind="primary" icon="schedule_send">Schedule</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'Consultations',          v: '1,024', d: '↑ 18% YoY', t: 'good' },
          { l: 'Avg JRISSI · workforce', v: '34',    d: '↓ 2 vs Q1',  t: 'good' },
          { l: 'Pre-emptive alerts',     v: '184',   d: '92% accepted', t: 'good' },
          { l: 'Stock-out events',       v: '3',     d: '↓ 6 vs Q1',  t: 'good' },
        ].map((s, i) => (
          <Card key={i} dense>
            <div className="type-eyebrow" style={{ marginBottom: 4 }}>{s.l}</div>
            <div className="type-clinical" style={{ fontSize: 26 }}>{s.v}</div>
            <div className="type-mono" style={{ fontSize: 12, color: 'var(--success-fg)', marginTop: 2 }}>{s.d}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Activity · last 8 months" title="Consultations" />
          <BarChart data={consultByMonth} labels={monthLbls} width={580} height={200} color="var(--primary)" />
        </Card>
        <Card>
          <CardHeader eyebrow="By department" title="JRISSI distribution" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { d: 'Engineering', low: 64, mod: 24, high: 12 },
              { d: 'Operations',  low: 71, mod: 22, high: 7 },
              { d: 'Finance',     low: 78, mod: 18, high: 4 },
              { d: 'HR',          low: 82, mod: 16, high: 2 },
              { d: 'Sales',       low: 68, mod: 26, high: 6 },
            ].map((row, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>{row.d}</span>
                  <span className="type-mono" style={{ fontSize: 12, color: 'var(--fg-3)' }}>{row.low + row.mod + row.high}</span>
                </div>
                <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: 'var(--bg-canvas)' }}>
                  <span style={{ width: `${row.low}%`, background: 'var(--success)' }} />
                  <span style={{ width: `${row.mod}%`, background: 'var(--warning)' }} />
                  <span style={{ width: `${row.high}%`, background: 'var(--danger)' }} />
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--success)' }} /> Low</span>
              <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--warning)' }} /> Moderate</span>
              <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--danger)' }} /> High</span>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)' }}>
            <div className="type-eyebrow">Top 5 · YTD</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Conditions seen</div>
          </div>
          {topConditions.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 20px', borderTop: i === 0 ? 0 : '1px solid var(--border-1)', gap: 12 }}>
              <span style={{ font: '600 14px var(--font-mono)', color: 'var(--fg-3)', width: 24 }}>{i + 1}</span>
              <span style={{ flex: 1, font: '500 13px var(--font-sans)', color: 'var(--fg-1)' }}>{r.name}</span>
              <span className="type-mono" style={{ fontSize: 13 }}>{r.count}</span>
              <span className="type-mono" style={{ fontSize: 12, color: r.change.startsWith('↑') ? 'var(--danger-fg)' : r.change.startsWith('↓') ? 'var(--success-fg)' : 'var(--fg-3)', width: 60, textAlign: 'right' }}>{r.change}</span>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader eyebrow="Saved" title="Scheduled reports" action={<Button kind="ghost" size="sm" icon="add">New</Button>} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { i: 'description', t: 'Monthly OH summary', d: '1st of month · 9:00 · HR + Medical' },
              { i: 'psychology',  t: 'JRISSI escalation rollup', d: 'Weekly Mon 8:00 · Doctor only' },
              { i: 'inventory_2', t: 'Pharmacy stock & FEFO',    d: 'Daily 06:00 · Pharmacy + Admin' },
              { i: 'shield_person', t: 'Privacy access log',     d: 'Quarterly · Compliance officer' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, border: '1px solid var(--border-1)' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--primary-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={r.i} size={20} style={{ color: 'var(--primary)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="type-label" style={{ color: 'var(--fg-1)' }}>{r.t}</div>
                  <div className="type-caption" style={{ marginTop: 2 }}>{r.d}</div>
                </div>
                <Toggle checked onChange={() => {}} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


