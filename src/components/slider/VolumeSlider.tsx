import React, { Component } from 'react'
// Theme.
// @note Slider index is skipped due to a ForwardRef eror.
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider/Slider'
import VolumeDown from '@mui/icons-material/VolumeDown'
import VolumeUp from '@mui/icons-material/VolumeUp'

function VolumeSlider({ voice }: props) {
  const [value, setValue] = React.useState<number>(1)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
    voice.Volume = newValue
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <VolumeDown />
        <Slider aria-label="Volume" value={value} onChange={handleChange} step={0.05} min={0} max={2} valueLabelDisplay="auto" />
        <VolumeUp />
      </Stack>
    </Box>
  );
}

export default VolumeSlider
