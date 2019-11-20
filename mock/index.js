/**
 * webpack-mocker-api
 * https://www.npmjs.com/package/webpack-mocker-api
 */
const { wrapper } = require('webpack-mocker-api')
const zlxMock = require('./zlx/index.js')
// const llfMock = require('./llf/index.js')
const ls = require('./ls/index.js')
const lyjMock = require('./lyj/index.js')
const lyMock = require('./ly/index.js')
const mockerApis = Object.assign(
  {},
  lyjMock,
  // zlxMock,
  // llfMock,
  // lyMock,
  ls
)

module.exports = wrapper(mockerApis)
