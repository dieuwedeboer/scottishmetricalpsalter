import React, { useState, useEffect, useRef} from 'react'
import OSMD from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
// Theme.
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
// Internal.
import Score from './components/Score.tsx'
import Topbar, { PlaybackBar, Sidebar } from './components/AppBars'
import TuneSelect from './components/select/TuneSelect'
import testLyrics from './lyrics'

export default function App() {
  const scoreDiv = useRef()

  const [ready, setReady] = useState<bool>(false)
  const [display, setDisplay] = useState()
  const [player] = useState(new AudioPlayer())
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState('tunes/Spohr.musicxml')
  const [scoreWidth, setScoreWidth] = useState<number>(1260)

  // Set globals for debugging. These should never be used directly in code.
  // @todo wrap this in a debug conditional.
  window.osmd = display
  window.audioPlayer = player

  // We pass osmd as on first load, the display is not completely ready.
  async function loadFile(osmd, file) {
    await osmd.load(file)

    // @todo Scale based on viewport.
    // osmd.zoom = a value between 0.1 and 2?
    //osmd.zoom = 0.5
    //testLyrics(osmd)
    if (window.outerWidth < scoreWidth) {
      let scale = Math.round(window.outerWidth / scoreWidth * 100) / 100
      osmd.Zoom = scale
    }

    await osmd.render()
    await player.loadScore(osmd)

    // Let everyone else know we're good to go.
    setReady(true)
  }

  useEffect(() => {
    // We can't initialise OSMD via useState as the scoreDiv is not yet ready.
    // We also can't set it via setDisplay as the async nature means
    // we get to loadFile too quickly. Ideally there is a solution where
    // we just wait for each one after the other. (Promises?)
    const osmd = new OSMD.OpenSheetMusicDisplay(
      scoreDiv.current,
      {
        //backend: 'canvas',
        newPageFromXML: true,
        newSystemFromXML: true,
        followCursor: true,
        autoResize: true,
      }
    )

    // Prepare additional settings.
    osmd.TransposeCalculator = new OSMD.TransposeCalculator()

    // Assign OSMD to state and load sheet music.
    setDisplay(osmd)
    loadFile(osmd, file)
  }, [])

  async function changeTune(file) {
    console.log(file)
    setReady(false)
    setFile(file)
    loadFile(display, file)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className="App">
      <Topbar position="fixed" open={open} handleDrawerOpen={handleDrawerOpen} file={file} changeTune={changeTune} player={player} osmd={display} />
      <Box component="main" open={open} >
        <Toolbar />
        <Box sx={{ p: 2 }} >
          <TuneSelect player={player} file={file} changeTune={changeTune} />
          <Button variant="outline" sx={{p: 2}}  onClick={() => {testLyrics(osmd)}}>Show verse</Button>
        </Box>
        <Box component="article" sx={{ maxWidth: scoreWidth }} ref={scoreDiv} />
        <PlaybackBar player={player} />
      </Box>
      <Sidebar osmd={display} player={player} open={open} handleDrawerClose={handleDrawerClose} />
    </Box>
  )
}
