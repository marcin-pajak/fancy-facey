import {
  loadCameras,
  configureCameras,
  getContstraints,
  getCurrentCameraId,
  shouldAllowSwitchingCamera,
  toggleCamera
} from "./index";

jest.mock("../videoOutput/videoOutput", () => ({
  restartCanvasDrawing: jest.fn()
}));

describe("Camera Module", () => {
  test("should load available cameras", async () => {
    const cameras = await loadCameras();
    expect(Array.isArray(cameras)).toBe(true);
    expect(cameras.length).toBe(2);
  });

  test("should configure cameras", async () => {
    const cameras = await loadCameras();
    configureCameras(cameras);
    expect(getCurrentCameraId()).toBe("1");
  });

  test("should allow switching camera", () => {
    expect(shouldAllowSwitchingCamera(2)).toBe(true);
  });

  test("should not allow switching camera", () => {
    expect(shouldAllowSwitchingCamera(1)).toBe(false);
  });

  test("should get constraints for current camera", () => {
    const video = <MediaTrackConstraints>getContstraints().video;
    const deviceId = <ConstrainDOMStringParameters>video.deviceId;
    expect(deviceId.exact).toBe(getCurrentCameraId());
  });

  test("should toggle through all available cameras and start over", async () => {
    const cameras = await loadCameras();
    configureCameras(cameras);
    toggleCamera();
    expect(getCurrentCameraId()).toBe("3");
    toggleCamera();
    expect(getCurrentCameraId()).toBe("1");
  });
});
