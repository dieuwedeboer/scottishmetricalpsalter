import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useSelector, useDispatch } from 'react-redux'
import { loadFile, setFile, setReady } from '../../state/appSlice'
import tunelist from '../../tunelist'
import { useDisplay, useAudioPlayer } from '../../osmd'

const selectStyles = {
  minWidth: '100px',
}

/**
 * Change the tune.
 */
export default function TuneSelect({ loadFile }: props) {
  const display = useDisplay()
  const player = useAudioPlayer()
  const { file, ready } = useSelector((state: AppState) => state.app)
  const dispatch = useDispatch()

  const tuneSelected = (event: SelectChangeEvent) => {
    if (player.state === 'PLAYING') {
      player.stop()
    }

    dispatch(setReady(false))
    dispatch(setFile(event.target.value))
    loadFile(event.target.value, display)
  }

  return (
    <FormControl>
      <InputLabel>Psalm Tune</InputLabel>
      <Select
        value={file}
        label="Psalm Tune"
        onChange={tuneSelected}
        sx={selectStyles}
        >
        { tunelist.map((s) =>
          <MenuItem key={s.name} value={s.file}>{s.name}</MenuItem>
          )}
      </Select>
    </FormControl>
  )
}
