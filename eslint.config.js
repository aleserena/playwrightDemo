import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";

export default defineConfig([
  globalIgnores(["playwright-report", "test-results"]),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
  },
  js.configs.recommended,
  eslintPluginPrettierRecommended,
]);
