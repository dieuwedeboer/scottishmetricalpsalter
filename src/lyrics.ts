import { LyricsReader, IXmlElement} from 'opensheetmusicdisplay'
import { useDisplay } from './osmd'
import syllables from './syllables.json'

/**
 * Helper function to convert an XML string to HTML template element.
 */
function htmlToElement(html: string): string {
  var template = document.createElement('template')
  html = html.trim() // Never return a text node of whitespace as the result
  template.innerHTML = html
  return template.content.firstChild
}

function stanzaToWords(stanza: string[]): string[] {
  return stanza
    .map(line => line.replace(/^\d+\s*/, '')) // Remove verse numbers
    .map(line => line.split(/\s+/)) // Split line into words
    .map(line => splitIntoSyllables(line)) // Split each word into syllables
    .flat() // Flatten the array of arrays
}

// This is not final since we need to change the "syllabic"
// splitting further down in code.
// We could return each word as an array, etc, or even assign
// single, begin, middle, end metadata here.
function splitIntoSyllables(line: string[]): string[] {
  const punctuationRegex = /[,.?:;']$/

  return line.map(word => {
    // Extract and store any trailing punctuation
    const punctuationMatch = word.match(punctuationRegex)
    const punctuation = punctuationMatch ? punctuationMatch.join('') : ''

    // Remove punctuation for dictionary lookup
    const cleanWord = word.replace(punctuationRegex, '')

    // Look up the word, and add the punctuation back to the last syllable
    const value = syllables[cleanWord] ?? [cleanWord]
    if (punctuation && value.length > 0) {
      value[value.length - 1] += punctuation
    }

    return value
  }).flat()
}

// @todo Remove
const testVerse = [
  'That', 'man', 'hath', 'per-', '-fect', 'bless-', '-ed-', '-ness,',
  'who', 'walk-', '-eth', 'not', 'a-', '-stray',
  'In', 'coun-', '-sel', 'of', 'un-', '-god-', '-ly', 'men,',
  'nor', 'stands', 'in', 'sin-', '-ners\'', 'way,',
]

// A tune must already be loaded before lyrics can be added.
export default function showLyrics(psalm: any[]) {
  const display = useDisplay()
  const lyricsReader = new LyricsReader(display.Sheet)
  let veIndex = 0

  const verse = stanzaToWords(psalm.stanzas[0])
  console.log(syllables)
  console.log(syllables["blessedness"])

  // Loop over each "word" in the verse.
  verse.every((word, index) => {
    // Always add lyrics to the soprano line.
    let e = display.Sheet.Instruments[0].Voices[0].VoiceEntries[veIndex]
    if (e === undefined) return false

    // Check for syllables
    // @todo this very crude and temporary way to handle syllables
    let syllable = 'single'
    if (word.startsWith('-') && word.endsWith('-')) {
      syllable = 'middle'
    }
    else if (word.endsWith('-')) {
      syllable = 'begin'
    }
    else if (word.startsWith('-')) {
      syllable = 'end'
    }
    word = word.replace('-', '')

    // This is the minimal HTML that OSMD will parse into a lyric.
    let x = new IXmlElement(
      htmlToElement(`<lyric><syllabic>${syllable}</syllabic><text>${word}</text></lyric>`)
    )

    // Process a lyric entry via the reader.
    if (e.Notes[0].slurs.length > 0) {
      // Bit obtuse, but ensures we only add lyrics to the start of a slur
      // and then skip the next note.
      // @todo this might not work if we have triplets or a 3-note slur.
      lyricsReader.addLyricEntry([x], e.Notes[0].slurs[0].StartNote.voiceEntry)
      veIndex++
    }
    else {
      lyricsReader.addLyricEntry([x], e)
    }

    // Move onto the next voiceEntry for the next word.
    return ++veIndex
  })

  // As the file is already loaded, tell OSDM to update its graphic object
  display.updateGraphic()
  display.render()

  // for options around tags that OSMD might process for lyrics:
  // @see https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/6133cb7a/src/MusicalScore/ScoreIO/MusicSymbolModules/LyricsReader.ts#L11

}
