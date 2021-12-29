import React, { useState } from 'react'
// Theme.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select/Select'
import { SelectChangeEvent } from '@mui/material/Select/Select'
// Internal.
import VolumeSlider from './slider/VolumeSlider'

/**
 * Output a stack of instruments.
 *
 * @todo can be removed as we never render the instrument grouping.
 */
export function Instruments({ player }: props) {
  return (
    player.scoreInstruments.map((i) =>
      <Stack key={i.IdString} direction="row" spacing={2}>{
        <Voices player={player} voices={i.Voices} />
      }</Stack>
    )
  )
}

/**
 * Output a stack of voices.
 */
export function Voices({ player, voices }: props) {
  return (
    voices.map((v) =>
      <Stack key={v.UniqueId} sx={{my: 2}}>
        <Typography variant="h5">{v.Part}</Typography>
        <VolumeSlider voice={v} />
        <InstrumentSelect player={player} voice={v} />
      </Stack>
    )
  )
}

/**
 * InstrumentSelect.
 *
 * @todo shift to ./select/InstrumentSelect.tsx
 */
export function InstrumentSelect({ player, voice }: props) {
  const [instrument, setInstrument] = useState<number>(player.getPlaybackInstrument(voice.VoiceId).midiId)

  const handleChange = (event: SelectChangeEvent) => {
    setInstrument(event.target.value)
    player.setInstrument(voice, event.target.value)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="instrument-select-label">Instrument</InputLabel>
        <Select
          labelId="instrument-select-label"
          id="instrument-select"
          value={instrument}
          label="Instrument"
          onChange={handleChange}
          sx={{'legend': { maxWidth: '100%' } }}
        >
          { player.availableInstruments.map((i) => 
            <MenuItem key={i.midiId} value={i.midiId}>{i.name}</MenuItem>
          ) }
        </Select>
      </FormControl>
    </Box>
  );
}

/**
 * Control grouping for actions related to instruments and voices.
 */
function InstrumentControl({player}: props) {
  const voices = []
  const satb = ['Soprano', 'Alto', 'Tenor', 'Bass']
  for (let instrument of player.scoreInstruments) {
    for (let voice of instrument.voices) {
      // Note that changes to the voice objects here affects the global
      // scope, so we might want to this when we initialise the engine.
      // Consider using Object.defineProperty() for immutables
      voice.UniqueId = [instrument.IdString, voice.VoiceId].join('-')
      voice.Part = satb.shift()

      voices.push(voice)
    }
  }

  return (
    <Stack><Voices player={player} voices={voices} /></Stack>
  )
}

export default InstrumentControl
