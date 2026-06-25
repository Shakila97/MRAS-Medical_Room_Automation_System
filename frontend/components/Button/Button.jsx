// MRAS · Button — primary action control.
// Pure JSX (no MUI). Renders from design tokens in colors_and_type.css.

export function Button({ kind = 'primary', size = 'md', icon, children, disabled, onClick, style }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    border: 0, cursor: disabled ? 'not-allowed' : 'pointer',
    font: '500 14px var(--font-sans)', borderRadius: 'var(--radius-md)',
    padding: '0 16px', height: 36, whiteSpace: 'nowrap',
    transition: 'background var(--dur-micro) var(--ease-std), filter var(--dur-micro) var(--ease-std)',
    opacity: disabled ? 0.4 : 1,
  };
  const kinds = {
    primary:   { background: 'var(--primary)', color: 'var(--fg-on-primary)' },
    secondary: { background: 'var(--surface-1)', color: 'var(--fg-1)', border: '1px solid var(--border-2)' },
    ghost:     { background: 'transparent', color: 'var(--primary)' },
    danger:    { background: 'var(--danger)', color: '#fff' },
  };
  const sizes = {
    sm: { height: 28, fontSize: 13, padding: '0 12px', borderRadius: 'var(--radius-sm)' },
    md: {},
    lg: { height: 44, fontSize: 15, padding: '0 20px' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...kinds[kind], ...sizes[size], ...style }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(0.92)'; }}
      onMouseUp={(e) => { e.currentTarget.style.filter = ''; }}
      onMouseLeave={(e) => { e.currentTarget.style.filter = ''; }}
    >
      {icon && <span className="ms is-20">{icon}</span>}
      {children}
    </button>
  );
}
