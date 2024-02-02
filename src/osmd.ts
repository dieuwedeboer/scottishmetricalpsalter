import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'

// This will manage OpenSheetMusicDisplay and audio player globally.
let display = null
let audioPlayer = new AudioPlayer()

export const setDisplay = (osmd) => {
  // OSMD requires a rendered <div> and the ref cannot be passed outside
  // a React function.
  display = osmd;

  // Set globals for debugging.
  // Do not use these directly but access then through the functions below.
  window.osmd = display
  window.audioPlayer = audioPlayer

};

export const useDisplay = () => display

export const useAudioPlayer = () => audioPlayer
