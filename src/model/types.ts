import {
  MobileNetMultiplier,
  OutputStride,
  PoseNet
} from "@tensorflow-models/posenet";

export declare type ModelConfig = {
  algorithm: string;
  mobileNetArchitecture: MobileNetMultiplier;
  outputStride: OutputStride;
  imageScaleFactor: number;
  maxPoseDetections: number;
  minPoseConfidence: number;
  minPartConfidence: number;
  nmsRadius: number;
};

export declare type ModelState = {
  net: PoseNet;
  config: ModelConfig;
};
