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
    if (line.startsWith('PSALM')) {
      if (currentChapter) chapters.push(currentChapter)
      currentChapter = {
        number: line.split(' ')[1],
        metadata: [],
        stanzas: []
      }
      isMetadata = true
      continue
    }
    else if (line.startsWith('#')) {
      // @todo We don't really want to skip comments
      // such as "The prayers of David ... are ended" in Psalm 72
      // or the aleph, beth, etc, in Psalm 119. We need a way to handle those.
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
