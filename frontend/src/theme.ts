import { createTheme, type PaletteMode } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#aa3bff' : '#c084fc',
      light: '#c084fc',
      dark: '#8b2ce6',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#ffffff' : '#16171d',
      paper: mode === 'light' ? '#ffffff' : '#1f2028',
    },
    text: {
      primary: mode === 'light' ? '#08060d' : '#f3f4f6',
      secondary: mode === 'light' ? '#6b6375' : '#9ca3af',
    },
    divider: mode === 'light' ? '#e5e4e7' : '#2e303a',
  },
  typography: {
    fontFamily: "system-ui, 'Segoe UI', Roboto, sans-serif",
    fontSize: 16,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 500,
      letterSpacing: '-1.68px',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
      letterSpacing: '-0.24px',
      lineHeight: 1.18,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode));

