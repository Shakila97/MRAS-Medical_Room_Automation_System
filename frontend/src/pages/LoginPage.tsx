// @ts-nocheck
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, CircularProgress, InputAdornment, IconButton, Divider
} from '@mui/material'
import { Visibility, VisibilityOff, LocalHospital } from '@mui/icons-material'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
      <Box sx={{ width: '100%', maxWidth: 420, px: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 2, bgcolor: 'primary.main', mb: 2 }}>
            <LocalHospital sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>MRAS v3.0</Typography>
          <Typography variant="body2" color="text.secondary">Medical Room Automation System</Typography>
        </Box>

        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }} gutterBottom>Sign in</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Enter your credentials to access the system</Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Email address" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required sx={{ mb: 2 }} autoFocus />
              <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'}
                value={password} onChange={(e) => setPassword(e.target.value)} required sx={{ mb: 3 }}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }
                }}
              />
              <Button fullWidth type="submit" variant="contained" size="large" disabled={loading} sx={{ borderRadius: 2, py: 1.2 }}>
                {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign in'}
              </Button>
            </Box>

            <Divider sx={{ my: 2.5 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                New staff member?{' '}
                <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>Create account</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Card elevation={0} sx={{ mt: 2, bgcolor: '#e3f2fd', border: 'none', borderRadius: 2 }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography variant="caption" color="primary" sx={{ fontWeight: 500 }} display="block" gutterBottom>Demo credentials</Typography>
            <Typography variant="caption" color="text.secondary" display="block">Doctor: doctor@mras.com / secure123</Typography>
            <Typography variant="caption" color="text.secondary" display="block">Employee: employee@mras.com / secure123</Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}