import { EMOJIS } from "./list";
import { Emoji, EmojiState } from "./types";

export const TOGGLE_TIME: number = 7_000;

let state: EmojiState;

/**
 * Update current emoji
 * @param index
 */
export const setCurrentEmoji = (index: number) => {
  state = {
    ...state,
    currentEmojiIndex: index
  };
};

/**
 * Load all emojis, normally it would be an async API call
 */
export const loadEmojis = (): Emoji[] => EMOJIS;

/**
 * Configure Emojis
 * @param emojis
 */
export const configureEmojis = (emojis: Emoji[]) => {
  state = {
    currentEmojiIndex: 0,
    emojis: [...emojis]
  };

  // Toggle emoji every few seconds
  setInterval(() => {
    setCurrentEmoji(++state.currentEmojiIndex % state.emojis.length);
  }, TOGGLE_TIME);
};

/**
 * Return currently selected Emoji
 */
export const getCurrentEmoji = (): Emoji =>
  state.emojis[state.currentEmojiIndex];
