module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      parser: 'flow'
    }
  ],
  plugins: [],
  rules: {}
}
