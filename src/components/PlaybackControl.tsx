import React, { useState, useEffect } from 'react'
// Theme.
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import Stop from '@mui/icons-material/Stop'
import IconButton from '@mui/material/IconButton'
// Internal.
import PlaybackSlider from './slider/PlaybackSlider'
import TempoSlider from './slider/TempoSlider'

/**
 * Playback controls.
 */
function PlaybackControl({player}: props) {
  const [iteration, setIteration] = useState<number>(player.currentIterationStep)
  const [paused, setPaused] = useState(true)

  const play = () => {
    if (player.state === 'STOPPED' || player.state === 'PAUSED') {
      player.play()
      setPaused(false)
    }
  }

  const pause = () => {
    if (player.state === 'PLAYING') {
      player.pause()
      setPaused(true)
    }
  }

  const stop = () => {
    if (player.state === 'PLAYING' || player.state === 'PAUSED') {
      player.stop()
    }
    setPaused(true)
    setIteration(0)
  }

  const transpose = (event) => {
    // @todo Can we capture the value as a number directly?
    // @todo Treat 0 as empty so that we don't transpose to naturals.
    window.osmd.Sheet.Transpose = Number(event.target.value)
    window.osmd.updateGraphic()
    window.osmd.render()
  }

  return (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid
        container
        justifyContent="center"
      >
        <IconButton
          aria-label={paused ? 'play' : 'pause'}
          onClick={paused ? play : pause}
          style={{ color: 'rgba(255, 255, 255, 0.84)' }}
        >
          {paused ? (
            <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
            />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} />
          )}
        </IconButton>
        <IconButton
          aria-label="stop"
          onClick={stop}
          style={{ color: 'rgba(255, 255, 255, 0.84)' }}
        >
          <Stop  sx={{ fontSize: '3rem' }} />
        </IconButton>
      </Grid>
      { player ? <PlaybackSlider player={player} iteration={iteration} setIteration={setIteration} /> : null }
    </Box>
  )
}

export default PlaybackControl
