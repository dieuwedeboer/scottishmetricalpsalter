import React, { useState, useEffect } from 'react'
import { Box, Grid, IconButton, Dialog, DialogContent, DialogActions, Button, Typography, Link } from '@mui/material'
import PauseRounded from '@mui/icons-material/PauseRounded'
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded'
import Stop from '@mui/icons-material/Stop'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'
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
  const [infoOpen, setInfoOpen] = useState(false)

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

  // @todo Replace with a |< icon and place to left of play/pause
  // only show if current iteration greater than 0 plus autostop when done
  // unless repeat is enabled (add that)
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

  // @todo Remove the playback slider and try to map playback changes to
  // clicks on the actual score (hard?)
  return (
    <Grid container flex="1" sx={{ m: 1 }}>
      <Grid container justifyContent="flex-start" flex="1">
        <IconButton onClick={() => setInfoOpen(true) } color="inherit" aria-label="info">
          <InfoIcon />
        </IconButton>

        <Dialog open={infoOpen} onClose={() => setInfoOpen(false)}>
          <DialogContent>
            <Typography variant="body1" sx={{mb: 2}}>
              This app is a tech demo and hobby project by Dieuwe de Boer. In order to be fully function it still requires several hundred tunes converted to MusicXML format.
            </Typography>
            <Typography variant="body1" sx={{mb: 2}}>
              For more details and the open source codebase, <Link href="https://github.com/dieuwedeboer/scottishmetricalpsalter" target="_blank" rel="noopener">visit the project on GitHub</Link>.
            </Typography>
            <Typography variant="body1">
              This project is licensed under the GNU General Public License v3.0. A UI overhaul and additional tunes are planned for future updates.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInfoOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid container justifyContent="center" flex="1">
        <IconButton
          color="inherit"
          aria-label="stop"
          onClick={stop}
          sx={{ visibility: iteration ? 'visible' : 'hidden' }}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label={paused ? 'play' : 'pause'}
          onClick={paused ? play : pause}
        >
          {paused ? (
            <PlayArrowRounded />
          ) : (
            <PauseRounded />
          )}
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
