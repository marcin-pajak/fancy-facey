export declare type Emoji = {
  id: string;
  parts: Array<string>;
  size?: Array<number>;
  src?: any;
  image: HTMLImageElement;
};

export declare type EmojiState = {
  currentEmojiIndex: number;
  emojis: Emoji[];
};
