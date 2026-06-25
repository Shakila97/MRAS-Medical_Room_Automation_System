// MRAS · Banner — page-level callout.

export function Banner({ tone = 'info', icon, title, children, style }) {
  const map = {
    info:    { bg: 'var(--info-bg)',    bd: '#BFDBFE', fg: 'var(--info-fg)',    ic: 'var(--info)',    di: icon || 'info' },
    warning: { bg: 'var(--warning-bg)', bd: '#FDE68A', fg: 'var(--warning-fg)', ic: 'var(--warning)', di: icon || 'warning' },
    danger:  { bg: 'var(--danger-bg)',  bd: '#FECACA', fg: 'var(--danger-fg)',  ic: 'var(--danger)',  di: icon || 'priority_high' },
    success: { bg: 'var(--success-bg)', bd: '#A7F3D0', fg: 'var(--success-fg)', ic: 'var(--success)', di: icon || 'check_circle' },
  };
  const t = map[tone] || map.info;
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 'var(--radius-md)',
      background: t.bg, border: `1px solid ${t.bd}`, color: t.fg,
      font: '400 13px var(--font-sans)', lineHeight: 1.45, ...style,
    }}>
      <span className="ms is-20" style={{ color: t.ic, marginTop: 1, flex: '0 0 auto' }}>{t.di}</span>
      <div>
        {title && <b style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{title}</b>}{title && ' '}
        {children}
      </div>
    </div>
  );
}
