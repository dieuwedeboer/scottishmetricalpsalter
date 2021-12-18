import React, { useState, useEffect, createRef } from 'react'
import OSMD from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'
// Theme.
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
// Internal.
import PlaybackControl from './PlaybackControl'
import InstrumentControl from './InstrumentControl'
import TuneSelect from './select/TuneSelect'

/**
 * @todo 90% of the functionality should be shifted up to the App level
 * so that this function just handles the score render and nothing more.
 */
function Score({file, setFile}: props) {
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

  //    <TuneSelect file={file} changeTune={changeTune} />
  /*
    { ready ?
      <Box>
        <PlaybackControl player={player} />
        <InstrumentControl player={player} />
      </Box>
      : <Box>
        <CircularProgress />
      </Box> }
  */
  return (<Box sx={{ p: 4 }}>
    <Box sx={{ maxWidth: 1200 }} ref={scoreDiv} />
  </Box>)
}

export default Score
