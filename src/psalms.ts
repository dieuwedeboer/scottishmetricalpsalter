// This will initialise all the Psalms from the raw txt file.

export async function loadPsalmsFile() {
  const response = await fetch('psalms/psalms.txt')
  const text = await response.text()
  return text
}

export function processPsalmsText(text: string) {
  const lines = text.split('\n')
  const chapters = []
  let currentChapter = null
  let isMetadata = false
  let stanzaLines = []

  for (let line of lines) {
    line = line.trim()
    if (line.startsWith('PSALMS')) {
      if (currentChapter) chapters.push(currentChapter)
      currentChapter = {
        number: line.split(' ')[1],
        metadata: [],
        stanzas: []
      }
      isMetadata = true
      continue
    }
    else if (isMetadata && line.match(/^\d/)) {
      isMetadata = false
    }

    if (isMetadata) {
      currentChapter.metadata.push(line)
    }
    else if (line) {
      stanzaLines.push(line)
      if (stanzaLines.length === 4) {
        currentChapter.stanzas.push(stanzaLines)
        stanzaLines = []
      }
    }
  }

  if (currentChapter) chapters.push(currentChapter)
  return chapters
}
