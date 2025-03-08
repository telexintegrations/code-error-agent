// eslint.config.js (flat config example)
module.exports = [
  {
    files: ["src/**/*.ts", "src/*.ts"],
    ignores: [],
    languageOptions: {
      parser: require("@typescript-eslint/parser"), // Use TS parser
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        // Do NOT include "project" here to disable type-checking.
      },
      globals: {
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        console: "readonly",
      },
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
];
