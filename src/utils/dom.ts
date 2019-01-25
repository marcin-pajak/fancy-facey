/**
 * Show node
 * @param node
 */
export const makeVisible = (node: HTMLElement) => {
  node && node.classList.remove("is-hidden");
};

/**
 * Hide node
 * @param node
 */
export const makeHidden = (node: HTMLElement) => {
  node && node.classList.add("is-hidden");
};

/**
 * Render Component
 * @param template
 * @param element
 */
export const render = (template, element) => {
  element.innerHTML += template;
};
