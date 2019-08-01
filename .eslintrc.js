module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  plugins: ['prettier'],
  rules: {
    'space-before-function-paren': [2, 'never'],
    'comma-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    camelcase: 0,
    // 类和接口的命名必须遵守帕斯卡命名法，比如 PersianCat
    '@typescript-eslint/class-name-casing': 'error',
    'no-useless-constructor': 0,
    'prettier/prettier': 'error'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
