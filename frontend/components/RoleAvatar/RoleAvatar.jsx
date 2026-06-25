// MRAS · RoleAvatar — accent-coloured initials avatar for role attribution.

export function RoleAvatar({ name, role = 'doctor', size = 32, style }) {
  const roleColor = {
    doctor:   'var(--role-doctor)',
    employee: 'var(--role-employee)',
    pharmacy: 'var(--role-pharmacy)',
    admin:    'var(--role-admin)',
  }[role] || 'var(--primary)';
  const initials = (name || '?').split(' ').map((s) => s[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: roleColor, color: '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      font: `600 ${Math.round(size * 0.4)}px var(--font-sans)`,
      flex: '0 0 auto', ...style,
    }}>{initials}</div>
  );
}
