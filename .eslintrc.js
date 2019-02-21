module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'space-before-function-paren': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
