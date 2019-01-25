import { getContstraints } from "../cameras/cameras";
import { getModel } from "../model/model";
import { getCurrentEmoji } from "../emojis/emojis";
import { drawEmojis, drawFrame } from "../utils/drawingService";
import { makeHidden, makeVisible } from "../utils/dom";

let animationId: number;
let stream: MediaStream;

/**
 * Get HTML Elements for video and output
 */
export const loadVideoOutput = () => {
  const canvas = <HTMLCanvasElement>document.getElementById("js-output");
  const video = <HTMLVideoElement>document.getElementById("js-video");
  return { video, canvas };
};

/**
 * Set up camera and canvas
 * @param video
 * @param output
 */
export const configureVideoOutput = async (
  video: HTMLVideoElement,
  output: HTMLCanvasElement
) => {
  stream = await navigator.mediaDevices.getUserMedia(getContstraints());
  await setVideoOutputSettings(video, output, stream);
  startCanvasDrawing(video, output);

  // Update UI
  makeHidden(document.getElementById("js-loading"));
  makeVisible(document.getElementById("js-main"));
};

/**
 * Set sizes and run video
 * @param video
 * @param output
 * @param stream
 */
const setVideoOutputSettings = async (
  video: HTMLVideoElement,
  output: HTMLCanvasElement,
  stream: MediaStream
) => {
  const track = stream.getVideoTracks()[0];
  const settings = track.getSettings();
  const videoHeight = Math.min(settings.height, window.innerHeight);
  const videoWidth = Math.min(settings.width, window.innerWidth);
  video.width = videoWidth;
  video.height = videoHeight;
  output.width = videoWidth;
  output.height = videoHeight;
  video.srcObject = stream;

  return new Promise(resolve => {
    video.onloadedmetadata = () => {
      video.play();
      resolve();
    };
  });
};

/**
 * Render Canvas frames
 * @param video
 * @param output
 */
const startCanvasDrawing = (
  video: HTMLVideoElement,
  output: HTMLCanvasElement
) => {
  const ctx: CanvasRenderingContext2D = output.getContext("2d");
  // since images are being fed from a webcam
  const flipHorizontal = true;
  const model = getModel();

  async function poseDetectionFrame() {
    const currentEmoji = getCurrentEmoji();
    const { minPoseConfidence, minPartConfidence } = model.config;

    const poses = await model.net.estimateMultiplePoses(
      video,
      model.config.imageScaleFactor,
      flipHorizontal,
      model.config.outputStride,
      model.config.maxPoseDetections,
      model.config.minPartConfidence,
      model.config.nmsRadius
    );

    // Draw Video Frame
    drawFrame(ctx, video);

    // Draw relevant emojis for each person
    drawEmojis(poses, currentEmoji, minPoseConfidence, minPartConfidence, ctx);

    // Kick off the animation loop
    animationId = requestAnimationFrame(poseDetectionFrame);
  }

  poseDetectionFrame();
};

/**
 * Stop and run for new camera
 */
export const restartCanvasDrawing = () => {
  stream.getTracks().forEach(track => {
    track.stop();
  });
  cancelAnimationFrame(animationId);
  const { video, canvas } = loadVideoOutput();
  configureVideoOutput(video, canvas);
};
