/* eslint-disable */
// Pharmacy inventory — FEFO stock list, expiry alerts

const STOCK = [
  { name: 'Paracetamol 500 mg',  brand: 'Panadol',      sku: 'DRG-0421', qty: 1240, unit: 'tab', expiry: '12 Aug 2026', batch: 'P-2026-08-A', tone: 'low' },
  { name: 'Cetirizine 10 mg',    brand: 'Zyrtec',       sku: 'DRG-0118', qty: 312,  unit: 'tab', expiry: '03 Jun 2026', batch: 'C-2026-06-B', tone: 'moderate' },
  { name: 'Amlodipine 5 mg',     brand: 'Norvasc',      sku: 'DRG-0306', qty: 84,   unit: 'tab', expiry: '24 May 2026', batch: 'A-2026-05-B', tone: 'high' },
  { name: 'Salbutamol inhaler',  brand: 'Ventolin',     sku: 'DRG-0552', qty: 42,   unit: 'pcs', expiry: '14 Nov 2026', batch: 'S-2026-11-A', tone: 'low' },
  { name: 'Metformin 500 mg',    brand: 'Glucophage',   sku: 'DRG-0233', qty: 0,    unit: 'tab', expiry: '—',          batch: '—',           tone: 'high', oos: true },
  { name: 'ORS sachets',         brand: 'Jeevani',      sku: 'DRG-0014', qty: 540,  unit: 'sct', expiry: '02 Mar 2027', batch: 'O-2027-03-A', tone: 'low' },
  { name: 'Ibuprofen 400 mg',    brand: 'Brufen',       sku: 'DRG-0089', qty: 188,  unit: 'tab', expiry: '20 Jul 2026', batch: 'I-2026-07-A', tone: 'moderate' },
  { name: 'Loratadine 10 mg',    brand: 'Claritin',     sku: 'DRG-0122', qty: 96,   unit: 'tab', expiry: '08 Sep 2026', batch: 'L-2026-09-A', tone: 'low' },
];

function PharmacyInventory() {
  const [filter, setFilter] = React.useState('all');
  const filtered = STOCK.filter(s => filter === 'all' ? true : s.tone === filter);

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

      {/* Stats */}
      <Card padding={0}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {[
            { icon: 'inventory',     label: 'SKUs in stock',  value: '247' },
            { icon: 'schedule',      label: 'Expiring < 30 d', value: '8',  delta: '2 critical', deltaTone: 'bad' },
            { icon: 'block',         label: 'Out of stock',   value: '3', deltaTone: 'bad' },
            { icon: 'savings',       label: 'Stock value',    value: 'LKR 1.2 M', unit: '' },
          ].map((s, i) => (
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

Object.assign(window, { PharmacyInventory });
