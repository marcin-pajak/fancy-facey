import { MobileNetMultiplier, PoseNet } from "@tensorflow-models/posenet";
import { load } from "@tensorflow-models/posenet";
import { isMobile } from "../utils/isMobile";
import { ModelState } from "./types";

let state: ModelState;

const isMobileDevice = isMobile(navigator.userAgent);
const mobileNetArchitecture: MobileNetMultiplier = isMobileDevice ? 0.5 : 0.75;

/**
 * Init TS model
 */
export const loadNet = async (): Promise<PoseNet> =>
  await load(mobileNetArchitecture);

/**
 * Set up state
 * @param net
 */
export const configureModel = (net: PoseNet) => {
  state = {
    ...state,
    net,
    config: {
      algorithm: "multi-pose",
      mobileNetArchitecture,
      outputStride: 16,
      imageScaleFactor: 0.5,
      maxPoseDetections: 5,
      minPoseConfidence: 0.15,
      minPartConfidence: 0.1,
      nmsRadius: 30.0
    }
  };
};

/**
 * Return current state
 */
export const getModel = () => state;
