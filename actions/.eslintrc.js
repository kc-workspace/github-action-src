/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  plugins: [
    "@typescript-eslint",
    "unicorn",
    "deprecation",
    // "simple-import-sort",
    "import",
    "n",
    "jest",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:unicorn/recommended",
    "plugin:deprecation/recommended",
    "plugin:import/recommended",
    "plugin:jest/recommended",
    "plugin:n/recommended",
    "prettier/prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    es6: true,
    es2021: true,
    node: true,
  },
  rules: {
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        ignoreArrowShorthand: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        // varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrors: "all",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    // "simple-import-sort/imports": "error",
    // "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "type",
          ["builtin", "external", "internal"],
          ["parent", "sibling", "index"],
          "object",
          "unknown",
        ],
      },
    ],
    // Already support on import plugin
    "n/no-missing-import": "off",
    "n/no-unpublished-import": [
      "error",
      {
        ignoreTypeImport: true,
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        // always try to resolve types under `<root>@types` directory
        // even it doesn't contain any source code, like `@types/unist`
        alwaysTryTypes: true,
      },
    },
  },
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = config
