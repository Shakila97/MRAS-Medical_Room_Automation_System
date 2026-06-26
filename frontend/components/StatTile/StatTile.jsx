// MRAS · StatTile — clinical readout cell used across dashboards.

export function StatTile({ icon, label, value, unit, delta, deltaTone = 'neutral', style }) {
  const dc = deltaTone === 'good' ? 'var(--success-fg)'
           : deltaTone === 'bad'  ? 'var(--danger-fg)'
           : 'var(--fg-3)';
  return (
    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0, ...style }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        font: '600 12px var(--font-sans)', letterSpacing: '0.04em',
        textTransform: 'uppercase', color: 'var(--fg-3)',
      }}>
        {icon && <span className="ms is-20" style={{ fontSize: 16, color: 'var(--primary)' }}>{icon}</span>}
        {label}
      </div>
      <div style={{
        font: '500 22px var(--font-mono)', color: 'var(--fg-1)',
        fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em',
      }}>
        {value}{unit && <span style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)', marginLeft: 3 }}>{unit}</span>}
      </div>
      {delta && <div style={{ font: '500 12px var(--font-mono)', color: dc }}>{delta}</div>}
    </div>
  );
}
