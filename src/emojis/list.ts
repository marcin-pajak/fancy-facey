import rudolph from "./icons/rudolph.png";
import dollar from "./icons/dollar.png";
import cherries from "./icons/cherries.png";
import { Emoji } from "./types";

/**
 * Build HTML Image with emoji
 * @param src
 * @param size
 */
const perpareImage = (src: string, size: number[]): HTMLImageElement => {
  const image = new Image(size[0], size[1]);
  image.src = src;
  return image;
};

/**
 * List of all defined emojis
 */
export const EMOJIS: Emoji[] = [
  {
    id: "RUDOLPH",
    parts: ["nose"],
    image: perpareImage(rudolph, [80, 80]),
    src: rudolph,
    size: [80, 80]
  },
  {
    id: "DOLLAR_BABY",
    parts: ["leftEye", "rightEye"],
    image: perpareImage(dollar, [75, 75]),
    src: dollar,
    size: [75, 75]
  },
  {
    id: "CHERRY_LADY",
    parts: ["leftEar", "rightEar"],
    image: perpareImage(cherries, [60, 80]),
    src: cherries,
    size: [60, 80]
  }
];
