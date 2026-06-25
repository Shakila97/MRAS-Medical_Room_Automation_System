/* eslint-disable */
// Pharmacy screens: GRN (Goods Received Note) receiving flow with FEFO sequencing.

function GrnReceive() {
  const [step, setStep] = React.useState(2); // currently at "Lot details"
  const lots = [
    { id: 'LOT-A8821', drug: 'Cetirizine 10 mg', mfg: 'Hemas', qty: 200, expiry: '2027-09', dispOrder: 1, dispLabel: 'Dispense first', tone: 'warning' },
    { id: 'LOT-A8822', drug: 'Cetirizine 10 mg', mfg: 'Hemas', qty: 300, expiry: '2028-03', dispOrder: 2, dispLabel: 'After A8821', tone: 'neutral' },
    { id: 'LOT-B5503', drug: 'Paracetamol 500 mg', mfg: 'Astron', qty: 500, expiry: '2027-06', dispOrder: 1, dispLabel: 'Dispense first', tone: 'warning' },
    { id: 'LOT-B5504', drug: 'Paracetamol 500 mg', mfg: 'Astron', qty: 500, expiry: '2028-01', dispOrder: 2, dispLabel: 'After B5503', tone: 'neutral' },
    { id: 'LOT-C2207', drug: 'Amoxicillin 250 mg', mfg: 'GSK', qty: 120, expiry: '2027-11', dispOrder: 1, dispLabel: 'Dispense first', tone: 'neutral' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Pharmacy · GRN-2026-0142</div>
          <h1 className="type-h1">Receive stock</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Supplier: Hemas Pharmaceuticals · PO #2026-0331 · 5 SKUs · 1,620 units</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="ghost" icon="print">Print GRN</Button>
          <Button kind="secondary" icon="save">Save draft</Button>
          <Button kind="primary" icon="check">Post to inventory</Button>
        </div>
      </header>

      <Card>
        <Stepper current={step} steps={['Match PO', 'Scan / count', 'Lot details', 'FEFO check', 'Post']} />
      </Card>

      <Banner tone="info" title="FEFO sequencing applied automatically.">
        Lots are ordered by earliest expiry within each SKU. Dispensing follows this order until override.
      </Banner>

      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div className="type-eyebrow">3 / 5</div>
            <div className="type-h3" style={{ marginTop: 2 }}>Lot details</div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button kind="secondary" size="sm" icon="qr_code_scanner">Scan lot barcode</Button>
            <Button kind="ghost" size="sm" icon="add">Add manually</Button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontVariantNumeric: 'tabular-nums' }}>
          <thead>
            <tr>
              {['Lot #', 'Drug', 'Manufacturer', 'Qty', 'Expiry', 'FEFO order', ''].map((h, i) => (
                <th key={i} style={{
                  font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em',
                  color: 'var(--fg-3)', textAlign: i === 3 ? 'right' : 'left',
                  padding: '12px 16px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lots.map((l, i) => (
              <tr key={i}>
                <td style={tdS}><span className="type-mono">{l.id}</span></td>
                <td style={tdS}><span className="type-label" style={{ color: 'var(--fg-1)' }}>{l.drug}</span></td>
                <td style={tdS}>{l.mfg}</td>
                <td style={{ ...tdS, textAlign: 'right' }}><span className="type-mono">{l.qty}</span></td>
                <td style={tdS}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span className="type-mono">{l.expiry}</span>
                    {l.tone === 'warning' && <Chip tone="warning" style={{ padding: '2px 8px' }}>Earliest</Chip>}
                  </div>
                </td>
                <td style={tdS}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: 999, background: l.tone === 'warning' ? 'var(--warning)' : 'var(--bg-canvas)', color: l.tone === 'warning' ? '#fff' : 'var(--fg-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', font: '600 11px var(--font-mono)', border: '1px solid var(--border-2)' }}>{l.dispOrder}</span>
                    <span className="type-body-s">{l.dispLabel}</span>
                  </div>
                </td>
                <td style={tdS}><Icon name="more_horiz" size={20} style={{ color: 'var(--fg-3)' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-canvas)' }}>
          <span className="type-caption">5 lots · 1,620 units · 0 discrepancies</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <Button kind="ghost" icon="arrow_back" onClick={() => setStep(Math.max(0, step - 1))}>Back</Button>
            <Button kind="primary" icon="arrow_forward" onClick={() => setStep(Math.min(4, step + 1))}>Continue to FEFO check</Button>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <Card>
          <CardHeader eyebrow="Counts" title="Receiving summary" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Row label="Total SKUs" value="5" />
            <Row label="Total units" value="1,620" />
            <Row label="PO match" value="100%" tone="success" />
            <Row label="Earliest expiry" value="2027-06" tone="warning" />
            <Row label="Total value" value="LKR 84,420" />
          </div>
        </Card>
        <Card>
          <CardHeader eyebrow="Quality" title="Discrepancies" />
          <EmptyState icon="check_circle" title="No discrepancies." description="Counts match PO. All lots within expected expiry window." />
        </Card>
      </div>
    </div>
  );
}
const tdS = { padding: '12px 16px', borderBottom: '1px solid var(--border-1)', font: '400 13px var(--font-sans)', color: 'var(--fg-1)' };
function Row({ label, value, tone }) {
  const c = tone === 'success' ? 'var(--success-fg)' : tone === 'warning' ? 'var(--warning-fg)' : 'var(--fg-1)';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px dashed var(--border-1)' }}>
      <span className="type-body-s">{label}</span>
      <span className="type-mono" style={{ color: c }}>{value}</span>
    </div>
  );
}

// ============================================================================
// FEFO Expiry watch screen
// ============================================================================
function ExpiryWatch() {
  const items = [
    { drug: 'Amoxicillin 250 mg', lot: 'LOT-C2207', qty: 6, days: 12, exp: '2026-05-26', tone: 'danger' },
    { drug: 'Ibuprofen 400 mg', lot: 'LOT-D1108', qty: 22, days: 28, exp: '2026-06-11', tone: 'danger' },
    { drug: 'Salbutamol inhaler', lot: 'LOT-E0203', qty: 4, days: 45, exp: '2026-06-28', tone: 'warning' },
    { drug: 'Loratadine 10 mg', lot: 'LOT-F2244', qty: 50, days: 62, exp: '2026-07-15', tone: 'warning' },
    { drug: 'Cetirizine 10 mg', lot: 'LOT-A8821', qty: 124, days: 188, exp: '2027-09-30', tone: 'success' },
    { drug: 'Paracetamol 500 mg', lot: 'LOT-B5503', qty: 312, days: 144, exp: '2027-06-22', tone: 'success' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <header style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div className="type-eyebrow" style={{ marginBottom: 6 }}>Pharmacy · FEFO</div>
          <h1 className="type-h1">Expiry watch</h1>
          <p className="type-body" style={{ marginTop: 6 }}>Sorted by days to expiry. FEFO sequencing dispenses earliest-expiry lots first.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button kind="secondary" icon="download">Export</Button>
          <Button kind="primary" icon="local_shipping">Return to supplier</Button>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {[
          { l: 'Expires &lt; 30 d', v: '2', t: 'danger' },
          { l: 'Expires 30–90 d', v: '6', t: 'warning' },
          { l: 'Expires 90–180 d', v: '14', t: 'info' },
          { l: 'Total active lots', v: '128', t: 'success' },
        ].map((s, i) => (
          <Card key={i} dense>
            <div className="type-eyebrow" style={{ marginBottom: 4 }} dangerouslySetInnerHTML={{ __html: s.l }} />
            <div className="type-clinical" style={{ fontSize: 26, color: `var(--${s.t}-fg)` }}>{s.v}</div>
          </Card>
        ))}
      </div>

      <Card padding={0}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="type-h3">Lots near expiry</div>
          <div style={{ display: 'flex', gap: 6 }}>
            <Chip tone="danger" dot>&lt; 30 d</Chip>
            <Chip tone="warning" dot>30–90 d</Chip>
            <Chip tone="success" dot>&gt; 90 d</Chip>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr>
              {['Drug', 'Lot #', 'Qty', 'Days to expiry', 'Expiry date', 'Action'].map((h, i) => (
                <th key={i} style={{
                  font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em',
                  color: 'var(--fg-3)', textAlign: i === 2 || i === 3 ? 'right' : 'left',
                  padding: '12px 16px', borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td style={tdS}><span className="type-label" style={{ color: 'var(--fg-1)' }}>{it.drug}</span></td>
                <td style={tdS}><span className="type-mono">{it.lot}</span></td>
                <td style={{ ...tdS, textAlign: 'right' }}><span className="type-mono">{it.qty}</span></td>
                <td style={{ ...tdS, textAlign: 'right' }}>
                  <span style={{ font: '500 14px var(--font-mono)', color: it.tone === 'danger' ? 'var(--danger-fg)' : it.tone === 'warning' ? 'var(--warning-fg)' : 'var(--fg-1)' }}>{it.days} d</span>
                </td>
                <td style={tdS}><span className="type-mono" style={{ color: 'var(--fg-3)' }}>{it.exp}</span></td>
                <td style={tdS}>
                  {it.tone === 'danger' ? <Button kind="danger" size="sm" icon="local_shipping">Return</Button>
                    : it.tone === 'warning' ? <Button kind="secondary" size="sm" icon="campaign">Promote</Button>
                    : <span className="type-caption">On schedule</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

Object.assign(window, { GrnReceive, ExpiryWatch });
