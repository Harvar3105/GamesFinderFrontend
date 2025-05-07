import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";


export default defineConfig({
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: false,
    },
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'import',
    'vue-i18n',
    'pinia',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:vue-i18n/recommended',
    'plugin:pinia/recommended',
  ],
  rules: {
    // general
    'no-console': 'warn',
    'no-debugger': 'warn',

    // Vue spec
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',

    // TypeScript
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // Import
    'import/no-unresolved': 'off',

    // i18n
    'vue-i18n/no-unused-keys': 'off',
    'vue-i18n/no-v-html': 'off',

    // Pinia
    'pinia/define-store': 'error',
  },
})

// export default defineConfig([
//   {
//     files: ["**/*.{js,ts,vue}"],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         ecmaVersion: "latest",
//         sourceType: "module",
//       },
//       globals: globals.browser,
//     },
//     plugins: {
//       js,
//       "@typescript-eslint": tseslint,
//       vue: pluginVue,
//     },
//     rules: {
//       ...js.configs.recommended.rules,
//       ...tseslint.configs.recommended.rules,
//       ...pluginVue.configs["flat/recommended"].rules,
//     },
//   },
// ]);