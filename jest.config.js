/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "svelte"],
  moduleNameMapper: {
    "^\\$static(.*)$": "<rootDir>/static$1",
    "^\\$lib(.*)$": "<rootDir>/src/lib$1",
    "^\\$src(.*)$": "<rootDir>/src$1",
  },
};
