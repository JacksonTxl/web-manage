const chalk = require('chalk')
const _ = require('lodash')

const mockWrapper = mockApis => {
  const result = _.mapValues(mockApis, item => {
    if (_.isPlainObject(item)) {
      let json = item
      json._is_mock = 1
      return (req, res) => {
        console.log(`${chalk.green('[mock]')} -> ${req.url}`)
        res.json(json)
      }
    }
    if (_.isFunction(item)) {
      return (req, res) => {
        console.log(`${chalk.green('[mock]')} -> ${req.url}`)
        const oriResJson = res.json.bind(res)
        res.json = function(json) {
          json = json || {}
          json._is_mock = 1
          return oriResJson.call(this, json)
        }
        item(req, res)
      }
    }
  })
  return result
}

module.exports = mockWrapper
