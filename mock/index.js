const { wrapper, mock } = require('webpack-mocker-api')
const mockJson = require('./mock.json')
const checkinTableJson = require('./checkin-table.json')

const mockerApis = {
  /**
   * 使用对象
   */
  'GET /_api/v1/example': {
    data: {
      auth: ['123']
    }
  },
  // 'GET /_api/v1/plugin/sign_up/23677/roster'(req, res) {
  //   console.log(req)
  //   res.status(200).json(checkinTableJson)
  // },
  // 'GET /_api/v1/plugin/sign_up/search'(req, res) {
  //   console.log(req)
  //   res.status(200).json(checkinTableJson)
  // },
  // 'GET /_api/v1/plugin/sign_up': {
  //   data: {
  //     list: [
  //       {
  //         id: 202136932122859,
  //         activity_name: 'helinhantest',
  //         start_time: '2019-09-17 13:57',
  //         end_time: '2019-09-17 13:57',
  //         publish_time: '2019-09-17 13:57',
  //         activity_status: {
  //           id: 1,
  //           name: '开启'
  //         },
  //         ticket_info: [
  //           {
  //             id: 202136932122860,
  //             name: '免费票'
  //           }
  //         ],
  //         total_people: 100,
  //         join_people: 0,
  //         ticket_type_num: 1,
  //         auth: []
  //       }
  //     ],
  //     page: {
  //       total_counts: 1,
  //       total_pages: 1,
  //       current_page: 1,
  //       size: 10
  //     }
  //   }
  // },
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
  'GET /_api/v1/cards/member/shop/back/181184018055236': mockJson,

  'GET /_api/v1/excel/download/237261979975729': {
    data: {
      down_url: 'https://saas.test.styd.cn/img/pic.545c7ed0.jpg'
    }
  }
}

module.exports = wrapper(mockerApis)
