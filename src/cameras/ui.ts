import { render } from "../utils/dom";
import { shouldAllowSwitchingCamera, toggleCamera } from "./cameras";

/**
 * Camera Switch UI Component
 */
const SwitchComponent = (): string =>
  `<button id="js-button" class="Button Button--primary Main-cameraSwitch">Change Camera</button>`;

/**
 * Show switch button and bind click callback
 * @param cameras
 */
export const configureCamerasUI = cameras => {
  if (!shouldAllowSwitchingCamera(cameras.length)) return;

  render(SwitchComponent(), document.getElementById("js-main"));
  document.getElementById("js-button").addEventListener("click", toggleCamera);
};
