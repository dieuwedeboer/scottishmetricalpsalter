import React from 'react'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  TextField
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import PlaybackControl from './PlaybackControl'
import InstrumentControl from './InstrumentControl'
import TempoSlider from './slider/TempoSlider'
import { useSelector, useDispatch } from 'react-redux'
import { setOpen } from '../state/appSlice'
import { useDisplay, useAudioPlayer } from '../osmd'

export function PlaybackBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <PlaybackControl />
      </Toolbar>
    </AppBar>
  )
}

export function Sidebar() {
  const display = useDisplay()
  const player  = useAudioPlayer()
  const dispatch = useDispatch()
  const { open } = useSelector((state: AppState) => state.app)
  const drawerWidth = 340;

  const transpose = (event) => {
    // @todo Can we capture the value as a number directly?
    // @todo Treat 0 as empty so that we don't transpose to naturals.
    display.Sheet.Transpose = Number(event.target.value)
    display.updateGraphic()
    display.render()
  }

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          px: 2,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <Toolbar>
        <IconButton onClick={() => dispatch(setOpen(false))}>
          <ChevronRightIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      { player.ready ? <InstrumentControl player={player} /> : null }
      <Divider />
      <Box sx={{m: 2}}>
        <Typography id="tempo-slider" gutterBottom>
          Tempo (BPM 1/4)
        </Typography>
        { player.ready ? <TempoSlider player={player} /> : null }
      </Box>
      <Divider />
      <Box sx={{m: 2}}>
        <Typography id="tempo-slider" gutterBottom>
          Change pitch
        </Typography>
        <TextField id="outlined-number" label="Transpose" type="number" onChange={transpose} />
      </Box>
    </Drawer>
  )
}
