// MRAS · Chip — compact status / risk pill.

export function Chip({ tone = 'neutral', icon, dot, children, style }) {
  const map = {
    low:      { bg: 'var(--risk-low-bg)',      fg: 'var(--success-fg)',  dotC: 'var(--risk-low)' },
    moderate: { bg: 'var(--risk-moderate-bg)', fg: 'var(--warning-fg)',  dotC: 'var(--risk-moderate)' },
    high:     { bg: 'var(--risk-high-bg)',     fg: 'var(--danger-fg)',   dotC: 'var(--risk-high)' },
    info:     { bg: 'var(--info-bg)',          fg: 'var(--info-fg)',     dotC: 'var(--info)' },
    success:  { bg: 'var(--success-bg)',       fg: 'var(--success-fg)',  dotC: 'var(--success)' },
    warning:  { bg: 'var(--warning-bg)',       fg: 'var(--warning-fg)',  dotC: 'var(--warning)' },
    danger:   { bg: 'var(--danger-bg)',        fg: 'var(--danger-fg)',   dotC: 'var(--danger)' },
    neutral:  { bg: 'var(--slate-100)',        fg: 'var(--fg-2)',        dotC: 'var(--slate-400)' },
  };
  const t = map[tone] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      font: '500 12px var(--font-sans)', padding: '4px 10px',
      borderRadius: 'var(--radius-pill)', background: t.bg, color: t.fg, ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dotC }} />}
      {icon && <span className="ms is-20" style={{ fontSize: 14, color: t.dotC }}>{icon}</span>}
      {children}
    </span>
  );
}
