import { render, makeHidden } from "./dom";

/**
 * UI Error Component
 * @param error
 */
const ErrorComponent = (error: string): string =>
  `<div class="Error"><p>${error}</p></div>`;

// Log error
const logError = (error: Error) => {
  console && console.log(error);
};

// Render UI
const renderError = (message: string) => {
  const app = document.getElementById("js-app");
  makeHidden(document.getElementById("js-loading"));
  render(ErrorComponent(message), app);
};

/**
 * Render and log an error
 * @param error
 */
export const handleError = (error: Error) => {
  switch (error.name) {
    case "PermissionDeniedError":
    case "NotAllowedError":
      renderError("Permissions have not been granted to use your camera.");
      break;
    default:
      renderError(error.message || "Application error. Please try to reload.");
  }

  logError(error);
};
