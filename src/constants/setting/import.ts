export const enum IMPORT {
  MEMBER_BASIC = 1,
  MEMBER_RECORD = 2,
  STAFF = 3,
  MEMBER_CARD_BASIC = 4,
  MEMBER_CARD_PRICE = 5,
  DEPOSIT = 16,
  TEAM_COURSE = 15,
  PERSONAL_BASIC = 6,
  PERSONAL_PRICE = 7,
  SUPPORT_SOLD_SHOP = 8,
  SUPPORT_CONSUME_SHOP = 9,
  SOLD_MEMBER_CARD = 10,
  SOLD_MEMBER_CARD_ENTER_TIME = 11,
  SOLD_PERSONAL_COURSE = 12,
  SOLD_PACKAGE = 17,
  SOLD_LEASE = 13,
  SOLD_DEPOSIT = 14,
  FILE_SAVE_TYPE = 1,
  FAMILY_CARD = 18
}
export const enum IMPORT_STATUS {
  SUCCESS = 1,
  IMPORTING = 2,
  ERROR = 3
}
export const IMPORT_TEXT = (vm: any) => {
  return {
    1: `导入用户-基础信息`,
    2: `导入用户-跟进员工`,
    3: '导入员工',
    4: `导入商品-${vm.$c('member_card')}基础信息`,
    5: `导入商品-${vm.$c('member_card')}价格信息`,
    6: '导入商品-私教课基础信息',
    7: '导入商品-私教课价格信息',
    8: '导入商品-支持售卖门店',
    9: '导入商品-支持消费门店',
    10: `导入售出-${vm.$c('member_card')}`,
    11: `导入售出-${vm.$c('member_card')}入场时间`,
    12: '导入售出-私教课',
    13: '导入售出-租赁柜',
    14: '导入售出-储值卡',
    15: '导入商品-团体课信息',
    16: '导入商品-储值卡信息',
    17: '导入售出-课程包',
    18: '导入售出-多人卡'
  }
}
