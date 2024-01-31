import { OpenSheetMusicDisplay } from 'opensheetmusicdisplay'
import AudioPlayer from 'osmd-audio-player'

// This will manage OpenSheetMusicDisplay and audio player globally.
let display = null
let audioPlayer = new AudioPlayer()

export const initialiseOpenSheetMusicDisplay = (osmd) => {
  // OSMD requires a rendered <div> so it is passed through from the App
  // useEffect.
  display = osmd;
  //audioPlayer = new AudioPlayer()
};

export const useDisplay = () => display

export const useAudioPlayer = () => audioPlayer
