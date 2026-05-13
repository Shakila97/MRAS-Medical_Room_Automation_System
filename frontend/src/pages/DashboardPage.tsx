// @ts-nocheck
import { useEffect, useState } from 'react'
import {
  Box, Typography, Card, CardContent, TextField, Button,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper, Chip, Avatar, CircularProgress, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions,
  MenuItem, InputAdornment, IconButton, Drawer, Divider,
  Grid
} from '@mui/material'
import {
  Search, Add, Refresh, QrCode, Close, Edit,
  PersonOff, Favorite, Height, MonitorWeight, Phone
} from '@mui/icons-material'
import { patientApi } from '../api/patients'
import type { PatientSummary, PatientRead, PatientCreate, Department, Gender, BloodGroup } from '../types'
import { useAuth } from '../context/AuthContext'

const DEPARTMENTS: Department[] = [
  'Engineering', 'Finance', 'Human Resources', 'IT',
  'Management', 'Marketing', 'Operations', 'Sales', 'Security', 'Other'
]
const GENDERS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
]
const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

function severityColor(bmi: number | null) {
  if (!bmi) return 'default'
  if (bmi < 18.5) return 'warning'
  if (bmi < 25) return 'success'
  if (bmi < 30) return 'warning'
  return 'error'
}

function bmiLabel(bmi: number | null) {
  if (!bmi) return '—'
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

const AVATAR_COLORS = ['#1976d2', '#388e3c', '#f57c00', '#7b1fa2', '#c62828', '#00838f']

// ── Patient Detail Drawer ─────────────────────────────────────────────────────
function PatientDrawer({ patientId, open, onClose }: { patientId: number | null; open: boolean; onClose: () => void }) {
  const [patient, setPatient] = useState<PatientRead | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (patientId && open) {
      setLoading(true)
      patientApi.get(patientId).then(setPatient).finally(() => setLoading(false))
    }
  }, [patientId, open])

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 380 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 500 }}>Patient profile</Typography>
        <IconButton onClick={onClose}><Close /></IconButton>
      </Box>

      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>}

      {patient && !loading && (
        <Box sx={{ p: 2.5, overflowY: 'auto' }}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar sx={{ width: 52, height: 52, bgcolor: AVATAR_COLORS[patient.id % AVATAR_COLORS.length], fontSize: 18 }}>
              {initials(patient.full_name)}
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>{patient.full_name}</Typography>
              <Typography variant="body2" color="text.secondary">{patient.job_title} · {patient.department}</Typography>
              <Typography variant="caption" color="text.secondary">{patient.employee_id}</Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Vitals */}
          <Typography variant="caption" sx={{ fontWeight: 600 }} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Vitals</Typography>
          <Grid container spacing={1.5} sx={{ mt: 0.5, mb: 2 }}>
            {[
              { icon: <Favorite fontSize="small" />, label: 'Blood group', value: patient.blood_group || '—' },
              { icon: <Height fontSize="small" />, label: 'Height', value: patient.height_cm ? `${patient.height_cm} cm` : '—' },
              { icon: <MonitorWeight fontSize="small" />, label: 'Weight', value: patient.weight_kg ? `${patient.weight_kg} kg` : '—' },
              { icon: <MonitorWeight fontSize="small" />, label: 'BMI', value: patient.bmi ? `${patient.bmi} — ${bmiLabel(patient.bmi)}` : '—' },
            ].map((v) => (
              <Grid item xs={6} key={v.label}>
                <Card variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="caption" color="text.secondary" display="block">{v.label}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>{v.value}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Medical info */}
          <Typography variant="caption" sx={{ fontWeight: 600 }} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>Medical info</Typography>
          {[
            { label: 'Allergies', value: patient.allergies },
            { label: 'Chronic conditions', value: patient.chronic_conditions },
            { label: 'Current medications', value: patient.current_medications },
          ].map((row) => (
            <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">{row.label}</Typography>
              <Typography variant="body2" fontWeight={row.value ? 500 : 400} color={row.value ? 'text.primary' : 'text.disabled'}>
                {row.value || 'None'}
              </Typography>
            </Box>
          ))}

          {/* Contact */}
          <Typography variant="caption" sx={{ fontWeight: 600 }} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mt: 2, display: 'block' }}>Contact</Typography>
          {[
            { label: 'Phone', value: patient.phone },
            { label: 'Emergency contact', value: patient.emergency_contact_name },
            { label: 'Emergency phone', value: patient.emergency_contact_phone },
          ].map((row) => (
            <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary">{row.label}</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>{row.value}</Typography>
            </Box>
          ))}

          {/* Check-in */}
          <Typography variant="caption" sx={{ fontWeight: 600 }} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mt: 2, display: 'block' }}>Check-in</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="text.secondary">Total check-ins</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>{patient.checkin_count}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
            <Typography variant="body2" color="text.secondary">Last check-in</Typography>
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {patient.last_checkin ? new Date(patient.last_checkin).toLocaleDateString() : 'Never'}
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  )
}

// ── Add Patient Dialog ────────────────────────────────────────────────────────
function AddPatientDialog({ open, onClose, onCreated }: { open: boolean; onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState<Partial<PatientCreate>>({ gender: 'male', department: 'Engineering' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (field: string, value: any) => setForm((p) => ({ ...p, [field]: value }))

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      await patientApi.create(form as PatientCreate)
      onCreated()
      onClose()
      setForm({ gender: 'male', department: 'Engineering' })
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to create patient')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register new patient</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Employee ID" required value={form.employee_id || ''} onChange={(e) => update('employee_id', e.target.value)} placeholder="SIS/24/B2/36" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Full name" required value={form.full_name || ''} onChange={(e) => update('full_name', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Date of birth" type="date" required InputLabelProps={{ shrink: true }} value={form.date_of_birth || ''} onChange={(e) => update('date_of_birth', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Gender" value={form.gender || 'male'} onChange={(e) => update('gender', e.target.value)}>
              {GENDERS.map((g) => <MenuItem key={g.value} value={g.value}>{g.label}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Department" value={form.department || 'Engineering'} onChange={(e) => update('department', e.target.value)}>
              {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Job title" required value={form.job_title || ''} onChange={(e) => update('job_title', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Phone" required value={form.phone || ''} onChange={(e) => update('phone', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField select fullWidth label="Blood group" value={form.blood_group || ''} onChange={(e) => update('blood_group', e.target.value)}>
              <MenuItem value="">Unknown</MenuItem>
              {BLOOD_GROUPS.map((b) => <MenuItem key={b} value={b}>{b}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Height (cm)" type="number" value={form.height_cm || ''} onChange={(e) => update('height_cm', Number(e.target.value))} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Weight (kg)" type="number" value={form.weight_kg || ''} onChange={(e) => update('weight_kg', Number(e.target.value))} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Emergency contact name" required value={form.emergency_contact_name || ''} onChange={(e) => update('emergency_contact_name', e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Emergency contact phone" required value={form.emergency_contact_phone || ''} onChange={(e) => update('emergency_contact_phone', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Allergies" value={form.allergies || ''} onChange={(e) => update('allergies', e.target.value)} placeholder="e.g. Penicillin, Latex" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Chronic conditions" value={form.chronic_conditions || ''} onChange={(e) => update('chronic_conditions', e.target.value)} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Register patient'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// ── Check-in Dialog ───────────────────────────────────────────────────────────
function CheckinDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [empId, setEmpId] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const handleCheckin = async () => {
    setError(''); setResult(null); setLoading(true)
    try {
      const res = await patientApi.checkin(empId)
      setResult(res)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Check-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => { setEmpId(''); setResult(null); setError(''); onClose() }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>QR Code Check-in</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {result ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 500 }}>{result.full_name} checked in!</Typography>
            <Typography variant="caption">Check-in #{result.checkin_count} · Doctor notified</Typography>
          </Alert>
        ) : (
          <TextField
            fullWidth label="Employee ID" autoFocus sx={{ mt: 1 }}
            value={empId} onChange={(e) => setEmpId(e.target.value)}
            placeholder="SIS/24/B2/36"
            onKeyDown={(e) => e.key === 'Enter' && handleCheckin()}
            helperText="Scan the employee QR code or enter the ID manually"
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Close</Button>
        {!result && (
          <Button variant="contained" onClick={handleCheckin} disabled={loading || !empId.trim()}>
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Check in'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

// ── Main Dashboard Page ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, isDoctor, isAdmin } = useAuth()
  const [patients, setPatients] = useState<PatientSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [addOpen, setAddOpen] = useState(false)
  const [checkinOpen, setCheckinOpen] = useState(false)

  const fetchPatients = async () => {
    setLoading(true); setError('')
    try {
      const data = await patientApi.list({
        search: search || undefined,
        department: deptFilter || undefined,
      })
      setPatients(data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to load patients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { if (isDoctor || isAdmin) fetchPatients() }, [])

  const handleSearch = () => fetchPatients()

  const openDetail = (id: number) => { setSelectedId(id); setDrawerOpen(true) }

  const activeCount = patients.filter((p) => p.is_active).length
  const checkedInToday = patients.filter((p) => {
    if (!p.last_checkin) return false
    return new Date(p.last_checkin).toDateString() === new Date().toDateString()
  }).length

  return (
    <Box sx={{ p: 3 }}>

      {/* Page header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {isDoctor || isAdmin ? 'Patient Management' : `Welcome, ${user?.full_name}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isDoctor || isAdmin ? 'Manage employee health profiles' : 'Your health dashboard'}
          </Typography>
        </Box>
        {(isDoctor || isAdmin) && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<QrCode />} onClick={() => setCheckinOpen(true)}>
              QR Check-in
            </Button>
            <Button variant="contained" startIcon={<Add />} onClick={() => setAddOpen(true)}>
              New patient
            </Button>
          </Box>
        )}
      </Box>

      {/* Metric cards */}
      {(isDoctor || isAdmin) && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { label: 'Total patients', value: patients.length, color: '#e3f2fd' },
            { label: 'Active', value: activeCount, color: '#e8f5e9' },
            { label: 'Checked in today', value: checkedInToday, color: '#fff3e0' },
            { label: 'Departments', value: [...new Set(patients.map((p) => p.department))].length, color: '#f3e5f5' },
          ].map((m) => (
            <Grid item xs={6} sm={3} key={m.label}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <CardContent sx={{ bgcolor: m.color, borderRadius: 2 }}>
                  <Typography variant="caption" color="text.secondary">{m.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>{m.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Search & filter */}
      {(isDoctor || isAdmin) && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 2 }}>
          <CardContent sx={{ pb: '16px !important' }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                size="small" placeholder="Search by name or employee ID…"
                value={search} onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                sx={{ flex: 1 }}
                InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              />
              <TextField
                select size="small" value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                sx={{ minWidth: 180 }}
                label="Department"
              >
                <MenuItem value="">All departments</MenuItem>
                {DEPARTMENTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
              </TextField>
              <Button variant="outlined" onClick={handleSearch} startIcon={<Search />}>Search</Button>
              <IconButton onClick={() => { setSearch(''); setDeptFilter(''); setTimeout(fetchPatients, 0) }} title="Reset">
                <Refresh />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Error */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Table */}
      {(isDoctor || isAdmin) && (
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>Patient</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>Blood</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>BMI</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>Last check-in</TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: 12, color: 'text.secondary', textTransform: 'uppercase' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <CircularProgress size={28} />
                    </TableCell>
                  </TableRow>
                ) : patients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                      No patients found. Click "New patient" to register one.
                    </TableCell>
                  </TableRow>
                ) : (
                  patients.map((p) => (
                    <TableRow
                      key={p.id}
                      hover
                      onClick={() => openDetail(p.id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ width: 34, height: 34, bgcolor: AVATAR_COLORS[p.id % AVATAR_COLORS.length], fontSize: 13 }}>
                            {initials(p.full_name)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{p.full_name}</Typography>
                            <Typography variant="caption" color="text.secondary">{p.employee_id}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip label={p.department} size="small" variant="outlined" sx={{ fontSize: 11 }} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{p.blood_group || '—'}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" fontSize={12}>
                          {bmiLabel(null)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" fontSize={12}>
                          {p.last_checkin ? new Date(p.last_checkin).toLocaleDateString() : 'Never'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={p.is_active ? 'Active' : 'Inactive'}
                          size="small"
                          color={p.is_active ? 'success' : 'default'}
                          sx={{ fontSize: 11 }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}

      {/* Employee view — own profile */}
      {!isDoctor && !isAdmin && (
        <Alert severity="info">
          You are logged in as an employee. Your health profile is managed by your doctor.
          Use the QR Check-in feature when visiting the medical room.
        </Alert>
      )}

      {/* Drawers & Dialogs */}
      <PatientDrawer patientId={selectedId} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AddPatientDialog open={addOpen} onClose={() => setAddOpen(false)} onCreated={fetchPatients} />
      <CheckinDialog open={checkinOpen} onClose={() => setCheckinOpen(false)} />
    </Box>
  )
}