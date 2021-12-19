import React, {useState, useEffect, createRef} from "../../_snowpack/pkg/react.js";
import OSMD from "../../_snowpack/pkg/opensheetmusicdisplay.js";
import AudioPlayer from "../../_snowpack/pkg/osmd-audio-player.js";
import Box from "../../_snowpack/pkg/@mui/material/Box.js";
function Score({file, setFile}) {
  const scoreDiv = createRef();
  const [ready, setReady] = useState(false);
  const [player, setPlayer] = useState(new AudioPlayer());
  async function loadFile(osmd, file2) {
    await osmd.load(file2);
    await osmd.render();
    await player.loadScore(osmd);
    setPlayer(player);
    setReady(true);
    window.osmd = osmd;
    window.audioPlayer = player;
  }
  useEffect(() => {
    const osmd = new OSMD.OpenSheetMusicDisplay(scoreDiv.current);
    osmd.TransposeCalculator = new OSMD.TransposeCalculator();
    osmd.setOptions({
      backend: "canvas",
      newPageFromXML: true,
      newSystemFromXML: true,
      followCursor: true
    });
    loadFile(osmd, file);
  }, []);
  async function changeTune(file2) {
    console.log(file2);
    setReady(false);
    setFile(file2);
    loadFile(window.osmd, file2);
  }
  return /* @__PURE__ */ React.createElement(Box, {
    sx: {p: 4}
  }, /* @__PURE__ */ React.createElement(Box, {
    sx: {maxWidth: 1200},
    ref: scoreDiv
  }));
}
export default Score;
