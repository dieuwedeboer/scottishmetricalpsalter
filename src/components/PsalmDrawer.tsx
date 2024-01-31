import { Drawer, Grid, Button, Typography } from '@mui/material'

export default function PsalmDrawer({ open, onClose, onPsalmSelect, chapters }) {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <Grid container spacing={2} sx={{ p: 3 }}>
        {chapters.map((chapter, index) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={index}>
            <Button
              variant="outlined"
              sx={{ width: '100%', height: '5vh' }}
              onClick={() => onPsalmSelect(index)}
            >
              <Typography variant="h5" component="div">
                {chapter.number}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Drawer>
  )
}
