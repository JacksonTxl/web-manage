const mockWrapper = require('./mock-wrapper')
const Mock = require('mockjs')

const mockerApis = {
  /**
   * 使用对象
   */
  'GET /_api/v1/example': {
    data: {
      auth: ['123']
    }
  },
  /**
   * 使用express语法
   */
  'GET /_api/v1/example2'(req, res) {
    res.status(403).json({
      info: {}
    })
  },
  /**
   * 使用mockjs模版
   * mockjs 语法规范 https://github.com/nuysoft/Mock/wiki/Syntax-Specification
   */
  'GET /_api/v1/example3': Mock.mock({
    'menus|10': [
      {
        'id|+1': 1,
        name: '@first',
        menu_type: 2
      }
    ]
  }),
  /**
   * mock start
   */
  'GET /_api/v1/stat/course/shop/team/course'(req, res) {
    res.json(Mock.mock({
      data:{
        'list|20-200':[{
          'id|+1':1,
          coach_level_name:'@name',
          coach_name:'@name',
          course_name:'@name',
          course_time: '2019-09-03 00:00:00',
          reserved_num: 3,
          checkin_num: 6
        }]
      }
    }))
  }
}

module.exports = mockWrapper(mockerApis)
