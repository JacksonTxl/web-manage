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
const lcf = require('./lcf/index.js')
const lxlMock = require('./lxl/index')
const mockerApis = Object.assign(
  {},
  // lyjMock,
  // zlxMock,
  // llfMock,
  // lyMock,
  // ls,
  // lcf,
  // lxlMock
)

module.exports = wrapper(mockerApis)
