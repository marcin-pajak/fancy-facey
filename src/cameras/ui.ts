import { render } from "../utils/dom";
import { shouldAllowSwitchingCamera, toggleCamera } from "./cameras";
import CameraIcon from "../images/reverse-camera.svg";

/**
 * Camera Switch UI Component
 */
const SwitchComponent = (): string =>
  `<button id="js-button" class="Button Button--primary Main-cameraSwitch" title="Change Camera">
    <img class="Main-cameraIcon" src=${CameraIcon} alt="Change Camera" />
  </button>`;

/**
 * Show switch button and bind click callback
 * @param cameras
 */
export const configureCamerasUI = cameras => {
  if (!shouldAllowSwitchingCamera(cameras.length)) return;

  render(SwitchComponent(), document.getElementById("js-main"));
  document.getElementById("js-button").addEventListener("click", toggleCamera);
};
