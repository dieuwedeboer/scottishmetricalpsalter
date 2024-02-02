import React from 'react'
import { Box } from '@mui/material'
import { PlaybackBar, Sidebar } from './components/AppBars'
import TuneViewer from './components/TuneViewer'
import PsalmViewer from './components/PsalmViewer'

export default function App() {
  return (
    <Box component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 84px)' }}>
        <Box sx={{ height: '50%', overflow: 'auto', p: 2 }}>
          <TuneViewer />
        </Box>
        <Box sx={{ height: '50%', overflow: 'auto', p: 2 }}>
          <PsalmViewer />
        </Box>
      </Box>
      <PlaybackBar />
      <Sidebar />
    </Box>
  )
}
