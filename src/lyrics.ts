import { LyricsReader, IXmlElement} from 'opensheetmusicdisplay'

/**
 * Helper function to convert an XML string to HTML template element.
 * @todo move this to a helpers.ts file.
 */
function htmlToElement(html) {
  var template = document.createElement('template');
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

// @todo Dynamically process verses and break syllables.
  // @todo also handle syllable separators better than manual -s
const verse = [
  'That', 'man', 'hath', 'per-', '-fect', 'bles-', '-sed-', '-ness,',
  'who', 'wal-', '-keth', 'not', 'a-', '-stray',
  'In', 'coun-', '-sel', 'of', 'un-', '-god-', '-ly', 'men,',
  'nor', 'stands', 'in', 'sin-', '-ners\'', 'way,',
]

// this should be called before osmd.render(), after load()
function testLyrics(display) {
  console.log(display)
  const lyricsReader = new LyricsReader(display.Sheet)
  let veIndex = 0

  // Loop over each "word" in the verse.
  verse.forEach(function (word, index) {
    // Always add lyrics to the soprano line.
    let e = display.Sheet.Instruments[0].Voices[0].VoiceEntries[veIndex]

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
    veIndex++
  })

  // As the file is already loaded, tell OSDM to update its graphic object
  display.updateGraphic()
  display.render()

  // for options around tags that OSMD might process for lyrics:
  // @see https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/blob/6133cb7a/src/MusicalScore/ScoreIO/MusicSymbolModules/LyricsReader.ts#L11
}

export default testLyrics
