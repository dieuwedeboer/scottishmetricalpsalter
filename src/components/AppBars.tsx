import React from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TextField from '@mui/material/TextField'
// Internal.
import PlaybackControl from './PlaybackControl'
import InstrumentControl from './InstrumentControl'
import TuneSelect from './select/TuneSelect'
import TempoSlider from './slider/TempoSlider'

const drawerWidth = 340;

const transpose = (event) => {
  // @todo Can we capture the value as a number directly?
  // @todo Treat 0 as empty so that we don't transpose to naturals.
  window.osmd.Sheet.Transpose = Number(event.target.value)
  window.osmd.updateGraphic()
  window.osmd.render()
}

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export function PlaybackBar({player}: props) {
  return (
    <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
          <PlaybackControl player={player} />
      </Toolbar>
    </AppBar>
  )
}

export function Sidebar({player, open, handleDrawerClose}: props) {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
        },
      }}
      variant="persistent"
      anchor="right"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <ChevronRightIcon />
        </IconButton>
      </DrawerHeader>
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
        <TextField id="outlined-number" label="Transpose" type="number" onChange={transpose} />
      </Box>
    </Drawer>
  )
}

export default function Topbar({open, handleDrawerOpen, file, changeTune, player}: props) {
  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 0, mr: 4 }} component="div">
          Scottish Metrical Psalter
        </Typography>
        <Box sx={{ flexGrow: 1, p: 2 }} >
          <TuneSelect player={player} file={file} changeTune={changeTune} />
        </Box>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
