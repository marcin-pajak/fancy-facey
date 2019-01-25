import { getRelevantKeypoints } from "./drawingService";

describe("Drawing Service", () => {
  test("should ", () => {
    const keypoints = [
      {
        score: 0.1,
        part: "nose",
        position: { x: 1, y: 1 }
      },
      {
        score: 0.9,
        part: "nose",
        position: { x: 1, y: 1 }
      }
    ];
    const emoji = {
      id: "NoseEmoji",
      parts: ["nose"],
      image: new Image()
    };
    expect(getRelevantKeypoints(emoji, keypoints, 0.2)).toEqual([keypoints[1]]);
  });
});
