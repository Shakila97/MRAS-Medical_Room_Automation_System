/* eslint-disable */
// MRAS Dashboard chrome — app bar, sidebar, role switcher

const NAV_BY_ROLE = {
  doctor: [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'patients',  icon: 'groups',    label: 'Patients' },
    { id: 'consultations', icon: 'stethoscope', label: 'Consultations' },
    { id: 'jrissi',    icon: 'psychology', label: 'JRISSI watch' },
    { id: 'forecasts', icon: 'insights',  label: 'Forecasts' },
    { id: 'reports',   icon: 'description', label: 'Reports' },
  ],
  employee: [
    { id: 'home',    icon: 'home',         label: 'Home' },
    { id: 'checkin', icon: 'qr_code_2',    label: 'Check-in' },
    { id: 'health',  icon: 'monitor_heart', label: 'My health' },
    { id: 'history', icon: 'history',      label: 'History' },
  ],
  pharmacy: [
    { id: 'dashboard', icon: 'dashboard',     label: 'Dashboard' },
    { id: 'inventory', icon: 'pill',          label: 'Inventory' },
    { id: 'grn',       icon: 'inventory_2',   label: 'GRN' },
    { id: 'expiry',    icon: 'schedule',      label: 'Expiry watch' },
    { id: 'reports',   icon: 'description',   label: 'Reports' },
  ],
  admin: [
    { id: 'console',   icon: 'dashboard',          label: 'Console' },
    { id: 'users',     icon: 'group',              label: 'Users & roles' },
    { id: 'audit',     icon: 'fact_check',         label: 'Audit log' },
    { id: 'services',  icon: 'cloud',              label: 'Services' },
    { id: 'settings',  icon: 'settings',           label: 'Settings' },
  ],
};

const ROLE_META = {
  doctor:   { name: 'Dr. Withana',         accent: 'var(--role-doctor)',   sub: 'Lead clinician' },
  employee: { name: 'B.W.S.S. Nawarathna', accent: 'var(--role-employee)', sub: 'Engineering · SIS/24/B2/39' },
  pharmacy: { name: 'L. Koralage',         accent: 'var(--role-pharmacy)', sub: 'Pharmacy staff' },
  admin:    { name: 'D. Anuradha',         accent: 'var(--role-admin)',    sub: 'System administrator' },
};

function AppBar({ role, onRoleChange, onMenu }) {
  const meta = ROLE_META[role];
  return (
    <div style={{
      height: 'var(--appbar-h)',
      borderBottom: '1px solid var(--border-1)',
      background: 'rgba(248, 250, 252, 0.85)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 12,
      position: 'sticky', top: 0, zIndex: 10,
    }}>
      <button onClick={onMenu} style={{
        border: 0, background: 'transparent', cursor: 'pointer',
        width: 36, height: 36, borderRadius: 8,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="menu" size={20} />
      </button>
      <img src="../../assets/mras-wordmark.svg" alt="MRAS" style={{ height: 28 }} />
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'var(--surface-1)', border: '1px solid var(--border-1)',
        borderRadius: 8, padding: '0 12px', width: 280, height: 34,
      }}>
        <Icon name="search" size={20} style={{ color: 'var(--fg-3)' }} />
        <input placeholder="Search patients, drugs, IDs…" style={{
          border: 0, outline: 'none', flex: 1,
          font: '400 13px var(--font-sans)', background: 'transparent', color: 'var(--fg-1)',
        }} />
        <kbd style={{ font: '500 10px var(--font-mono)', color: 'var(--fg-3)', border: '1px solid var(--border-1)', borderRadius: 4, padding: '1px 5px' }}>⌘K</kbd>
      </div>

      {/* Notifications */}
      <button style={{
        border: 0, background: 'transparent', cursor: 'pointer',
        width: 36, height: 36, borderRadius: 8, position: 'relative',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name="notifications" size={20} />
        <span style={{
          position: 'absolute', top: 6, right: 7,
          width: 8, height: 8, borderRadius: 999, background: 'var(--danger)',
          boxShadow: '0 0 0 2px var(--bg-canvas)',
        }} />
      </button>

      {/* Role switcher + avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <select value={role} onChange={(e) => onRoleChange(e.target.value)} style={{
          border: '1px solid var(--border-2)', borderRadius: 8, padding: '6px 10px',
          font: '500 12px var(--font-sans)', color: 'var(--fg-2)', background: 'var(--surface-1)', outline: 'none',
        }}>
          <option value="doctor">Doctor view</option>
          <option value="employee">Employee view</option>
          <option value="pharmacy">Pharmacy view</option>
          <option value="admin">Admin view</option>
        </select>
        <Avatar name={meta.name} size={32} color={meta.accent} />
      </div>
    </div>
  );
}

function Sidebar({ role, screen, onNavigate, collapsed }) {
  const items = NAV_BY_ROLE[role];
  const meta = ROLE_META[role];
  const w = collapsed ? 'var(--sidebar-w-c)' : 'var(--sidebar-w)';
  return (
    <aside style={{
      width: w, flex: `0 0 ${w}`,
      borderRight: '1px solid var(--border-1)',
      background: 'var(--surface-1)',
      display: 'flex', flexDirection: 'column',
      transition: 'width var(--dur-medium) var(--ease-std)',
      overflow: 'hidden',
    }}>
      {/* Role banner */}
      <div style={{
        margin: '14px 12px 4px', padding: collapsed ? '8px 8px' : '10px 12px',
        borderRadius: 10, background: 'var(--bg-canvas)', border: '1px solid var(--border-1)',
        display: 'flex', alignItems: 'center', gap: 10, minHeight: 48,
      }}>
        <div style={{ width: 6, alignSelf: 'stretch', borderRadius: 3, background: meta.accent }} />
        {!collapsed && (
          <div style={{ minWidth: 0 }}>
            <div className="type-label" style={{ color: 'var(--fg-1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meta.name}</div>
            <div className="type-caption" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{meta.sub}</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', padding: '12px 8px', gap: 2, flex: 1 }}>
        {items.map(it => {
          const active = it.id === screen;
          return (
            <button key={it.id} onClick={() => onNavigate(it.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: collapsed ? '10px 0' : '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              border: 0, background: active ? 'var(--bg-selected)' : 'transparent',
              borderRadius: 8, cursor: 'pointer',
              color: active ? 'var(--primary-hover)' : 'var(--fg-2)',
              font: active ? '600 13px var(--font-sans)' : '500 13px var(--font-sans)',
              textAlign: 'left',
              position: 'relative',
              transition: 'background var(--dur-micro) var(--ease-std)',
            }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              {active && <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 3, background: 'var(--primary)' }} />}
              <Icon name={it.icon} size={20} style={{ color: active ? 'var(--primary)' : 'var(--fg-3)' }} />
              {!collapsed && <span>{it.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border-1)' }}>
        <button style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', gap: 10,
          padding: collapsed ? 10 : '10px 12px', border: 0, borderRadius: 8, background: 'transparent', cursor: 'pointer',
          color: 'var(--fg-3)', font: '500 13px var(--font-sans)',
        }}>
          <Icon name="settings" size={20} />
          {!collapsed && 'Settings'}
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, { AppBar, Sidebar, NAV_BY_ROLE, ROLE_META });
