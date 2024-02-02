import React, { useEffect, useRef} from 'react'
import {
  OpenSheetMusicDisplay,
  TransposeCalculator
} from 'opensheetmusicdisplay'
import { useSelector, useDispatch } from 'react-redux'
import { setReady, setFile  } from '../state/appSlice'
import { Box, Button } from '@mui/material'
import TuneSelect from './select/TuneSelect'
import showLyrics from '../lyrics'
import { setDisplay, useDisplay, useAudioPlayer } from '../osmd'

export default function TuneViewer() {
  const scoreDiv = useRef()
  const display = useDisplay()
  const player = useAudioPlayer()
  const dispatch = useDispatch()
  const { ready, file } = useSelector((state) => state.app)
  const maxWidth = 1260

  // @todo psalm state should have the active psalm in state so
  // we don't need to look it up.
  const psalm = useSelector((state) => state.psalm.chapters[state.psalm.currentIndex])

  // We pass osmd as on first load, the display is not completely ready.
  async function loadFile(file, display) {
    await display.load(file)

    // @todo Allow user to adjust scale.
    if (window.outerWidth < maxWidth) {
      let scale = Math.round(window.outerWidth / maxWidth * 100) / 100
      display.Zoom = scale
    }

    display.render()
    player.loadScore(display)

    // Let everyone else know we've changed the display and player.
    dispatch(setReady(true))
  }

  useEffect(() => {
    // Init of OSMD happens here as ref has to remain in a React component.
    const osmd = new OpenSheetMusicDisplay(
      scoreDiv.current,
      {
        drawingParameters: 'compacttight',
        followCursor: true,
        newPageFromXML: true,
        newSystemFromXML: true,
        stretchLastSystemLine: true,
      }
    )
    osmd.TransposeCalculator = new TransposeCalculator()

    // Set OSMD globally and load sheet music.
    setDisplay(osmd)
    loadFile(file, osmd)
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
        <TuneSelect loadFile={loadFile} />
        <Button variant="outline" sx={{p: 2}} onClick={() => showLyrics(psalm)}>Stanza mode</Button>
      </Box>
      <Box component="article" sx={{ maxWidth, m: 'auto' }} ref={scoreDiv} />
    </Box>
  )
}
