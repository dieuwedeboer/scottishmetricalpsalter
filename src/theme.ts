import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#800000',
    },
    secondary: {
      main: '#ffd700',
    },
    error: {
      main: red.A400,
    },
    white: {
      main: '#ffffff',
    },
    common: {
      blue: '#006ba3',
    },
  },
});

export default theme;
