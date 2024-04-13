import { Drawer, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function CommentaryDrawer({ open, onClose, commentary }) {
  return (
    <Drawer anchor="top" open={open} onClose={onClose}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <CloseIcon />
      </IconButton>
      {commentary && commentary.paragraphs.map((paragraph, index) => (
        <Typography key={index} sx={{ padding: 2 }}>
          {paragraph}
        </Typography>
      ))}
    </Drawer>
  )
}
