module.exports = {
  root: true, // Stop ESLint from looking outside this config
  env: {
    browser: true, // For browser globals like window, document
    node: true, // For Node.js globals like process
    es2022: true, // Enable modern ECMAScript features
  },
  parser: "@typescript-eslint/parser", // If you use TypeScript
  parserOptions: {
    ecmaVersion: "latest", // Always use latest ECMAScript syntax
    sourceType: "module", // Enable import/export
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended", // TypeScript rules
    "plugin:import/recommended", // Better import/export handling
    "plugin:import/typescript",
    "plugin:prettier/recommended", // Integrates Prettier
    "plugin:eslint-comments/recommended", // Prevents eslint-disable abuse
    "plugin:unicorn/recommended", // Modern best practices
  ],
  plugins: [
    "@typescript-eslint",
    "import",
    "prettier",
    "eslint-comments",
    "unicorn",
  ],
  rules: {
    // Prettier
    "prettier/prettier": "error",

    // General best practices
    "no-unused-vars": "off", // Use TS version instead
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "prefer-const": "error",

    // Import rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "import/no-unresolved": "error",
    "import/newline-after-import": "error",

    // Unicorn adjustments for realism
    "unicorn/prevent-abbreviations": "off", // Sometimes too strict
    "unicorn/filename-case": ["error", { case: "kebabCase" }],
    "unicorn/no-null": "off", // null is fine in many cases
  },
  overrides: [
    {
      files: ["*.test.{js,ts}", "**/__tests__/**"],
      env: { jest: true }, // Jest globals for test files
    },
  ],
};
