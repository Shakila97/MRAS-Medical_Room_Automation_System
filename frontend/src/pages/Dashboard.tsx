import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssessmentIcon from '@mui/icons-material/Assessment';

const stats = [
  { label: 'Patients', icon: PeopleIcon, value: '—', color: '#aa3bff' },
  { label: 'Consultations', icon: MedicalServicesIcon, value: '—', color: '#3b82f6' },
  { label: 'Inventory Items', icon: InventoryIcon, value: '—', color: '#10b981' },
  { label: 'JRISSI Records', icon: AssessmentIcon, value: '—', color: '#f59e0b' },
];

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map(({ label, icon: Icon, value, color }) => (
          <Grid key={label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    bgcolor: `${color}1a`,
                    borderRadius: 2,
                    p: 1.5,
                    display: 'flex',
                  }}
                >
                  <Icon sx={{ color, fontSize: 28 }} />
                </Box>
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    {value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
