import React from 'react'
import { Box, IconButton } from '@mui/material'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
export default function PsalmTopPanel({ currentChapter, onPrevious, onNext, onMenuClick }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      <IconButton onClick={onPrevious}>
        <NavigateBeforeIcon />
      </IconButton>

      <IconButton onClick={onMenuClick}>
        <AutoStoriesIcon />
        <Box sx={{ paddingLeft: 1 }}>Psalm {currentChapter.number}</Box>
      </IconButton>

      <IconButton onClick={onNext}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  )
}
