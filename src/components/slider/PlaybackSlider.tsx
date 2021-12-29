import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider/Slider'

const styles = {
  '&, && .MuiSlider-markLabel': {
    color: 'white',
  },
}

/**
 * Playback progress.
 *
 * @todo perhaps rename this to PlaybackSlider?
 */
export default function PlaybackSlider({ player, iteration, setIteration }: props) {  
  const jumpToStep = (event: Event, newValue: number | number[]) => {
    setIteration(newValue as number);
    // @todo if player is STOPPED and we change the iteration step
    // then the followCursor breaks.
    const playing = player.state === 'PLAYING'
    player.jumpToStep(newValue)
    if (playing) {
      player.play()
    }
  }

  // Add listener to update current iteration step from the PlaybackEngine.
  // @todo This causes a memory leak warning when the tune is changed.
  useEffect(() => {
    player.on('iteration', notes => {
      // @todo we also want to reset on stop
      // @todo this is one step ahead when we start from scratch?
      // @todo Check if default matches what the default on the player is
      // mabye it should be 1
      setIteration(player.currentIterationStep)
  })
  }, [])
  
  // @todo Calculate these based on the score.
  let marks = []
  if (player.iterationSteps > 0) {
    marks = [
      { value: 0, label: '0' },
      { value: player.iterationSteps * .25, label: 'Line 2' },
      { value: player.iterationSteps * .5, label: 'Line 3'  },
      { value: player.iterationSteps * .75, label: 'Line 4'  },
      { value: player.iterationSteps, label: player.iterationSteps },
    ]
  }
  
  return(
    <Slider aria-label="Playback" value={iteration} onChange={jumpToStep} step={1} min={0} max={player.iterationSteps} marks={marks} sx={{...styles}} />
  )
}
