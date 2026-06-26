/* eslint-disable */
// Reusable frame: AppBar + Sidebar + scrollable body, sized for a fixed artboard.

function ScreenFrame({ role = 'doctor', screen, children, height = 760, collapseSidebar = false }) {
  return (
    <div style={{
      width: '100%', height,
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg-canvas)',
      overflow: 'hidden',
      borderRadius: 12,
      border: '1px solid var(--border-1)',
    }}>
      <AppBar role={role} onRoleChange={() => {}} onMenu={() => {}} />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar role={role} screen={screen} onNavigate={() => {}} collapsed={collapseSidebar} />
        <main style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

// Compact body — no sidebar, useful for modal-like screens in the canvas
function PlainFrame({ children, height = 760 }) {
  return (
    <div style={{
      width: '100%', height,
      background: 'var(--bg-canvas)', borderRadius: 12,
      border: '1px solid var(--border-1)', overflow: 'auto',
    }}>{children}</div>
  );
}

Object.assign(window, { ScreenFrame, PlainFrame });
