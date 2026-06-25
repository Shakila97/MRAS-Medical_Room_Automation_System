/* eslint-disable */
// Role Layout — AppBar + Sidebar + scrollable content area
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Sidebar, NAV_BY_ROLE } from './Chrome.jsx';

// Role → default first screen id
const ROLE_HOME = {
  doctor:   'dashboard',
  employee: 'home',
  pharmacy: 'dashboard',
  admin:    'console',
};

// Role → route prefix
const ROLE_PREFIX = {
  doctor:   '/doctor',
  employee: '/employee',
  pharmacy: '/pharmacy',
  admin:    '/admin',
};

export function RoleLayout({ role, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // derive active screen from URL
  const pathParts = location.pathname.split('/');
  const activeScreen = pathParts[2] || ROLE_HOME[role];

  function handleNavigate(screenId) {
    navigate(`${ROLE_PREFIX[role]}/${screenId}`);
  }

  function handleRoleChange(newRole) {
    navigate(`${ROLE_PREFIX[newRole]}/${ROLE_HOME[newRole]}`);
  }

  return (
    <div style={{
      width: '100%', height: '100vh',
      display: 'flex', flexDirection: 'column',
      background: 'var(--bg-canvas)',
    }}>
      <AppBar
        role={role}
        onRoleChange={handleRoleChange}
        onMenu={() => setCollapsed(c => !c)}
      />
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        <Sidebar
          role={role}
          screen={activeScreen}
          onNavigate={handleNavigate}
          collapsed={collapsed}
        />
        <main style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
          <div style={{ maxWidth: 'var(--content-max)', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
