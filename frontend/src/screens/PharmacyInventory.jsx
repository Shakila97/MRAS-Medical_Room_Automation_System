/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline } from '../widgets.jsx';
import { Input, Select, Textarea, Toggle, Checkbox, Tabs, Modal, Drawer, Toast, EmptyState, Skeleton, LoadingRows, ErrorState, DataTable, Stepper, FileUpload, DateField, MiniCalendar, LineChart, BarChart, Donut, Progress, CommandPalette, GlobalAnims } from '../primitives.jsx';

export function PharmacyInventory() {
  const [filter, setFilter] = useState('all');
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/inventory').then(res => {
      setStock(res.data.map(item => ({
        name: item.drug_name,
        brand: '',
        sku: `DRG-${item.drug_id}`,
        qty: item.total_quantity,
        unit: item.unit,
        expiry: new Date(item.updated_at).toLocaleDateString(),
        batch: '-',
        tone: item.status === 'critical' ? 'high' : item.status === 'low' ? 'moderate' : 'low',
        oos: item.total_quantity === 0
      })));
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = stock.filter(s => filter === 'all' ? true : s.tone === filter);

  if (loading) return <div style={{ padding: 40 }}><Skeleton rows={10} /></div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>FEFO · first-expiry-first-out</div>
          <h1 className="type-h1">Pharmacy inventory</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="qr_code_scanner">Scan GRN</Button>
          <Button kind="primary" icon="add">Add stock</Button>
        </div>
      </header>

      {/* Stats — computed from real data */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {(() => {
            const totalSkus = stock.length;
            const oos = stock.filter(s => s.oos).length;
            const critical = stock.filter(s => s.tone === 'high').length;
            const expiring = stock.filter(s => s.tone === 'high' || s.tone === 'moderate').length;
            return [
              { icon: 'inventory',  label: 'SKUs in stock',  value: totalSkus },
              { icon: 'schedule',   label: 'Expiring < 90d', value: expiring, delta: `${critical} critical`, deltaTone: critical > 0 ? 'bad' : 'good' },
              { icon: 'block',      label: 'Out of stock',   value: oos, deltaTone: oos > 0 ? 'bad' : 'good' },
              { icon: 'inventory_2',label: 'Total units',    value: stock.reduce((sum, s) => sum + s.qty, 0).toLocaleString() },
            ];
          })().map((s, i) => (
            <div key={i} style={{ borderRight: i < 3 ? '1px solid var(--border-1)' : 0 }}>
              <StatTile {...s} />
            </div>
          ))}
        </div>
      </Card>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <span className="type-eyebrow" style={{ marginRight: 4 }}>Filter</span>
        {[
          { id: 'all', label: 'All', tone: 'neutral' },
          { id: 'high', label: 'Expiring soon', tone: 'high' },
          { id: 'moderate', label: 'Watch', tone: 'moderate' },
          { id: 'low', label: 'Healthy', tone: 'low' },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            border: 0, background: 'transparent', padding: 0, cursor: 'pointer',
          }}>
            <Chip tone={f.tone} dot={f.id !== 'all'} style={{
              outline: filter === f.id ? '2px solid var(--primary)' : 'none',
              outlineOffset: 2,
            }}>{f.label}</Chip>
          </button>
        ))}
      </div>

      {/* Table */}
      <Card padding={0}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 100px 32px',
          gap: 12,
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-1)',
          font: '600 11px var(--font-sans)', color: 'var(--fg-3)',
          letterSpacing: '0.04em', textTransform: 'uppercase',
          background: 'var(--bg-canvas)',
        }}>
          <div>Drug</div><div>Brand · SKU</div><div>Qty</div><div>Expiry</div><div>Batch</div><div>Status</div><div></div>
        </div>
        {filtered.map((s, i) => (
          <div key={s.sku} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 0.7fr 1fr 1fr 100px 32px',
            gap: 12, alignItems: 'center',
            padding: '12px 20px',
            borderTop: i === 0 ? 0 : '1px solid var(--border-1)',
            cursor: 'pointer',
            transition: 'background var(--dur-micro) var(--ease-std)',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = ''}
          >
            <div className="type-label" style={{ color: 'var(--fg-1)' }}>{s.name}</div>
            <div>
              <div className="type-body-s" style={{ color: 'var(--fg-1)' }}>{s.brand}</div>
              <div className="type-mono" style={{ color: 'var(--fg-3)' }}>{s.sku}</div>
            </div>
            <div className="type-mono" style={{ color: s.oos ? 'var(--danger-fg)' : 'var(--fg-1)' }}>
              {s.qty.toLocaleString()} <span style={{ color: 'var(--fg-3)' }}>{s.unit}</span>
            </div>
            <div className="type-mono" style={{ color: 'var(--fg-2)' }}>{s.expiry}</div>
            <div className="type-mono" style={{ color: 'var(--fg-3)' }}>{s.batch}</div>
            <Chip tone={s.tone} dot style={{ padding: '2px 8px' }}>
              {s.oos ? 'Out' : s.tone === 'high' ? 'Critical' : s.tone === 'moderate' ? 'Watch' : 'Healthy'}
            </Chip>
            <Icon name="chevron_right" size={20} style={{ color: 'var(--fg-3)' }} />
          </div>
        ))}
      </Card>
    </div>
  );
}


