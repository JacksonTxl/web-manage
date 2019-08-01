// doc see https://prettier.io/docs/en/configuration.html
module.exports = {
  singleQuote: true,
  semi: false,
  htmlWhitespaceSensitivity: 'ignore',
  overides: [
    {
      files: '*.d.ts',
      options: {
        singleQuote: false
      }
    }
  ]
}
