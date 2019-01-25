const isAndroid = (userAgent: string): boolean => /Android/i.test(userAgent);

const isiOS = (userAgent: string): boolean =>
  /iPhone|iPad|iPod/i.test(userAgent);

/**
 * Is user on mobile device?
 * @param userAgent
 */
export const isMobile = (userAgent: string): boolean =>
  isAndroid(userAgent) || isiOS(userAgent);
