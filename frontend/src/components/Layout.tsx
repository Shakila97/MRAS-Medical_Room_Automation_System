// @ts-nocheck
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Box, Drawer, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Typography, Avatar, Chip, Divider, Tooltip, IconButton
} from '@mui/material'
import {
  Dashboard, People, MedicalServices, Inventory2,
  Psychology, Logout, QrCode, Settings
} from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

const DRAWER_WIDTH = 240

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/dashboard', roles: ['doctor', 'admin', 'employee', 'pharmacy_staff'] },
  { label: 'Patients', icon: <People />, path: '/patients', roles: ['doctor', 'admin'] },
  { label: 'Consultations', icon: <MedicalServices />, path: '/consultations', roles: ['doctor', 'admin'] },
  { label: 'QR Check-in', icon: <QrCode />, path: '/checkin', roles: ['doctor', 'admin', 'employee'] },
  { label: 'Inventory', icon: <Inventory2 />, path: '/inventory', roles: ['doctor', 'pharmacy_staff', 'admin'], soon: true },
  { label: 'JRISSI / AI', icon: <Psychology />, path: '/ai', roles: ['doctor'], soon: true },
]

const ROLE_COLORS: Record<string, string> = {
  doctor: 'primary',
  admin: 'error',
  employee: 'success',
  pharmacy_staff: 'warning',
}

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const handleLogout = () => { logout(); navigate('/login') }

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  )

  const initials = user?.full_name
    .split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.paper',
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'primary.main', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MedicalServices sx={{ color: 'white', fontSize: 20 }} />
            </Box>
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600 }} lineHeight={1}>MRAS v3.0</Typography>
              <Typography variant="caption" color="text.secondary">Medical Room System</Typography>
            </Box>
          </Box>
        </Box>

        {/* Nav */}
        <Box sx={{ flex: 1, py: 1.5 }}>
          <List dense disablePadding>
            {visibleItems.map((item) => (
              <ListItem key={item.path} disablePadding sx={{ px: 1, mb: 0.5 }}>
                <Tooltip title={item.soon ? 'Coming soon' : ''} placement="right">
                  <span style={{ width: '100%' }}>
                    <ListItemButton
                      component={item.soon ? 'div' : Link}
                      to={item.soon ? undefined : item.path}
                      selected={pathname === item.path}
                      disabled={item.soon}
                      sx={{
                        borderRadius: 2,
                        '&.Mui-selected': { bgcolor: 'primary.50', color: 'primary.main' },
                        '&.Mui-selected .MuiListItemIcon-root': { color: 'primary.main' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary' }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: 14 }}
                      />
                      {item.soon && (
                        <Chip label="Soon" size="small" sx={{ height: 18, fontSize: 10 }} />
                      )}
                    </ListItemButton>
                  </span>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* User area */}
        <Box sx={{ p: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, p: 1.5, borderRadius: 2, bgcolor: 'grey.50' }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
              {initials}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }} noWrap>{user?.full_name}</Typography>
              <Chip
                label={user?.role.replace('_', ' ')}
                size="small"
                color={ROLE_COLORS[user?.role || 'employee'] as any}
                sx={{ height: 16, fontSize: 10, mt: 0.3 }}
              />
            </Box>
            <IconButton size="small" onClick={handleLogout} title="Logout">
              <Logout fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flex: 1, bgcolor: '#f5f7fa', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </Box>
  )
}