import React, { useEffect, useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import { Box, Typography } from '@mui/material'
import { loadPsalmsFile, processPsalmsText } from '../psalms'
import PsalmTopPanel from './PsalmTopPanel'
import PsalmDrawer from './PsalmDrawer'

const stanzaStyles = {
  paddingBottom: '80px', // Offset the app bar
  display: 'flex',
  justifyContent: 'center',
  '& > div': {
    position: 'relative',
    textAlign: 'left',
    maxWidth: '600px',
  },
  'p:nth-of-type(even)': {
    marginBottom: '1em',
  },
  'p > span:nth-of-type(even)': {
    paddingLeft: '0.5em',
  },
  span: {
    display: 'block',
  },
  sup: {
    position: 'absolute',
    left: '-3em',
  },
}

export default function PsalmViewer() {
  const [chapters, setChapters] = useState([])
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadPsalmsFile()
      .then(processPsalmsText)
      .then(setChapters)
  }, [])

  const renderWithBreaks = (lines) => {
    return lines.map((line, index) => {
      // Check for a number at the beginning of the line and replace it with its superscript
      // @todo Simply extract the number and conditionally render it further down.
      const updatedLine = line.replace(/^(\d+)/, (match) => `<sup>${match}</sup>`)

      return (
        <React.Fragment key={index}>
          {/* Use dangerouslySetInnerHTML to render the superscript HTML */}
          <Box component="span" dangerouslySetInnerHTML={{ __html: updatedLine }} />
        </React.Fragment>
      )
    })
  }

  const handlePrevious = () => {
    setCurrentChapterIndex(index => Math.max(index - 1, 0))
  }

  const handleNext = () => {
    setCurrentChapterIndex(index => Math.min(index + 1, chapters.length - 1))
  }

  const handleMenuClick = () => {
    // Logic to open the Psalm navigation panel
    setOpen(true)
  }
  const onClose = () => {
    // Logic to close the Psalm navigation panel
    setOpen(false)
  }
  const onPsalmSelect = (value) => {
    // Logic to change Psalm from the nav panel - like a "goto"
    setCurrentChapterIndex(value)
    setOpen(false)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentChapterIndex(index => Math.min(index + 1, chapters.length - 1)),
    onSwipedRight: () => setCurrentChapterIndex(index => Math.max(index - 1, 0)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  // Render the chapters
  return (
    <Box sx={stanzaStyles} {...handlers}>
      {chapters.length > 0 && (
        <Box>
          <PsalmDrawer
            open={open}
            onClose={onClose}
            onPsalmSelect={onPsalmSelect}
            chapters={chapters}
          />
          <PsalmTopPanel
            currentChapter={chapters[currentChapterIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onMenuClick={handleMenuClick}
          />
          <Typography variant="h2">
            Psalm {chapters[currentChapterIndex].number}
          </Typography>
          <Box sx={{ padding: 2, fontStyle: 'italic' }}>
            {renderWithBreaks(chapters[currentChapterIndex].metadata)}
          </Box>
          <Box>
            {chapters[currentChapterIndex].stanzas.map((stanza, idx) => (
              <Typography key={idx}>{renderWithBreaks(stanza)}</Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
