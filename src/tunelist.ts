const BASE = 'tunes/';

/**
 * All tune filenames must follow the pattern set by this function.
 * The tune's name is converted to alphanumeric characters only.
 * No spaces or dots.
 *
 * @todo This function should be part of the tune prototype object.
 */
function fileName(name) {
  return BASE + name.replace(/\W/g, '') + '.musicxml'
}

/**
 * Array of tune object.
 */
const tunelist = [
  {
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
    file: BASE + 'Old100th.musicxml',
    name: 'Old 100th',
    number: 10,
  },
  {
    file: fileName('Felix'),
    name: 'Felix',
    number: 62,
  },
  {
    file: fileName('TallisCanon'),
    name: 'Tallis\' Canon',
    number: 15,
  },
  {
    file: fileName('Tallis'),
    name: 'Tallis',
    number: 138,
  },
  {
    file: fileName('Richmond'),
    name: 'Richmond',
    number: 103,
  },
]

export default tunelist
