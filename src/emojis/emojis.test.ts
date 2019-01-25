import {
  loadEmojis,
  configureEmojis,
  getCurrentEmoji,
  setCurrentEmoji,
  TOGGLE_TIME
} from "./index";
import { EMOJIS } from "./list";

describe("Emojis Module", () => {
  test("should load proper emojis", () => {
    const emojis = loadEmojis();
    expect(Array.isArray(emojis)).toBe(true);
  });

  test("should configure emojis", () => {
    configureEmojis(EMOJIS);
    expect(getCurrentEmoji()).toEqual(EMOJIS[0]);
  });

  test("should toggle all emojis every 7 seconds and start overer", () => {
    jest.useFakeTimers();
    configureEmojis(EMOJIS);
    expect(getCurrentEmoji()).toEqual(EMOJIS[0]);
    jest.advanceTimersByTime(TOGGLE_TIME + 1);
    expect(getCurrentEmoji()).toEqual(EMOJIS[1]);
    jest.advanceTimersByTime(TOGGLE_TIME + 1);
    expect(getCurrentEmoji()).toEqual(EMOJIS[2]);
    jest.advanceTimersByTime(TOGGLE_TIME + 1);
    expect(getCurrentEmoji()).toEqual(EMOJIS[0]);
  });

  test("should allow changing current emoji", () => {
    configureEmojis(EMOJIS);
    setCurrentEmoji(1);
    expect(getCurrentEmoji()).toEqual(EMOJIS[1]);
  });
});
