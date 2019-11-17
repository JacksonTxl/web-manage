/**
 * webpack-mocker-api
 * https://www.npmjs.com/package/webpack-mocker-api
 */
const { wrapper } = require('webpack-mocker-api')
const zlxMock = require('./zlx/index.js')
const llfMock = require('./llf/index.js')
<<<<<<< Updated upstream
const lyjMock = require('./lyj/index.js')
const lyMock = require('./ly/index.js')
const mockerApis = Object.assign(
  {},
  // lyjMock
  // zlxMock,
  llfMock,
  lyMock
=======
const ls = require('./ls/index.js')

const mockerApis = Object.assign(
  {},
  zlxMock,
  ls,
  // llfMock
>>>>>>> Stashed changes
)

module.exports = wrapper(mockerApis)
