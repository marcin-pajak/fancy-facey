import { Keypoint } from "@tensorflow-models/posenet";
import { Vector2D } from "../types";
import { Emoji } from "../emojis";

/**
 * Draw image onto a canvas
 * @param ctx
 * @param position
 * @param image
 */
export function drawImage(
  ctx: CanvasRenderingContext2D,
  position: Vector2D,
  image: HTMLImageElement
): void {
  const { height, width } = image;
  const { x, y } = position;
  ctx.drawImage(image, x - width / 2, y - height / 2, width, height);
}

/**
 * Draw pose emojis onto a canvas
 */
function drawKeypoints(
  keypoints: Array<Keypoint>,
  image: HTMLImageElement,
  ctx: CanvasRenderingContext2D
): void {
  keypoints.map(({ position }) => {
    drawImage(ctx, position, image);
  });
}

/**
 * Draw video frame onto a canvas
 * @param ctx
 * @param video
 */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement
): void {
  const { width, height } = video;

  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.scale(-1, 1);
  ctx.translate(-width, 0);
  ctx.drawImage(video, 0, 0, width, height);
  ctx.restore();
}

/**
 * Returns all keypoints that match current emoji placement and minimal confidence of recognision
 * @param currentEmoji
 * @param keypoints
 * @param minConfidence
 */
export const getRelevantKeypoints = (
  currentEmoji: Emoji,
  keypoints: Array<Keypoint>,
  minConfidence: number
) =>
  keypoints
    .filter(keypoint => currentEmoji.parts.includes(keypoint.part))
    .filter(keypoint => keypoint.score > minConfidence);

// Draw relevant emojis for each person
export function drawEmojis(
  poses,
  currentEmoji,
  minPoseConfidence,
  minPartConfidence,
  ctx
) {
  poses
    .filter(pose => pose.score >= minPoseConfidence)
    .map(pose =>
      drawKeypoints(
        getRelevantKeypoints(currentEmoji, pose.keypoints, minPartConfidence),
        currentEmoji.image,
        ctx
      )
    );
}
