import React, { useState, useEffect } from 'react'
import Slider from '@mui/material/Slider/Slider'

/**
 * Playback tempo.
 */
export default function TempoSlider({ player }: props) {
  const [bpm, setBpm] = useState<number>(player.playbackSettings.bpm);

  const changeBpm = (event: Event, newValue: number | number[]) => {
    setBpm(newValue as number);
    player.setBpm(newValue)
  }

  // Ensure that if the tune has changed the bpm display is updated.
  if (bpm !== player.playbackSettings.bpm) {
    setBpm(player.playbackSettings.bpm)
  }
  
  return(
    <Slider aria-label="BPM" value={player.playbackSettings.bpm} onChange={changeBpm} step={1} min={30} max={180} valueLabelDisplay="auto" />
  )
}
