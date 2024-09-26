import eslint from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";

export default [
  eslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
        extraFileExtensions: [".svelte"],
      },
      globals: {
        ...globals.browser,
        ...globals.es2017,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript/eslint": typescript,
    },
  },
  {
    files: ["src/**/*.svelte"],
    plugins: {
      svelte,
    },
    processor: "svelte/svelte",
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: typescriptParser,
      },
    },
  },
  {
    ignores: ["build/", "node_modules/"],
  }
];
