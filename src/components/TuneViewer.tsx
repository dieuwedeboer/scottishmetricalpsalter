import React, { useEffect, useRef} from 'react'
import {
  OpenSheetMusicDisplay,
  TransposeCalculator
} from 'opensheetmusicdisplay'
import { useSelector, useDispatch } from 'react-redux'
import { setReady, setFile, setScoreWidth } from '../state/appSlice'
import { Box, Button } from '@mui/material'
import TuneSelect from './select/TuneSelect'
import showLyrics from '../lyrics'
import { initialiseOpenSheetMusicDisplay, useDisplay, useAudioPlayer } from '../osmd'

export default function TuneViewer() {
  const scoreDiv = useRef()
  const display = useDisplay()
  const player = useAudioPlayer()
  const dispatch = useDispatch()
  const { ready, file, scoreWidth } = useSelector((state) => state.app)

  // @todo psalm state should have the active psalm in state so
  // we don't need to look it up.
  const psalm = useSelector((state) => state.psalm.chapters[state.psalm.currentIndex])

  // Set globals for debugging.
  // @todo Shift this to the ./osmd file to handle
  window.osmd = display
  window.audioPlayer = player

  // We pass osmd as on first load, the display is not completely ready.
  // @todo Could be in own file if we kept the dispatch as a chained call?
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
    <Box>
      <TuneSelect loadFile={loadFile} />
      <Button variant="outline" sx={{p: 2}} onClick={() => showLyrics(psalm)}>Stanza mode</Button>
      <Box component="article" sx={{ maxWidth: scoreWidth }} ref={scoreDiv} />
    </Box>
  )
}
