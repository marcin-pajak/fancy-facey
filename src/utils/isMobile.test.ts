import { isMobile } from "./isMobile";

describe("isMobile", () => {
  test("should recognise mobile device", () => {
    expect(isMobile("iPhone")).toBe(true);
    expect(isMobile("Android")).toBe(true);
  });

  test("should be falsy for desktops", () => {
    expect(
      isMobile(
        "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 "
      )
    ).toBe(false);
  });
});
