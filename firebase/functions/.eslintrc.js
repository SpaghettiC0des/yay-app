/**
 * @type {import('eslint').Linter.Config}
 **/
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    'jest/globals': true,
  },
  overrides: [
    {
      files: ['*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off', // Allow any in tests
        'no-explicit-any': 'off',
      },
    },
  ],
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    sourceType: 'module',
  },
  ignorePatterns: [
    '/lib/**/*', // Ignore built files.
  ],
  plugins: ['@typescript-eslint', 'import', 'jest'],
  rules: {
    quotes: ['error', 'single'],
    'quote-props': ['error', 'as-needed'],
    'import/no-unresolved': 0,
    indent: ['error', 2],
    'valid-jsdoc': 0,
  },
};
