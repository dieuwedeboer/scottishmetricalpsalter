import React, { Component, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { makeStyles } from '@mui/styles'
import tunelist from '../../tunelist'

// @todo this only affects the text at the moment
const useStyles = makeStyles({
  root: {
    color: 'white',
  },
});

/**
 * Change the tune.
 */
export default function TuneSelect({ player, file, changeTune }: props) {
  const [tune, setTune] = useState(file)

  const tuneSelected = (event: SelectChangeEvent) => {
    // @todo global bad, also playback controls need to be notificed
    if (player.state === 'PLAYING') {
      player.stop()
    }
    setTune(event.target.value)
    changeTune(event.target.value)
  }

  const classes = useStyles()

  return (
    <FormControl>
      <InputLabel id="tune-select-label" className={classes.root}>Psalm Tune</InputLabel>
      <Select
        labelId="tune-select-label"
        id="tune-select"
        value={file}
        label="Psalm Tune"
        onChange={tuneSelected}
        className={classes.root}
      >
        { tunelist.map((s) => 
          <MenuItem key={s.number} value={s.file}>{s.name}</MenuItem>
          )}
      </Select>
    </FormControl>
  )
}
