// This will initialise all the commentary data from a txt file.

export async function loadCommentaryFile(): string {
  const response = await fetch('psalms/john-brown.txt')
  const text = await response.text()
  return text
}

interface Chapter {
  number: number
  paragraphs: string[]
}

export function processCommentaryText(text: string): Chapter[] {
  const chapters: Chapter[] = []
  let currentChapterNumber = 0
  let currentParagraphs = []
  let currentParagraph = ''
  let isPreface = true

  const lines = text.split('\n')

  lines.forEach(line => {
    const chapterMatch = line.match(/^Psalm (\d+)/)
    if (chapterMatch) {
      // Finalize the previous chapter.
      currentParagraphs.push(currentParagraph.trim())
      currentParagraph = line.trim()

      chapters.push({
        number: currentChapterNumber,
        paragraphs: [...currentParagraphs]
      })

      // Reset for new chapter.
      currentChapterNumber = parseInt(chapterMatch[1], 10)
      currentParagraphs = []
    }
    else if (/^\s{4,}/.test(line)) {
      // Tabbed lines start new paragraphs
      currentParagraphs.push(currentParagraph.trim())
      currentParagraph = line.trim()
    }
    else {
      // Continuation of the current paragraph.
      currentParagraph += line.trim() ? ' ' + line.trim() : ''
    }
  })

  // Add the last paragraph and chapter.
  currentParagraphs.push(currentParagraph.trim())
  chapters.push({ number: currentChapterNumber, paragraphs: currentParagraphs })

  return chapters
}
