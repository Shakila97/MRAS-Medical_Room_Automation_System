/* eslint-disable */
// MRAS — extended primitives
// Inputs, Select, Textarea, Modal, Drawer, Toast, FileUpload, CommandPalette,
// States (empty/loading/error), DataTable, Stepper (form wizard), Chart helpers,
// DateTime picker, Tabs, Toggle, Menu, Tooltip.

const P = React;
const { useState: pUS, useEffect: pUE, useMemo: pUM, useRef: pUR } = React;

// ---------------------------------------------------------------- Input
function Input({ label, hint, error, leading, trailing, value, onChange, placeholder, type = 'text', required, disabled, style }) {
  const [focused, setFocused] = pUS(false);
  const id = pUM(() => 'i' + Math.random().toString(36).slice(2, 8), []);
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--primary)' : 'var(--border-2)';
  return (
    <label htmlFor={id} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <span className="type-label" style={{ color: 'var(--fg-2)' }}>
          {label}{required && <span style={{ color: 'var(--danger)', marginLeft: 2 }}>*</span>}
        </span>
      )}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 38, padding: '0 12px',
        borderRadius: 8, border: `1px solid ${borderColor}`,
        background: disabled ? 'var(--bg-canvas)' : 'var(--surface-1)',
        boxShadow: focused && !error ? `0 0 0 3px var(--primary-tint)` : 'none',
        transition: 'border-color var(--dur-micro) var(--ease-std), box-shadow var(--dur-micro) var(--ease-std)',
        opacity: disabled ? 0.6 : 1,
      }}>
        {leading && <Icon name={leading} size={20} style={{ color: 'var(--fg-3)' }} />}
        <input id={id} type={type} value={value || ''} placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          disabled={disabled}
          style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 14px var(--font-sans)', color: 'var(--fg-1)', minWidth: 0,
          }} />
        {trailing && <Icon name={trailing} size={20} style={{ color: 'var(--fg-3)' }} />}
      </span>
      {(hint || error) && (
        <span className="type-caption" style={{ color: error ? 'var(--danger-fg)' : 'var(--fg-3)' }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}

// ---------------------------------------------------------------- Select
function Select({ label, value, onChange, options, placeholder, hint, style }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span className="type-label" style={{ color: 'var(--fg-2)' }}>{label}</span>}
      <span style={{ position: 'relative' }}>
        <select value={value || ''} onChange={(e) => onChange?.(e.target.value)} style={{
          appearance: 'none', WebkitAppearance: 'none',
          width: '100%', height: 38, padding: '0 36px 0 12px',
          borderRadius: 8, border: '1px solid var(--border-2)',
          background: 'var(--surface-1)', color: 'var(--fg-1)',
          font: '400 14px var(--font-sans)', outline: 'none', cursor: 'pointer',
        }}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <Icon name="expand_more" size={20} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-3)', pointerEvents: 'none' }} />
      </span>
      {hint && <span className="type-caption">{hint}</span>}
    </label>
  );
}

// ---------------------------------------------------------------- Textarea
function Textarea({ label, value, onChange, rows = 4, placeholder, hint, style }) {
  const [focused, setFocused] = pUS(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && <span className="type-label" style={{ color: 'var(--fg-2)' }}>{label}</span>}
      <textarea rows={rows} value={value || ''} placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          padding: '10px 12px', borderRadius: 8,
          border: `1px solid ${focused ? 'var(--primary)' : 'var(--border-2)'}`,
          boxShadow: focused ? '0 0 0 3px var(--primary-tint)' : 'none',
          background: 'var(--surface-1)', color: 'var(--fg-1)',
          font: '400 14px var(--font-sans)', outline: 'none', resize: 'vertical',
          transition: 'border-color var(--dur-micro) var(--ease-std), box-shadow var(--dur-micro) var(--ease-std)',
        }} />
      {hint && <span className="type-caption">{hint}</span>}
    </label>
  );
}

// ---------------------------------------------------------------- Toggle
function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <span style={{
        width: 36, height: 20, borderRadius: 999,
        background: checked ? 'var(--primary)' : 'var(--slate-300)',
        position: 'relative', transition: 'background var(--dur-fast) var(--ease-std)',
      }}>
        <span style={{
          position: 'absolute', top: 2, left: checked ? 18 : 2,
          width: 16, height: 16, borderRadius: 999, background: '#fff',
          transition: 'left var(--dur-fast) var(--ease-std)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
      </span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} disabled={disabled} style={{ display: 'none' }} />
      {label && <span className="type-body-s" style={{ color: 'var(--fg-2)' }}>{label}</span>}
    </label>
  );
}

// ---------------------------------------------------------------- Checkbox
function Checkbox({ checked, onChange, label, indeterminate }) {
  const r = pUR(null);
  pUE(() => { if (r.current) r.current.indeterminate = !!indeterminate; }, [indeterminate]);
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
      <span style={{
        width: 16, height: 16, borderRadius: 4,
        border: `1.5px solid ${checked || indeterminate ? 'var(--primary)' : 'var(--border-2)'}`,
        background: checked || indeterminate ? 'var(--primary)' : 'var(--surface-1)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all var(--dur-micro) var(--ease-std)',
      }}>
        {checked && <Icon name="check" size={20} style={{ fontSize: 14, color: '#fff' }} />}
        {indeterminate && !checked && <span style={{ width: 8, height: 2, background: '#fff', borderRadius: 1 }} />}
      </span>
      <input ref={r} type="checkbox" checked={!!checked} onChange={(e) => onChange?.(e.target.checked)} style={{ display: 'none' }} />
      {label && <span className="type-body-s" style={{ color: 'var(--fg-2)' }}>{label}</span>}
    </label>
  );
}

// ---------------------------------------------------------------- Tabs
function Tabs({ value, onChange, items }) {
  return (
    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-1)' }}>
      {items.map(it => {
        const active = it.value === value;
        return (
          <button key={it.value} onClick={() => onChange?.(it.value)} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            padding: '10px 16px',
            font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
            color: active ? 'var(--fg-1)' : 'var(--fg-3)',
            borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
            marginBottom: -1, transition: 'all var(--dur-micro) var(--ease-std)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {it.icon && <Icon name={it.icon} size={20} style={{ color: active ? 'var(--primary)' : 'var(--fg-3)' }} />}
            {it.label}
            {it.count != null && (
              <span style={{
                font: '500 11px var(--font-mono)',
                padding: '1px 6px', borderRadius: 999,
                background: active ? 'var(--primary-tint)' : 'var(--bg-canvas)',
                color: active ? 'var(--primary-hover)' : 'var(--fg-3)',
                border: '1px solid var(--border-1)',
              }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- Modal
function Modal({ open, onClose, title, children, footer, width = 480 }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 50,
      background: 'rgba(15, 23, 42, 0.5)',
      backdropFilter: 'blur(2px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width, maxWidth: '100%', maxHeight: '90%',
        background: 'var(--surface-1)', borderRadius: 12,
        boxShadow: 'var(--shadow-3)', border: '1px solid var(--border-1)',
        display: 'flex', flexDirection: 'column',
        animation: 'mrasFade 180ms var(--ease-std)',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="type-h3">{title}</div>
          <button onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer', width: 32, height: 32, borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="close" size={20} style={{ color: 'var(--fg-3)' }} />
          </button>
        </div>
        <div style={{ padding: 20, overflow: 'auto' }}>{children}</div>
        {footer && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Drawer (right side-sheet)
function Drawer({ open, onClose, title, eyebrow, children, footer, width = 440 }) {
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 50 }} onClick={onClose}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.4)' }} />
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width, maxWidth: '100%',
        background: 'var(--surface-1)', borderLeft: '1px solid var(--border-1)',
        boxShadow: 'var(--shadow-3)',
        display: 'flex', flexDirection: 'column',
        animation: 'mrasSlideIn 220ms var(--ease-std)',
      }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            {eyebrow && <div className="type-eyebrow" style={{ marginBottom: 2 }}>{eyebrow}</div>}
            <div className="type-h3">{title}</div>
          </div>
          <button onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer', width: 32, height: 32, borderRadius: 6 }}>
            <Icon name="close" size={20} style={{ color: 'var(--fg-3)' }} />
          </button>
        </div>
        <div style={{ padding: 20, overflow: 'auto', flex: 1 }}>{children}</div>
        {footer && (
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-1)', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Toast
function Toast({ tone = 'info', title, description, icon, onClose }) {
  const map = {
    info:    { bg: 'var(--surface-1)', accent: 'var(--info)',     di: icon ?? 'info' },
    success: { bg: 'var(--surface-1)', accent: 'var(--success)',  di: icon ?? 'check_circle' },
    warning: { bg: 'var(--surface-1)', accent: 'var(--warning)',  di: icon ?? 'warning' },
    danger:  { bg: 'var(--surface-1)', accent: 'var(--danger)',   di: icon ?? 'priority_high' },
  };
  const t = map[tone];
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      padding: '12px 14px', borderRadius: 10, minWidth: 320, maxWidth: 420,
      background: t.bg, border: '1px solid var(--border-1)', boxShadow: 'var(--shadow-2)',
      borderLeft: `3px solid ${t.accent}`,
    }}>
      <Icon name={t.di} size={20} style={{ color: t.accent, marginTop: 1 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div className="type-label" style={{ color: 'var(--fg-1)' }}>{title}</div>}
        {description && <div className="type-caption" style={{ marginTop: 2 }}>{description}</div>}
      </div>
      {onClose && (
        <button onClick={onClose} style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 2 }}>
          <Icon name="close" size={20} style={{ color: 'var(--fg-3)', fontSize: 16 }} />
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- States
function EmptyState({ icon = 'inbox', title, description, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 24px', gap: 10 }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={32} style={{ color: 'var(--fg-3)' }} />
      </div>
      {title && <div className="type-h4" style={{ marginTop: 4 }}>{title}</div>}
      {description && <div className="type-body-s" style={{ maxWidth: 340 }}>{description}</div>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

function Skeleton({ w = '100%', h = 14, r = 6, style }) {
  return <span style={{
    display: 'inline-block', width: w, height: h, borderRadius: r,
    background: 'linear-gradient(90deg, var(--bg-canvas), var(--bg-hover), var(--bg-canvas))',
    backgroundSize: '200% 100%', animation: 'mrasShimmer 1.4s linear infinite',
    ...style,
  }} />;
}

function LoadingRows({ rows = 4 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Skeleton w={32} h={32} r={999} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Skeleton w="40%" h={12} />
            <Skeleton w="80%" h={10} />
          </div>
          <Skeleton w={60} h={20} r={999} />
        </div>
      ))}
    </div>
  );
}

function ErrorState({ title = 'Couldn\'t load this.', description, onRetry }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 24px', gap: 10 }}>
      <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--danger-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name="error" size={32} style={{ color: 'var(--danger)' }} />
      </div>
      <div className="type-h4">{title}</div>
      {description && <div className="type-body-s" style={{ maxWidth: 340 }}>{description}</div>}
      {onRetry && <Button kind="secondary" icon="refresh" onClick={onRetry} style={{ marginTop: 6 }}>Try again</Button>}
    </div>
  );
}

// ---------------------------------------------------------------- DataTable
function DataTable({ columns, rows, selectable, onRowClick, dense, footer, totalLabel, page = 1, pageCount = 1, onPage }) {
  const [sort, setSort] = pUS({ col: null, dir: 'asc' });
  const [selected, setSelected] = pUS(new Set());

  const sorted = pUM(() => {
    if (!sort.col) return rows;
    const c = sort.col;
    return [...rows].sort((a, b) => {
      const av = a[c], bv = b[c];
      if (av == null) return 1; if (bv == null) return -1;
      const r = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? r : -r;
    });
  }, [rows, sort]);

  const allChecked = selected.size === rows.length && rows.length > 0;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontVariantNumeric: 'tabular-nums' }}>
          <thead>
            <tr>
              {selectable && (
                <th style={thStyle(dense)}>
                  <Checkbox checked={allChecked} indeterminate={someChecked}
                    onChange={(v) => setSelected(v ? new Set(rows.map((_, i) => i)) : new Set())} />
                </th>
              )}
              {columns.map(c => (
                <th key={c.key} style={{ ...thStyle(dense), textAlign: c.align || 'left', width: c.width }}
                  onClick={c.sortable ? () => setSort(s => ({ col: c.key, dir: s.col === c.key && s.dir === 'asc' ? 'desc' : 'asc' })) : undefined}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, cursor: c.sortable ? 'pointer' : 'default' }}>
                    {c.label}
                    {c.sortable && sort.col === c.key && (
                      <Icon name={sort.dir === 'asc' ? 'arrow_upward' : 'arrow_downward'} size={20} style={{ fontSize: 14, color: 'var(--primary)' }} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr key={i} onClick={() => onRowClick?.(row)}
                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = ''}>
                {selectable && (
                  <td style={tdStyle(dense)} onClick={(e) => e.stopPropagation()}>
                    <Checkbox checked={selected.has(i)} onChange={(v) => {
                      const s = new Set(selected); v ? s.add(i) : s.delete(i); setSelected(s);
                    }} />
                  </td>
                )}
                {columns.map(c => (
                  <td key={c.key} style={{ ...tdStyle(dense), textAlign: c.align || 'left' }}>
                    {c.render ? c.render(row[c.key], row) : (
                      <span style={{ font: c.mono ? '500 13px var(--font-mono)' : '400 13px var(--font-sans)', color: c.muted ? 'var(--fg-3)' : 'var(--fg-1)' }}>
                        {row[c.key]}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(footer || onPage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid var(--border-1)' }}>
          <span className="type-caption">{totalLabel || `${rows.length} rows`}</span>
          {onPage && pageCount > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button disabled={page <= 1} onClick={() => onPage?.(page - 1)} style={pgBtn(page <= 1)}>
                <Icon name="chevron_left" size={20} />
              </button>
              <span className="type-mono" style={{ minWidth: 70, textAlign: 'center' }}>{page} / {pageCount}</span>
              <button disabled={page >= pageCount} onClick={() => onPage?.(page + 1)} style={pgBtn(page >= pageCount)}>
                <Icon name="chevron_right" size={20} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const thStyle = (dense) => ({
  font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '0.04em',
  color: 'var(--fg-3)', padding: dense ? '8px 12px' : '12px 14px',
  borderBottom: '1px solid var(--border-1)', background: 'var(--bg-canvas)',
  position: 'sticky', top: 0,
});
const tdStyle = (dense) => ({
  padding: dense ? '8px 12px' : '12px 14px',
  borderBottom: '1px solid var(--border-1)',
  font: '400 13px var(--font-sans)', color: 'var(--fg-1)',
});
const pgBtn = (disabled) => ({
  width: 28, height: 28, borderRadius: 6,
  border: '1px solid var(--border-1)', background: 'var(--surface-1)',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1, color: 'var(--fg-2)',
});

// ---------------------------------------------------------------- Stepper
function Stepper({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%' }}>
      {steps.map((s, i) => {
        const done = i < current, active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 999,
                background: done ? 'var(--primary)' : active ? 'var(--primary-tint)' : 'var(--surface-1)',
                border: active ? '1.5px solid var(--primary)' : done ? 'none' : '1.5px solid var(--border-2)',
                color: done ? '#fff' : active ? 'var(--primary-hover)' : 'var(--fg-3)',
                font: '600 12px var(--font-mono)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {done ? <Icon name="check" size={20} style={{ fontSize: 16, color: '#fff' }} /> : i + 1}
              </div>
              <span className="type-label" style={{ color: active ? 'var(--fg-1)' : done ? 'var(--fg-2)' : 'var(--fg-3)' }}>{s}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, background: done ? 'var(--primary)' : 'var(--border-1)', margin: '0 14px' }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------- FileUpload (drop zone)
function FileUpload({ label, accept, hint, files: ctrlFiles, onFiles }) {
  const [over, setOver] = pUS(false);
  const [files, setFiles] = pUS(ctrlFiles ?? []);
  const setBoth = (f) => { setFiles(f); onFiles?.(f); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <div className="type-label" style={{ color: 'var(--fg-2)' }}>{label}</div>}
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault(); setOver(false);
          const list = Array.from(e.dataTransfer.files).map(f => ({ name: f.name, size: f.size, type: f.type }));
          setBoth([...files, ...list]);
        }}
        style={{
          padding: '24px 16px', borderRadius: 10,
          border: `1.5px dashed ${over ? 'var(--primary)' : 'var(--border-2)'}`,
          background: over ? 'var(--primary-tint)' : 'var(--bg-canvas)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center',
          transition: 'all var(--dur-micro) var(--ease-std)',
        }}>
        <Icon name="upload_file" size={32} style={{ color: 'var(--fg-3)' }} />
        <div className="type-label" style={{ color: 'var(--fg-1)' }}>Drag files here or <a href="#" onClick={(e) => e.preventDefault()} style={{ color: 'var(--primary)' }}>browse</a></div>
        {hint && <div className="type-caption">{hint}</div>}
      </div>
      {files.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {files.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', border: '1px solid var(--border-1)', borderRadius: 8, background: 'var(--surface-1)' }}>
              <Icon name={f.type?.includes('image') ? 'image' : 'description'} size={20} style={{ color: 'var(--primary)' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="type-body-s" style={{ color: 'var(--fg-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                <div className="type-caption">{f.size ? `${(f.size/1024).toFixed(1)} KB` : 'Ready'}</div>
              </div>
              <button onClick={() => setBoth(files.filter((_, j) => j !== i))} style={{ border: 0, background: 'transparent', cursor: 'pointer' }}>
                <Icon name="close" size={20} style={{ color: 'var(--fg-3)' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------- DateField (simple)
function DateField({ label, value, onChange, hint }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <span className="type-label" style={{ color: 'var(--fg-2)' }}>{label}</span>}
      <span style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: 38, padding: '0 12px',
        borderRadius: 8, border: '1px solid var(--border-2)',
        background: 'var(--surface-1)',
      }}>
        <Icon name="calendar_today" size={20} style={{ color: 'var(--fg-3)' }} />
        <input type="date" value={value || ''} onChange={(e) => onChange?.(e.target.value)} style={{
          border: 0, outline: 'none', background: 'transparent',
          font: '400 14px var(--font-sans)', color: 'var(--fg-1)', flex: 1,
        }} />
      </span>
      {hint && <span className="type-caption">{hint}</span>}
    </label>
  );
}

// ---------------------------------------------------------------- Mini Calendar
function MiniCalendar({ value, onChange, marks = {} }) {
  const today = new Date();
  const [view, setView] = pUS(() => {
    const d = value ? new Date(value) : today;
    return { y: d.getFullYear(), m: d.getMonth() };
  });
  const monthName = new Date(view.y, view.m).toLocaleString('en', { month: 'long' });
  const first = new Date(view.y, view.m, 1).getDay();
  const days = new Date(view.y, view.m + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  const iso = (d) => `${view.y}-${String(view.m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  const sel = value;
  return (
    <div style={{ width: 260, padding: 12, background: 'var(--surface-1)', border: '1px solid var(--border-1)', borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <button onClick={() => setView(v => ({ y: v.m === 0 ? v.y - 1 : v.y, m: (v.m + 11) % 12 }))} style={navBtn}><Icon name="chevron_left" size={20} /></button>
        <span className="type-label" style={{ color: 'var(--fg-1)' }}>{monthName} {view.y}</span>
        <button onClick={() => setView(v => ({ y: v.m === 11 ? v.y + 1 : v.y, m: (v.m + 1) % 12 }))} style={navBtn}><Icon name="chevron_right" size={20} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} style={{ textAlign: 'center', font: '600 10px var(--font-sans)', color: 'var(--fg-3)', textTransform: 'uppercase', padding: '4px 0' }}>{d}</div>
        ))}
        {cells.map((d, i) => {
          if (d == null) return <div key={i} />;
          const isToday = view.y === today.getFullYear() && view.m === today.getMonth() && d === today.getDate();
          const isSel = sel === iso(d);
          const mark = marks[iso(d)];
          return (
            <button key={i} onClick={() => onChange?.(iso(d))} style={{
              width: 32, height: 32, borderRadius: 8,
              border: isToday && !isSel ? '1px solid var(--primary)' : 'none',
              background: isSel ? 'var(--primary)' : mark ? 'var(--primary-tint)' : 'transparent',
              color: isSel ? '#fff' : 'var(--fg-1)',
              font: '500 13px var(--font-mono)', cursor: 'pointer',
              position: 'relative',
            }}>
              {d}
              {mark && !isSel && <span style={{ position: 'absolute', bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: 999, background: 'var(--primary)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
const navBtn = { width: 24, height: 24, border: 0, background: 'transparent', cursor: 'pointer', borderRadius: 6, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-3)' };

// ---------------------------------------------------------------- LineChart
function LineChart({ data, width = 480, height = 160, color = 'var(--primary)', fill = true, yMin, yMax, xLabels, refLines = [], unit }) {
  const min = yMin ?? Math.min(...data);
  const max = yMax ?? Math.max(...data);
  const span = max - min || 1;
  const pad = { l: 36, r: 12, t: 10, b: 22 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const points = data.map((v, i) => {
    const x = pad.l + (i / (data.length - 1)) * w;
    const y = pad.t + (1 - (v - min) / span) * h;
    return [x, y];
  });
  const pathLine = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const pathArea = fill ? `${pathLine} L ${pad.l + w} ${pad.t + h} L ${pad.l} ${pad.t + h} Z` : '';
  const gridY = 4;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="mrasLineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: gridY + 1 }).map((_, i) => {
        const y = pad.t + (i / gridY) * h;
        const v = (max - (i / gridY) * span);
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={pad.l + w} y2={y} stroke="var(--border-1)" strokeDasharray={i === gridY ? '0' : '2 3'} />
            <text x={pad.l - 6} y={y + 3} textAnchor="end" style={{ font: '400 10px var(--font-mono)', fill: 'var(--fg-3)' }}>{v.toFixed(0)}{unit || ''}</text>
          </g>
        );
      })}
      {refLines.map((r, i) => {
        const y = pad.t + (1 - (r.value - min) / span) * h;
        return (
          <g key={i}>
            <line x1={pad.l} y1={y} x2={pad.l + w} y2={y} stroke={r.color || 'var(--warning)'} strokeDasharray="4 3" strokeWidth="1" />
            {r.label && <text x={pad.l + w} y={y - 4} textAnchor="end" style={{ font: '500 10px var(--font-sans)', fill: r.color || 'var(--warning)' }}>{r.label}</text>}
          </g>
        );
      })}
      {fill && <path d={pathArea} fill="url(#mrasLineFill)" />}
      <path d={pathLine} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 3.5 : 0} fill={color} />
      ))}
      {xLabels && xLabels.map((l, i) => {
        const x = pad.l + (i / (xLabels.length - 1)) * w;
        return <text key={i} x={x} y={height - 6} textAnchor="middle" style={{ font: '400 10px var(--font-mono)', fill: 'var(--fg-3)' }}>{l}</text>;
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- BarChart
function BarChart({ data, labels, width = 480, height = 160, color = 'var(--primary)', max }) {
  const m = max ?? Math.max(...data);
  const pad = { l: 32, r: 8, t: 10, b: 22 };
  const w = width - pad.l - pad.r;
  const h = height - pad.t - pad.b;
  const barW = (w / data.length) * 0.62;
  const step = w / data.length;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[0, 0.5, 1].map((p, i) => {
        const y = pad.t + p * h;
        return <line key={i} x1={pad.l} y1={y} x2={pad.l + w} y2={y} stroke="var(--border-1)" strokeDasharray={p === 1 ? '0' : '2 3'} />;
      })}
      {data.map((v, i) => {
        const x = pad.l + i * step + (step - barW) / 2;
        const bh = (v / m) * h;
        const y = pad.t + h - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} fill={color} rx="3" />
            {labels && <text x={x + barW / 2} y={height - 6} textAnchor="middle" style={{ font: '400 10px var(--font-mono)', fill: 'var(--fg-3)' }}>{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

// ---------------------------------------------------------------- Donut
function Donut({ segments, size = 130, thickness = 16, total }) {
  const sum = total ?? segments.reduce((a, s) => a + s.value, 0);
  const r = (size - thickness) / 2;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke="var(--bg-hover)" strokeWidth={thickness} fill="none" />
        {segments.map((s, i) => {
          const len = (s.value / sum) * circ;
          const off = circ - acc;
          acc += len;
          return <circle key={i} cx={size/2} cy={size/2} r={r} stroke={s.color} strokeWidth={thickness} fill="none" strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={off} />;
        })}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------- Command Palette
function CommandPalette({ open, onClose, items, placeholder = 'Search patients, drugs, IDs…' }) {
  const [q, setQ] = pUS('');
  const [sel, setSel] = pUS(0);
  const filtered = pUM(() => {
    const f = q.toLowerCase();
    return items.filter(it => !f || it.title.toLowerCase().includes(f) || (it.sub || '').toLowerCase().includes(f)).slice(0, 8);
  }, [q, items]);
  pUE(() => { setSel(0); }, [q]);
  if (!open) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 80, background: 'rgba(15,23,42,0.45)', backdropFilter: 'blur(2px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 560, maxWidth: '90%', background: 'var(--surface-1)', borderRadius: 12, border: '1px solid var(--border-1)', boxShadow: 'var(--shadow-3)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--border-1)' }}>
          <Icon name="search" size={20} style={{ color: 'var(--fg-3)' }} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} style={{
            flex: 1, border: 0, outline: 'none', background: 'transparent',
            font: '400 15px var(--font-sans)', color: 'var(--fg-1)',
          }} />
          <kbd style={{ font: '500 11px var(--font-mono)', color: 'var(--fg-3)', border: '1px solid var(--border-1)', borderRadius: 4, padding: '2px 6px' }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: 360, overflow: 'auto', padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 16px', textAlign: 'center' }}>
              <div className="type-body-s">No matches for "{q}".</div>
            </div>
          )}
          {filtered.map((it, i) => (
            <div key={i} onMouseEnter={() => setSel(i)} onClick={() => { onClose?.(); it.onSelect?.(); }} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8,
              background: i === sel ? 'var(--bg-selected)' : 'transparent', cursor: 'pointer',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={it.icon || 'search'} size={20} style={{ color: 'var(--primary)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="type-label" style={{ color: 'var(--fg-1)' }}>{it.title}</div>
                {it.sub && <div className="type-caption">{it.sub}</div>}
              </div>
              {it.kbd && <kbd style={{ font: '500 11px var(--font-mono)', color: 'var(--fg-3)', border: '1px solid var(--border-1)', borderRadius: 4, padding: '2px 6px' }}>{it.kbd}</kbd>}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, padding: '8px 12px', borderTop: '1px solid var(--border-1)', background: 'var(--bg-canvas)' }}>
          <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><kbd style={kbdSm}>↑</kbd><kbd style={kbdSm}>↓</kbd> Navigate</span>
          <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><kbd style={kbdSm}>↵</kbd> Open</span>
          <span className="type-caption" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}><kbd style={kbdSm}>⌘K</kbd> Toggle</span>
        </div>
      </div>
    </div>
  );
}
const kbdSm = { font: '500 10px var(--font-mono)', color: 'var(--fg-3)', border: '1px solid var(--border-1)', borderRadius: 3, padding: '1px 4px', background: 'var(--surface-1)' };

// ---------------------------------------------------------------- Tooltip / Tag list / Progress
function Progress({ value, tone = 'primary', height = 6, label }) {
  const map = { primary: 'var(--primary)', success: 'var(--success)', warning: 'var(--warning)', danger: 'var(--danger)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <div style={{ display: 'flex', justifyContent: 'space-between' }}><span className="type-caption">{label}</span><span className="type-mono" style={{ fontSize: 12 }}>{value}%</span></div>}
      <div style={{ width: '100%', height, borderRadius: 999, background: 'var(--bg-hover)', overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: map[tone], borderRadius: 999, transition: 'width var(--dur-medium) var(--ease-std)' }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Global animation styles
function GlobalAnims() {
  return (
    <style>{`
      @keyframes mrasShimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
      @keyframes mrasFade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes mrasSlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      @keyframes mrasPulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.06); opacity: 0.8; } }
    `}</style>
  );
}

Object.assign(window, {
  Input, Select, Textarea, Toggle, Checkbox, Tabs,
  Modal, Drawer, Toast,
  EmptyState, Skeleton, LoadingRows, ErrorState,
  DataTable, Stepper, FileUpload,
  DateField, MiniCalendar,
  LineChart, BarChart, Donut, Progress,
  CommandPalette, GlobalAnims,
});
