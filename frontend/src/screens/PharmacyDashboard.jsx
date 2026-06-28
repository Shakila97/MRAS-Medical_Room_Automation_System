/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';
export function PharmacyDashboard({ onOpenInventory }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/pharmacy')
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

  const { expiringSoon, grnActivity, topDispensed, stats } = data;


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Thursday · 14 May 2026</div>
          <h1 className="type-h1">Pharmacy dashboard</h1>
          <p className="type-body" style={{ marginTop: 6 }}>2 batches expiring within 30 days. 3 SKUs out of stock. FEFO automation healthy.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="qr_code_scanner">Scan GRN</Button>
          <Button kind="primary" icon="add">Dispense</Button>
        </div>
      </header>

      <Banner tone="warning" title="Amlodipine 5 mg expires in 9 days.">
        Batch A-2026-05-B (84 tabs). Recommend dispensing priority or quarantine.
        <a href="#" onClick={(e) => { e.preventDefault(); onOpenInventory && onOpenInventory(); }} style={{ color: 'var(--warning-fg)', textDecoration: 'underline', marginLeft: 6 }}>Open inventory</a>.
      </Banner>

      {/* Stat strip */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ borderRight: i < 4 ? '1px solid var(--border-1)' : 0 }}>
              <StatTile {...s} />
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 20 }}>
        {/* Expiring soon */}
        <Card padding={0}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div className="type-eyebrow">FEFO · first-expiry-first-out</div>
              <div className="type-h3" style={{ marginTop: 2 }}>Expiry watch</div>
            </div>
            <Button kind="ghost" size="sm" icon="open_in_new" onClick={onOpenInventory}>Open inventory</Button>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 0.7fr 0.9fr 1fr 100px',
            gap: 12, padding: '10px 20px',
            background: 'var(--bg-canvas)',
            borderBottom: '1px solid var(--border-1)',
            font: '600 11px var(--font-sans)', color: 'var(--fg-3)',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>
            <div>Drug</div><div>Qty</div><div>Days left</div><div>Batch</div><div>Status</div>
          </div>
          {expiringSoon.map((s, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '2fr 0.7fr 0.9fr 1fr 100px',
              gap: 12, alignItems: 'center',
              padding: '12px 20px',
              borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
              cursor: 'pointer', transition: 'background var(--dur-micro) var(--ease-std)',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = ''}
            >
              <div>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{s.name}</div>
                <div className="type-caption">{s.brand}</div>
              </div>
              <div className="type-mono" style={{ color: 'var(--fg-1)' }}>{s.qty}</div>
              <div className="type-mono" style={{ color: s.tone === 'high' ? 'var(--danger-fg)' : s.tone === 'moderate' ? 'var(--warning-fg)' : 'var(--fg-2)' }}>
                {s.daysLeft} d
              </div>
              <div className="type-mono" style={{ color: 'var(--fg-3)' }}>{s.batch}</div>
              <Chip tone={s.tone} dot style={{ padding: '2px 8px' }}>
                {s.tone === 'high' ? 'Critical' : s.tone === 'moderate' ? 'Watch' : 'Healthy'}
              </Chip>
            </div>
          ))}
        </Card>

        {/* Top dispensed */}
        <Card>
          <CardHeader eyebrow="Last 7 days" title="Top dispensed" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topDispensed.map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
                  <span className="type-body-s" style={{ color: 'var(--fg-1)' }}>{d.name}</span>
                  <span className="type-mono" style={{ color: 'var(--fg-2)' }}>{d.count}</span>
                </div>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--slate-100)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${d.bar}%`, background: 'var(--primary)', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Activity feed */}
        <Card>
          <CardHeader eyebrow="Today" title="Activity feed" action={<Chip tone="info" dot>Live</Chip>} />
          {grnActivity.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i === 0 ? 0 : '1px dashed var(--border-1)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                <Icon name={a.icon} size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                  <span className="type-label" style={{ color: 'var(--fg-1)' }}>{a.action}</span>
                  <span className="type-caption">{a.t}</span>
                </div>
                <div className="type-caption" style={{ marginTop: 2 }}>{a.sub} · {a.who}</div>
              </div>
            </div>
          ))}
        </Card>

        {/* Drug-interaction alerts (OpenFDA) */}
        <Card>
          <CardHeader eyebrow="OpenFDA · drug-interaction engine" title="Pending alerts" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Banner tone="warning" icon="warning" title="Possible interaction · Rx-9418.">
              Amlodipine + Simvastatin co-prescription. Reduce simvastatin to ≤ 20 mg/d.
            </Banner>
            <Banner tone="warning" icon="warning" title="Possible interaction · Rx-9417.">
              Ibuprofen + warfarin. Increased bleeding risk. Confirm with prescribing doctor.
            </Banner>
            <Banner tone="info" icon="info" title="Daily OpenFDA sync complete.">
              Updated 09:00. 2 new monographs ingested.
            </Banner>
          </div>
        </Card>
      </div>
    </div>
  );
}


