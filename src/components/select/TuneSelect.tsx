import React, { Component, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select/Select'
import { SelectChangeEvent } from '@mui/material/Select/Select'

import tunelist from '../../tunelist'

const selectStyles = {
  //'&, .MuiSelect-icon': {
  //  color: 'white',
  //},
  //'fieldset, fieldset, &&:hover fieldset, &&.Mui-focused fieldset': {
  //  borderColor: 'white',
  //},
  'legend': {
    maxWidth: '100%', // Fix for border collision.
  },
}

/**
 * Change the tune.
 */
export default function TuneSelect({ player, file, changeTune }: props) {
  const [tune, setTune] = useState(file)

  const tuneSelected = (event: SelectChangeEvent) => {
    if (player.state === 'PLAYING') {
      player.stop()
    }
    setTune(event.target.value)
    changeTune(event.target.value)
  }

  return (
    <FormControl>
      <InputLabel id="tune-select-label">Psalm Tune</InputLabel>
      <Select
        labelId="tune-select-label"
        id="tune-select"
        value={file}
        label="Psalm Tune"
        onChange={tuneSelected}
        sx={{...selectStyles}}
        >
        { tunelist.map((s) => 
          <MenuItem key={s.number} value={s.file}>{s.name}</MenuItem>
          )}
      </Select>
    </FormControl>
  )
}
