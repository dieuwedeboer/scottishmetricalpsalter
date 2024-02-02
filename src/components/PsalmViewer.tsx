import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../state/store';
import { setChapters, setCurrentIndex } from '../state/psalmSlice';
import { useSwipeable } from 'react-swipeable'
import { Box, Typography } from '@mui/material'
import { loadPsalmsFile, processPsalmsText } from '../psalms'
import PsalmTopPanel from './PsalmTopPanel'
import PsalmDrawer from './PsalmDrawer'

const stanzaStyles = {
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
  const dispatch = useDispatch();
  const chapters = useSelector((state: RootState) => state.psalm.chapters)
  const currentIndex = useSelector((state: RootState) => state.psalm.currentIndex)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    loadPsalmsFile()
      .then(processPsalmsText)
      .then(data => dispatch(setChapters(data)))
  }, [dispatch])

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
    const prevIndex = Math.max(currentIndex - 1, 0);
    dispatch(setCurrentIndex(prevIndex))
  }

  const handleNext = () => {
    const nextIndex = Math.min(currentIndex + 1, chapters.length - 1);
    dispatch(setCurrentIndex(nextIndex))
  }

  const handleMenuClick = () => {
    setOpen(true)
  }
  const onClose = () => {
    setOpen(false)
  }
  const onPsalmSelect = (value: number) => {
    dispatch(setCurrentIndex(value))
    setOpen(false)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrevious(),
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
            currentChapter={chapters[currentIndex]}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onMenuClick={handleMenuClick}
          />
          <Typography variant="h2" sx={{ display: 'none' }}>
            Psalm {chapters[currentIndex].number}
          </Typography>
          <Box sx={{ padding: 2, fontStyle: 'italic' }}>
            {renderWithBreaks(chapters[currentIndex].metadata)}
          </Box>
          <Box>
            {chapters[currentIndex].stanzas.map((stanza, idx) => (
              <Typography key={idx}>{renderWithBreaks(stanza)}</Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  )
}
