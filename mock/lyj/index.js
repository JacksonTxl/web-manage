const group_buy = require('./group_buy.json')
const group_buy_data = require('./group_buy-data.json')
const brand_personal_list = require('./brand_personal_list.json')
const group_buy_shop = require('./group_buy_shop.json')
const course_personal_coach_level = require('./course_personal_coach_level.json')
const detil = require('./detil.json')
const spread = require('./spread.json')
const data_top = require('./data_top.json')
module.exports = {
  'GET /_api/v1/plugin/group_buy': group_buy,
  'GET /_api/v1/plugin/group_buy/data/': group_buy_data,
  'GET /_api/v1/course/personal/brand_list': brand_personal_list,
  'GET /_api/v1/plugin/group_buy/shop/': group_buy_shop,
  'GET /_api/v1/course/personal/coach_level/': course_personal_coach_level,
  'GET /_api/v1/plugin/group_buy/spread/': spread,
  'GET /_api/v1/plugin/group_buy/3': detil,
  'GET /_api/v1/plugin/group_buy/data_top/': data_top
}
