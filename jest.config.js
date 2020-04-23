module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transformIgnorePatterns: [ //vue-backtotop contains uncompiled ES6 code which jest cant process - fix found here https://stackoverflow.com/questions/55794280/jest-fails-with-unexpected-token-on-import-statement
    "node_modules/(?!(vue-backtotop"
    + ")/)"
  ],
};
