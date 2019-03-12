module.exports = {
  coverageDirectory: "./.coverage/",
  collectCoverage: true,
  collectCoverageFrom: [
    "./**/*.{vue,js}",
    // If you're working off the default Vue CLI generated template, HelloWorld.vue contains no  methods, so it won't be listed.
    // Basically, jest is a JAVASCRIPT test framework => only test JAVASCRIPT => Vue template has js
    // Understand this make you out of shit a lot
    // https://stackoverflow.com/a/53250090/2552193
    // "src/**/*.{vue}",
    // main.js is excluded from unit tests because it's a bootstrap file.
    "!src/{main,registerServiceWorker,router,store}.js",
    "!./jest.config.js",
  ],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: [
    "**/tests/unit/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/"
};