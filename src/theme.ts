import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#006ba3',
      light: '#1fa2d6',
    },
    secondary: {
      main: '#ffd700',
    },
    error: {
      main: '#800000',
    },
    white: '#ffffff',
  },
});

export default theme;
