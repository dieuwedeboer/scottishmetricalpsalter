const BASE = 'tunes/';

/**
 * All tune filenames must follow the pattern set by this function.
 * The tune's name is converted to alphanumeric characters only.
 * No spaces or dots.
 *
 * @todo This function should be part of the tune prototype object.
 */
function filePath(name) {
  return BASE + name.replace(/\W/g, '') + '.musicxml'
}

/**
 * Array of tune object.
 */
const tunelist = [
  {
    file: filePath('Crimond'),
    name: 'Crimond',
    metre: 'common',
  },
  {
    file: filePath('Felix'),
    name: 'Felix',
    metre: 'common',
  },
  {
    file: filePath('Spohr'),
    name: 'Spohr',
    metre: 'common',
    metadata: { },
  },
  {
    file: filePath('Old100th'),
    name: 'Old 100th',
    metre: 'long',
  },
  {
    file: filePath('Richmond'),
    name: 'Richmond',
    metre: 'common',
  },
  {
    file: filePath('Tallis'),
    name: 'Tallis',
    metre: 'common',
  },
  {
    file: filePath('TallisCanon'),
    name: 'Tallis\' Canon',
    metre: 'long',
  },
]

export default tunelist
