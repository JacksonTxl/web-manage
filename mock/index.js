const { wrapper } = require('webpack-mocker-api')
https://www.npmjs.com/package/webpack-mocker-api
const zlx = require('./zlx')

const mockerApis = {
  ...zlx
}

module.exports = wrapper(mockerApis)
