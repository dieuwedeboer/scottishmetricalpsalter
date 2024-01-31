import React, { useState, useEffect, useRef} from 'react'
import {
  OpenSheetMusicDisplay,
  TransposeCalculator
} from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
import { useSelector, useDispatch } from 'react-redux'
import { AppState,
         setReady, setOpen, setFile, setScoreWidth
} from './state/appSlice'
import { Box, Toolbar, Button } from '@mui/material'
import Score from './components/Score'
import Topbar, { PlaybackBar, Sidebar } from './components/AppBars'
import TuneSelect from './components/select/TuneSelect'
import PsalmViewer from './components/PsalmViewer'
import testLyrics from './lyrics'
import { initialiseOpenSheetMusicDisplay, useDisplay, useAudioPlayer } from './osmd'

export default function App() {
  const display = useDisplay()
  const player = useAudioPlayer()
  const dispatch = useDispatch()
  const { ready, open, file, scoreWidth } = useSelector((state: AppState) => state.app)

  const scoreDiv = useRef()

  // Set globals for debugging. These should never be used directly in code.
  // @todo wrap this in a debug conditional.
  window.osmd = display
  window.audioPlayer = player

  // We pass osmd as on first load, the display is not completely ready.
  async function loadFile(file, display) {
    await display.load(file)

    // @todo Scale based on viewport.
    // osmd.zoom = a value between 0.1 and 2?
    //osmd.zoom = 0.5
    //testLyrics(osmd)
    if (window.outerWidth < scoreWidth) {
      let scale = Math.round(window.outerWidth / scoreWidth * 100) / 100
      display.Zoom = scale
    }

    display.render()
    player.loadScore(display)

    // Let everyone else know we've changed the display and player.
    dispatch(setReady(true))
  }

  useEffect(() => {
    const osmd = new OpenSheetMusicDisplay(
      scoreDiv.current,
      {
        newPageFromXML: true,
        newSystemFromXML: true,
        followCursor: true,
        autoResize: true,
      }
    )
    osmd.TransposeCalculator = new TransposeCalculator()

    // Set OSMD globally and load sheet music.
    initialiseOpenSheetMusicDisplay(osmd)
    loadFile(file, osmd)
  }, [])

  return (
    <main>
      <Box open={open} >
        <Box sx={{ p: 2 }} >
          <TuneSelect loadFile={loadFile} />
          <Button variant="outline" sx={{p: 2}}  onClick={() => {testLyrics(display)}}>Show verse</Button>
        </Box>
        <Box component="article" sx={{ maxWidth: scoreWidth }} ref={scoreDiv} />
        <PsalmViewer />
        <PlaybackBar />
      </Box>
      <Sidebar open={open} />
    </main>
  )
}
