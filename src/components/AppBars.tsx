import React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TextField from '@mui/material/TextField'
// Internal.
import PlaybackControl from './PlaybackControl'
import InstrumentControl from './InstrumentControl'
import TempoSlider from './slider/TempoSlider'

export function PlaybackBar({player}: props) {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <PlaybackControl player={player} />
      </Toolbar>
    </AppBar>
  )
}

export function Sidebar({osmd, player, open, handleDrawerClose}: props) {
  const drawerWidth = 340;

  const transpose = (event) => {
    // @todo Can we capture the value as a number directly?
    // @todo Treat 0 as empty so that we don't transpose to naturals.
    osmd.Sheet.Transpose = Number(event.target.value)
    osmd.updateGraphic()
    osmd.render()
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
        <IconButton onClick={handleDrawerClose}>
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

export default function Topbar({osmd, player, open, handleDrawerOpen, file, changeTune}: props) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, mr: 4 }} component="div">
          Scottish Metrical Psalter
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
