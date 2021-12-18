const BASE = '/tunes/';

/**
 * Array of tune object.
 */
const tunelist = [
  {
    // @todo this could be computed e.g. "BASE + name + '.musicxml'"
    file: BASE + 'Spohr.musicxml',
    name: 'Spohr',
    number: 133,
    metre: 'common',
    metadata: { },
  },
  {
    file: BASE + 'Crimond.musicxml',
    name: 'Crimond',
    number: 46,
  },
  {
    file: BASE + 'Old100th.musicxml', // We have a problem with spaces.
    name: 'Old 100th',
    number: 10,
  },
]

export default tunelist
