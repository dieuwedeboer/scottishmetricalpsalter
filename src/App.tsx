import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { PlaybackBar, Sidebar } from './components/AppBars'
import TuneViewer from './components/TuneViewer'
import PsalmViewer from './components/PsalmViewer'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore'

export default function App() {
  const [topHeight, setTopHeight] = useState('50%')
  const [dragging, setDragging] = useState(false)

  const startDragging = (e) => {
    setDragging(true)
  }

  useEffect(() => {
    // Handles dragging movement
    const handleDragging = (e) => {
      if (!dragging) return
      // Use clientY for mouse events and touches[0].clientY for touch events
      const clientY = e.clientY || e.touches[0].clientY;
      const newHeight = `${clientY / window.innerHeight * 100}%`
      setTopHeight(newHeight)
    };

    // Stops dragging
    const stopDragging = () => {
      setDragging(false)
    }

    if (dragging) {
      // Attach event listeners when dragging starts
      document.addEventListener('mousemove', handleDragging)
      document.addEventListener('mouseup', stopDragging)
      document.addEventListener('touchmove', handleDragging, { passive: false })
      document.addEventListener('touchend', stopDragging)
    }

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', handleDragging)
      document.removeEventListener('mouseup', stopDragging)
      document.removeEventListener('touchmove', handleDragging)
      document.removeEventListener('touchend', stopDragging)
    }
  }, [dragging])

  return (
    <Box component="main">
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 84px)' }}>
        <Box sx={{ height: topHeight, overflow: 'auto', p: 2 }}>
          <TuneViewer />
        </Box>
        <Box
          sx={{
            height: '10px',
            cursor: 'row-resize',
            borderTop: '1px solid lightgrey',
            top: topHeight,
            zIndex: 1,
            textAlign: 'center',
          }}
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        ><UnfoldMoreIcon sx={{ mt: '-10px', float: 'right', mr: 4, border: '1px solid lightgrey', borderRadius: '20px', backgroundColor: 'white', }} /></Box>
        <Box sx={{ height: `calc(100% - ${topHeight})`, overflow: 'auto', p: 2 }}>
          <PsalmViewer />
        </Box>
      </Box>
      <PlaybackBar />
      <Sidebar />
    </Box>
  )
}
