module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json"
    }
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  coverageDirectory: "<rootDir>/build/test",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(css|scss|less)$": "identity-obj-proxy",
    "\\.(html)$": "identity-obj-proxy",
    "\\.(png|jpg|jpeg|gif|ttf|woff|woff2|eot|svg)$": "identity-obj-proxy",
    "^assets/(.*).json": "identity-obj-proxy"
  },
  setupFiles: ["jest-canvas-mock", "<rootDir>/tests/browserMocks.js"]
};
