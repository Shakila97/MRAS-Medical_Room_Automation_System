/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/admin')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load dashboard:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data) return <div style={{ padding: 40 }}><Skeleton rows={10} /></div>;

  const { users, audit, stats, services, role_distribution } = data;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>{todayLabel}</div>
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
          {stats.map((s, i) => (
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
          {services.map((s, i) => {
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
            {role_distribution.map((r, i) => (
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


