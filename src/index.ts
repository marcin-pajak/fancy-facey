import { loadNet, configureModel } from "./model/model";
import { loadCameras, configureCameras, configureCamerasUI } from "./cameras";
import { loadEmojis, configureEmojis } from "./emojis/emojis";
import {
  loadVideoOutput,
  configureVideoOutput
} from "./videoOutput/videoOutput";
import { handleError } from "./utils/error";

/**
 * Initialise and configure:
 * - Model
 * - Cameras
 * - Emojis
 * - Video Output
 */
const Init = async (): Promise<void> => {
  try {
    // if no good just go home
    if (!navigator.mediaDevices) {
      throw new Error(
        "Unfourtunately your browser doesn't support meda devices."
      );
    }

    // Load & Configure model
    const net = await loadNet();
    configureModel(net);

    // Load & Configure cameras
    const cameras = await loadCameras();
    configureCameras(cameras);
    configureCamerasUI(cameras);

    // Load & Configure emojis
    const emojis = loadEmojis();
    configureEmojis(emojis);

    // Let's play (video)
    const { video, canvas } = loadVideoOutput();
    await configureVideoOutput(video, canvas);

    // Register SW
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  } catch (error) {
    handleError(error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Init();
});
