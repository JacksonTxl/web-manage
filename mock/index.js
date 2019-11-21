/**
 * webpack-mocker-api
 * https://www.npmjs.com/package/webpack-mocker-api
 */
const { wrapper } = require('webpack-mocker-api')
const zlxMock = require('./zlx/index.js')
const llfMock = require('./llf/index.js')
const lyMock = require('./ly/index.js')
const ztfMock = require('./ztf/index.js')

const mockerApis = Object.assign({}, zlxMock, ztfMock, lyMock, llfMock)

module.exports = wrapper(mockerApis)
