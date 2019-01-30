import { configureCamerasUI } from "./ui";
import { toggleCamera } from "./cameras";

jest.mock("./cameras", () => ({
  shouldAllowSwitchingCamera: () => true,
  toggleCamera: jest.fn()
}));

describe("Cameras UI", () => {
  beforeEach(() => {
    const cameras = [{ id: 1 }, { id: 2 }];
    document.body.innerHTML = '<div id="js-main"></div>';
    configureCamerasUI(cameras);
  });

  test("should render CameraSwitch component", () => {
    expect(document.getElementsByClassName("Button").length).toBe(1);
  });

  test("should trigger camera toggle", () => {
    const button = document.querySelector("#js-button");
    button.dispatchEvent(new Event("click"));
    expect(toggleCamera).toBeCalled();
  });
});
