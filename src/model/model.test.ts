import { load, PoseNet } from "@tensorflow-models/posenet";
import { loadNet, configureModel, getModel } from "./model";

jest.mock("@tensorflow-models/posenet", () => ({
  load: jest.fn()
}));

describe("Model Module", () => {
  test("should get net", () => {
    loadNet();
    const mockedFn = <jest.Mock>load;
    expect(mockedFn).toHaveBeenCalled();
  });

  test("should configure state", () => {
    const mock = <PoseNet>{};
    configureModel(mock);
    const model = getModel();
    expect(model.config).toBeDefined();
    expect(model.config.mobileNetArchitecture).toEqual(0.75);
  });
});
