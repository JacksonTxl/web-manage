const { wrapper, mock } = require('webpack-mocker-api')

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
  // 'GET /_api/v1/sold/course/personal/operation/log/205826392916095'(req, res) {
  //   res.status(200).json({
  //     data: {
  //       list: [
  //         {
  //           id: 123456,
  //           operate_name: '冻结会员卡',
  //           operate_time: '2019-09-20 11:11:11',
  //           operate_source_name: 'Saas商家后台',
  //           description: '223123',
  //           operater_name: '陈陈',
  //           operate_object: [
  //             '用户:王小宝强37',
  //             '手机号:18811482276',
  //             '商品:张飞的绿卡'
  //           ],
  //           before_operate: [
  //             '有效开始时间:2019-09-19 15:52:00',
  //             '有效结束时间:2019-12-28 15:52:00'
  //           ],
  //           after_operate: [
  //             '冻结开始时间:2019-09-19 15:53:09',
  //             '冻结失效时间:2019-09-20 15:53:00',
  //             '有效开始时间:2019-09-19 15:52:00',
  //             '手续费金额:10'
  //           ]
  //         },
  //         {
  //           id: 123457,
  //           operate_name: '冻结会员卡',
  //           operate_time: '2019-09-20 11:11:11',
  //           operate_source_name: '员工',
  //           description: '223123',
  //           operater_name: '陈陈',
  //           operate_object: [],
  //           before_operate: [],
  //           after_operate: []
  //         }
  //       ],
  //       page: {
  //         total_counts: 2,
  //         total_pages: 2,
  //         current_page: 1,
  //         size: 10
  //       }
  //     }
  //   })
  // },
  /**
   * 使用mockjs模版
   * mockjs 语法规范 https://github.com/nuysoft/Mock/wiki/Syntax-Specification
   */
  'GET /_api/v1/example3': mock({
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
    res.json(
      mock({
        data: {
          'list|20-200': [
            {
              'id|+1': 1,
              coach_level_name: '@name',
              coach_name: '@name',
              course_name: '@name',
              course_time: '2019-09-03 00:00:00',
              reserved_num: 3,
              checkin_num: 6
            }
          ]
        }
      })
    )
  }
}

module.exports = wrapper(mockerApis)
