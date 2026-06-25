/* eslint-disable */
// MRAS UI kit — shared primitives

const { useState, useEffect, useMemo, useRef } = React;

// --------------------------------------------------------------------
// Icon
// --------------------------------------------------------------------
function Icon({ name, size = 20, filled = false, color, style, className }) {
  const cls = [
    'ms',
    size === 20 ? 'is-20' : size === 32 ? 'is-32' : size === 48 ? 'is-48' : '',
    filled ? 'is-filled' : '',
    className || '',
  ].filter(Boolean).join(' ');
  return <span className={cls} style={{ color, ...style }}>{name}</span>;
}

// --------------------------------------------------------------------
// Button
// --------------------------------------------------------------------
const btnStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    border: 0, cursor: 'pointer',
    font: '500 14px var(--font-sans)', borderRadius: 8,
    padding: '0 16px', height: 36,
    transition: 'background var(--dur-micro) var(--ease-std), color var(--dur-micro) var(--ease-std)',
    whiteSpace: 'nowrap',
  },
  primary:   { background: 'var(--primary)', color: '#fff' },
  secondary: { background: 'var(--surface-1)', color: 'var(--fg-1)', border: '1px solid var(--border-2)' },
  ghost:     { background: 'transparent', color: 'var(--primary)' },
  danger:    { background: 'var(--danger)', color: '#fff' },
};
function Button({ kind = 'primary', icon, children, onClick, style, size }) {
  const sizeStyle =
    size === 'sm' ? { height: 28, fontSize: 13, padding: '0 12px', borderRadius: 6 } :
    size === 'lg' ? { height: 44, fontSize: 15, padding: '0 20px', borderRadius: 10 } : {};
  return (
    <button
      onClick={onClick}
      style={{ ...btnStyles.base, ...btnStyles[kind], ...sizeStyle, ...style }}
      onMouseDown={(e) => e.currentTarget.style.filter = 'brightness(0.92)'}
      onMouseUp={(e) => e.currentTarget.style.filter = ''}
      onMouseLeave={(e) => e.currentTarget.style.filter = ''}
    >
      {icon && <Icon name={icon} size={20} />}
      {children}
    </button>
  );
}

// --------------------------------------------------------------------
// Card
// --------------------------------------------------------------------
function Card({ children, lifted, dense, padding, style }) {
  return (
    <div style={{
      background: 'var(--surface-1)',
      border: '1px solid var(--border-1)',
      borderRadius: 'var(--radius-md)',
      padding: padding ?? (dense ? '14px 16px' : 20),
      boxShadow: lifted ? 'var(--shadow-1)' : 'none',
      ...style,
    }}>
      {children}
    </div>
  );
}
function CardHeader({ eyebrow, title, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, gap: 12 }}>
      <div>
        {eyebrow && <div className="type-eyebrow" style={{ marginBottom: 4 }}>{eyebrow}</div>}
        {title && <div className="type-h4">{title}</div>}
      </div>
      {action}
    </div>
  );
}

// --------------------------------------------------------------------
// Chip
// --------------------------------------------------------------------
function Chip({ tone = 'neutral', icon, dot, children, style }) {
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
  const t = map[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      font: '500 12px var(--font-sans)',
      padding: '4px 10px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg, color: t.fg,
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: t.dotC }} />}
      {icon && <Icon name={icon} size={20} style={{ fontSize: 14, color: t.dotC }} />}
      {children}
    </span>
  );
}

// --------------------------------------------------------------------
// Banner
// --------------------------------------------------------------------
function Banner({ tone = 'info', icon, title, children }) {
  const map = {
    info:    { bg: 'var(--info-bg)',    bd: '#BFDBFE', fg: 'var(--info-fg)',    ic: 'var(--info)',    di: icon ?? 'info' },
    warning: { bg: 'var(--warning-bg)', bd: '#FDE68A', fg: 'var(--warning-fg)', ic: 'var(--warning)', di: icon ?? 'warning' },
    danger:  { bg: 'var(--danger-bg)',  bd: '#FECACA', fg: 'var(--danger-fg)',  ic: 'var(--danger)',  di: icon ?? 'priority_high' },
    success: { bg: 'var(--success-bg)', bd: '#A7F3D0', fg: 'var(--success-fg)', ic: 'var(--success)', di: icon ?? 'check_circle' },
  };
  const t = map[tone];
  return (
    <div style={{
      display: 'flex', gap: 10,
      padding: '12px 14px', borderRadius: 10,
      background: t.bg, border: `1px solid ${t.bd}`,
      color: t.fg, font: '400 13px var(--font-sans)', lineHeight: 1.45,
    }}>
      <Icon name={t.di} size={20} style={{ color: t.ic, marginTop: 1, flex: '0 0 auto' }} />
      <div>
        {title && <b style={{ color: 'var(--fg-1)', fontWeight: 600 }}>{title}</b>}{title && ' '}
        {children}
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// Avatar
// --------------------------------------------------------------------
function Avatar({ name, size = 32, color = 'var(--primary)' }) {
  const initials = (name || '?').split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: color, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      font: `600 ${Math.round(size * 0.4)}px var(--font-sans)`,
      flex: '0 0 auto',
    }}>{initials}</div>
  );
}

// --------------------------------------------------------------------
// StatTile — clinical readout cell
// --------------------------------------------------------------------
function StatTile({ icon, label, value, unit, delta, deltaTone }) {
  const dt = deltaTone === 'good' ? 'var(--success-fg)'
           : deltaTone === 'bad'  ? 'var(--danger-fg)'
           : 'var(--fg-3)';
  return (
    <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <div className="type-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--fg-3)' }}>
        {icon && <Icon name={icon} size={20} style={{ color: 'var(--primary)', fontSize: 16 }} />}
        {label}
      </div>
      <div style={{ font: '500 22px var(--font-mono)', color: 'var(--fg-1)', fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em' }}>
        {value}{unit && <span style={{ font: '400 12px var(--font-sans)', color: 'var(--fg-3)', marginLeft: 3 }}>{unit}</span>}
      </div>
      {delta && <div style={{ font: '500 12px var(--font-mono)', color: dt }}>{delta}</div>}
    </div>
  );
}

// --------------------------------------------------------------------
// SectionTitle
// --------------------------------------------------------------------
function SectionTitle({ children, action }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
      <h2 className="type-h2">{children}</h2>
      {action}
    </div>
  );
}

// --------------------------------------------------------------------
// JRISSI gauge
// --------------------------------------------------------------------
function JrissiGauge({ score, size = 160 }) {
  const tone = score < 34 ? 'low' : score < 67 ? 'moderate' : 'high';
  const colorMap = { low: '#10B981', moderate: '#F59E0B', high: '#EF4444' };
  const labelMap = { low: 'Low', moderate: 'Moderate', high: 'High' };
  const r = size / 2 - 14;
  const circ = 2 * Math.PI * r;
  const off = circ * (1 - score / 100);
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="#E2E8F0" strokeWidth="12" fill="none"/>
        <circle cx={size/2} cy={size/2} r={r} stroke={colorMap[tone]} strokeWidth="12" fill="none" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={off}/>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ font: '600 34px var(--font-mono)', color: 'var(--fg-1)', lineHeight: 1 }}>{score}</div>
        <div style={{ font: '500 10px var(--font-sans)', color: colorMap[tone], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{labelMap[tone]}</div>
      </div>
    </div>
  );
}

// --------------------------------------------------------------------
// Sparkline
// --------------------------------------------------------------------
function Sparkline({ data, width = 120, height = 32, color = 'var(--primary)' }) {
  if (!data?.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * height;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

// --------------------------------------------------------------------
// Export to window
// --------------------------------------------------------------------
Object.assign(window, {
  Icon, Button, Card, CardHeader, Chip, Banner, Avatar, StatTile, SectionTitle, JrissiGauge, Sparkline,
});
