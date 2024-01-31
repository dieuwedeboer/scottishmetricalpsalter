import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  IconButton
} from '@mui/material'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import Stop from '@mui/icons-material/Stop'
import SettingsIcon from '@mui/icons-material/Settings'
import { useSelector, useDispatch } from 'react-redux'
import { setOpen } from '../state/appSlice'
import { useDisplay, useAudioPlayer } from '../osmd'
// Internal.
import PlaybackSlider from './slider/PlaybackSlider'
import TempoSlider from './slider/TempoSlider'

/**
 * Playback controls.
 */
function PlaybackControl() {
  const dispatch = useDispatch()
  const { open } = useSelector((state: AppState) => state.app)

  const display = useDisplay()
  const player = useAudioPlayer()
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
    // @todo Treat 0 as empty so that we don't transpose to naturals.
    // @todo These need to be up/down values with reasonable limits.
    // @todo use useDisplay()
    window.osmd.Sheet.Transpose = Number(event.target.value)
    window.osmd.updateGraphic()
    window.osmd.render()
  }

  return (
    <Grid container flex="1" sx={{ m: 1 }}>
      <Grid container justifyContent="flex-start" flex="1"></Grid>
      <Grid container justifyContent="center" flex="1">
        <IconButton
          aria-label={paused ? 'play' : 'pause'}
          onClick={paused ? play : pause}
          style={{ color: 'rgba(255, 255, 255, 0.84)' }}
        >
          {paused ? (
            <PlayArrowRounded />
          ) : (
            <PauseRounded />
          )}
        </IconButton>
        <IconButton
          aria-label="stop"
          onClick={stop}
          style={{ color: 'rgba(255, 255, 255, 0.84)' }}
        >
          <Stop />
        </IconButton>
      </Grid>
      <Grid container justifyContent="flex-end" flex="1">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(setOpen(true))}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <SettingsIcon />
        </IconButton>
      </Grid>
      { player ? <PlaybackSlider player={player} iteration={iteration} setIteration={setIteration} /> : null }
    </Grid>
  )
}

export default PlaybackControl
