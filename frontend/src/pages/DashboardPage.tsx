import React, { useEffect, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import QrCodeIcon from "@mui/icons-material/QrCode";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAuth } from "../context/AuthContext";
import { listPatients } from "../api/patients";
import type { PatientSummary } from "../types";

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        p: 0.5,
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: color, width: 52, height: 52 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h4" fontWeight={700}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

// ── Dashboard Page ────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user, isAdmin, isDoctor } = useAuth();
  const [patients, setPatients] = useState<PatientSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAdmin || isDoctor) {
      listPatients(1, 10)
        .then(setPatients)
        .catch(() => setError("Failed to load patient data."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAdmin, isDoctor]);

  const activeCount = patients.filter((p) => p.is_active).length;

  return (
    <Box>
      {/* Welcome header */}
      <Box mb={4}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, {user?.username} 👋
        </Typography>
        <Typography color="text.secondary">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>
      </Box>

      {/* Stat cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Total Patients"
            value={patients.length}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Active Patients"
            value={activeCount}
            icon={<LocalHospitalIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Check-ins Today"
            value="—"
            icon={<QrCodeIcon />}
            color="#e65100"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            label="Your Role"
            value={user?.role ?? "—"}
            icon={<TrendingUpIcon />}
            color="#6a1b9a"
          />
        </Grid>
      </Grid>

      {/* Recent patients table — admin/doctor only */}
      {(isAdmin || isDoctor) && (
        <Card elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Recent Patients
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer component={Paper} elevation={0}>
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ "& th": { fontWeight: 700 } }}>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Department</TableCell>
                      <TableCell>Blood Group</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Last Check-in</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {patients.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4, color: "text.secondary" }}>
                          No patients found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      patients.map((p) => (
                        <TableRow
                          key={p.id}
                          hover
                          sx={{ "&:last-child td": { border: 0 } }}
                        >
                          <TableCell>{p.employee_id}</TableCell>
                          <TableCell>{p.full_name}</TableCell>
                          <TableCell>{p.department}</TableCell>
                          <TableCell>{p.blood_group ?? "—"}</TableCell>
                          <TableCell>
                            <Chip
                              label={p.is_active ? "Active" : "Inactive"}
                              color={p.is_active ? "success" : "default"}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {p.last_checkin
                              ? new Date(p.last_checkin).toLocaleDateString()
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      )}

      {/* Employee view */}
      {!isAdmin && !isDoctor && (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          Welcome, {user?.username}! Visit your profile to view your health record.
        </Alert>
      )}
    </Box>
  );
}
