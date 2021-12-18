import React, { useState, useEffect, createRef} from 'react'
import OSMD from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
// Theme.
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
// Internal.
import Score from './components/Score.tsx'
import Topbar, {DrawerHeader, PlaybackBar, Sidebar} from './components/AppBars'

// @todo this is duplicted in the AppBars file
const drawerWidth = 340

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export default function App() {
  /* start score refactor*/
  const scoreDiv = createRef()

  const [ready, setReady] = useState<bool>(false)
  const [player, setPlayer] = useState(new AudioPlayer())
  
  async function loadFile(osmd, file) {
    await osmd.load(file)
    await osmd.render()
    await player.loadScore(osmd)
    // Let everyone else know we're good to go.
    setPlayer(player)
    setReady(true)

    // Need to review this, but has been done to allow the
    // transpose function to work so the object doesn't need to be
    // passed down
    window.osmd = osmd
    // Ditto, but very useful for debugging.
    window.audioPlayer = player
  }
  
  useEffect(() => {
    // Minor issue with snowpack is that OSMD doesn't have any named
    // exports, so we fetch everything under the OSMD namespace.
    const osmd = new OSMD.OpenSheetMusicDisplay(scoreDiv.current)
    osmd.TransposeCalculator = new OSMD.TransposeCalculator();
    
    osmd.setOptions({
      backend: 'canvas',
      newPageFromXML: true,
      newSystemFromXML: true,
      followCursor: true,
      // @todo We want to ensure that both lines are always stretched
      // to full width.
      //autoResize: false,
    })
    
    loadFile(osmd, file)
  }, [])
  
  async function changeTune(file) {
    console.log(file)
    setReady(false)
    setFile(file)
    // @todo don't rely on the global state for this.
    loadFile(window.osmd, file)
  }
/* end score refactor*/
  
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState('/tunes/Spohr.musicxml')
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //        <Score file={file} setFile={setFile} />
  return (
    <Box className="App" sx={{ display: 'flex' }}>
      <Topbar position="fixed" open={open} handleDrawerOpen={handleDrawerOpen} file={file} changeTune={changeTune} player={player} />
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ maxWidth: 1200 }} ref={scoreDiv} />
      </Main>
      <PlaybackBar player={player} />
      <Sidebar player={player} open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  )
}
