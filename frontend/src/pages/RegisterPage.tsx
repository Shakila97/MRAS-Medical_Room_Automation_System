// @ts-nocheck
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Card, CardContent, TextField, Button, Typography,
  Alert, CircularProgress, MenuItem, InputAdornment,
  IconButton, Stepper, Step, StepLabel
} from '@mui/material'
import { Visibility, VisibilityOff, LocalHospital, CheckCircle } from '@mui/icons-material'
import { authApi } from '../api/auth'
import type { UserRole } from '../types'

const ROLES = [
  { value: 'employee' as UserRole, label: 'Employee', desc: 'Access your own health profile' },
  { value: 'doctor' as UserRole, label: 'Doctor', desc: 'Manage patients and consultations' },
  { value: 'pharmacy_staff' as UserRole, label: 'Pharmacy Staff', desc: 'Manage inventory and prescriptions' },
  { value: 'admin' as UserRole, label: 'Admin', desc: 'System administration' },
]

export default function RegisterPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ full_name: '', email: '', employee_id: '', role: 'employee' as UserRole, password: '', confirmPassword: '' })
  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }))

  const handleNext = () => {
    setError('')
    if (step === 0 && (!form.full_name.trim() || !form.email.trim())) { setError('Please fill in all required fields'); return }
    if (step === 1) {
      if (!form.password) { setError('Password is required'); return }
      if (form.password.length < 8) { setError('Min 8 characters'); return }
      if (!/\d/.test(form.password)) { setError('Must contain at least one number'); return }
      if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return }
    }
    setStep((s) => s + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.register({ full_name: form.full_name, email: form.email, employee_id: form.employee_id || undefined, role: form.role, password: form.password })
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2000)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed')
      setStep(0)
    } finally {
      setLoading(false)
    }
  }

  if (success) return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
      <Box sx={{ textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }} gutterBottom>Account created!</Typography>
        <Typography color="text.secondary">Redirecting to login…</Typography>
      </Box>
    </Box>
  )

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#f5f7fa' }}>
      <Box sx={{ width: '100%', maxWidth: 460, px: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 56, height: 56, borderRadius: 2, bgcolor: 'primary.main', mb: 2 }}>
            <LocalHospital sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Create account</Typography>
          <Typography variant="body2" color="text.secondary">MRAS v3.0 — Medical Room Automation</Typography>
        </Box>

        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Stepper activeStep={step} sx={{ mb: 3 }}>
              {['Your details', 'Password', 'Role'].map((label) => (
                <Step key={label}><StepLabel>{label}</StepLabel></Step>
              ))}
            </Stepper>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
              {step === 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField fullWidth label="Full name" required value={form.full_name} onChange={(e) => update('full_name', e.target.value)} autoFocus />
                  <TextField fullWidth label="Email address" type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} />
                  <TextField fullWidth label="Employee ID (optional)" placeholder="e.g. SIS/24/B2/36" value={form.employee_id} onChange={(e) => update('employee_id', e.target.value)} helperText="Links your account to your patient profile" />
                  <Button fullWidth variant="contained" size="large" onClick={handleNext} sx={{ borderRadius: 2, py: 1.2 }}>Next</Button>
                </Box>
              )}

              {step === 1 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField fullWidth label="Password" required type={showPassword ? 'text' : 'password'}
                    value={form.password} onChange={(e) => update('password', e.target.value)}
                    helperText="Min 8 characters, must include a number"
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
                  <TextField fullWidth label="Confirm password" required type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => update('confirmPassword', e.target.value)} />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button fullWidth variant="outlined" onClick={() => setStep(0)} sx={{ borderRadius: 2 }}>Back</Button>
                    <Button fullWidth variant="contained" onClick={handleNext} sx={{ borderRadius: 2, py: 1.2 }}>Next</Button>
                  </Box>
                </Box>
              )}

              {step === 2 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField select fullWidth label="Your role" required value={form.role} onChange={(e) => update('role', e.target.value)}>
                    {ROLES.map((r) => (
                      <MenuItem key={r.value} value={r.value}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{r.label}</Typography>
                          <Typography variant="caption" color="text.secondary">{r.desc}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button fullWidth variant="outlined" onClick={() => setStep(1)} sx={{ borderRadius: 2 }}>Back</Button>
                    <Button fullWidth type="submit" variant="contained" size="large" disabled={loading} sx={{ borderRadius: 2, py: 1.2 }}>
                      {loading ? <CircularProgress size={22} color="inherit" /> : 'Create account'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>Sign in</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}