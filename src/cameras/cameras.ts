import { restartCanvasDrawing } from "../videoOutput/videoOutput";
import { CameraState } from "./types";

let state: CameraState;

/**
 * Return next camera index
 * @param currentId
 * @param ids
 */
const getNextIndex = (currentId: string, ids: string[]): number => {
  let currentIndex: number = ids.indexOf(currentId);
  return ++currentIndex % ids.length;
};

/**
 * Select next available camera
 */
export const toggleCamera = (): void => {
  state = {
    ...state,
    cameraCurrentIndex: getNextIndex(getCurrentCameraId(), state.cameraIds)
  };
  restartCanvasDrawing();
};

export const shouldAllowSwitchingCamera = (camerasQty: number): boolean =>
  camerasQty > 1;

/**
 * Return currently selected camera id
 */
export const getCurrentCameraId = (): string =>
  state.cameraIds[state.cameraCurrentIndex];

/**
 * Get constraints for currently selected camera
 */
export const getContstraints = (): MediaStreamConstraints => ({
  audio: false,
  video: {
    deviceId: {
      exact: getCurrentCameraId()
    }
  }
});

/**
 * Get all cameras available on the device
 */
export const loadCameras = async (): Promise<MediaDeviceInfo[]> => {
  const cameras: MediaDeviceInfo[] = await navigator.mediaDevices.enumerateDevices();
  return cameras.filter(device => device.kind === "videoinput");
};

/**
 * Camera Side Effects
 * @param cameras
 */
export const configureCameras = (cameras: MediaDeviceInfo[]) => {
  state = {
    cameraCurrentIndex: 0,
    cameraIds: cameras.map(camera => camera.deviceId)
  };
};
