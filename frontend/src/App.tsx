import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Stack,
  Chip,
} from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useColorMode } from './main';

function App() {
  const [count, setCount] = useState(0);
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth="md" sx={{ py: 6, textAlign: 'center', minHeight: '100svh' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton onClick={toggleColorMode} color="primary" size="large">
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>
      </Box>

      <Stack sx={{ alignItems: 'center', mb: 6 }} spacing={2}>
        <LocalHospitalIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        <Typography variant="h1" component="h1">
          MRAS
        </Typography>
        <Typography variant="h2" component="p" color="text.secondary">
          Medical Room Automation System
        </Typography>
        <Chip label="MUI + TypeScript ready" color="primary" variant="outlined" />
      </Stack>

      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 6 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setCount((c) => c + 1)}
        >
          Count is {count}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </Stack>

      <Typography variant="body1" color="text.secondary">
        Edit{' '}
        <Box
          component="code"
          sx={{
            fontFamily: 'monospace',
            bgcolor: 'action.hover',
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          src/App.tsx
        </Box>{' '}
        to start building your medical room UI.
      </Typography>
    </Container>
  );
}

export default App;
