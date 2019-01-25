const mockNavigator = {
  mediaDevices: {
    enumerateDevices: jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve([
          { deviceId: "1", kind: "videoinput" },
          { deviceId: "2", kind: "audio" },
          { deviceId: "3", kind: "videoinput" }
        ])
      )
  },
  userAgent: "Mozilla"
};

Object.defineProperty(window, "navigator", {
  value: mockNavigator
});
