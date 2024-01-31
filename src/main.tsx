import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Provider } from 'react-redux'
import { store } from './state/store'
import App from './App'

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
  },
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
  </React.StrictMode>
)
