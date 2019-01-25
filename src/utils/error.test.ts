import { handleError } from "./error";

describe("handleError", () => {
  test("should render Error component with error message", () => {
    document.body.innerHTML =
      '<div id="js-app"><div id="js-loading"></div></div>';
    handleError(new Error("Some critical error"));
    expect(document.getElementsByClassName("Error").length).toBe(1);
  });
});
