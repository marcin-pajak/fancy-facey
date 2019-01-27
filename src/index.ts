import { loadNet, configureModel, PoseNet } from "./model";
import { loadCameras, configureCameras, configureCamerasUI } from "./cameras";
import { loadEmojis, configureEmojis, Emoji } from "./emojis";
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
    const net: PoseNet = await loadNet();
    configureModel(net);

    // Load & Configure cameras
    const cameras: MediaDeviceInfo[] = await loadCameras();
    configureCameras(cameras);
    configureCamerasUI(cameras);

    // Load & Configure emojis
    const emojis: Emoji[] = loadEmojis();
    configureEmojis(emojis);

    // Let's play (video)
    const {
      video,
      canvas
    }: {
      video: HTMLVideoElement;
      canvas: HTMLCanvasElement;
    } = loadVideoOutput();
    await configureVideoOutput(video, canvas);

    // Register SW
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  } catch (error) {
    handleError(error);
  }

  // Unsubscribe from events
  document.removeEventListener("DOMContentLoaded", Init);
};

document.addEventListener("DOMContentLoaded", Init);
