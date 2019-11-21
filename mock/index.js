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
<<<<<<< HEAD
const lcf = require('./lcf/index.js')
=======
const lxlMock = require('./lxl/index')
>>>>>>> 39b09f989d57f75ff65a04077a4dc14c23d1e945
const mockerApis = Object.assign(
  {},
  lyjMock,
  // zlxMock,
  // llfMock,
  // lyMock,
  ls,
<<<<<<< HEAD
  lcf
=======
  lxlMock
>>>>>>> 39b09f989d57f75ff65a04077a4dc14c23d1e945
)

module.exports = wrapper(mockerApis)
