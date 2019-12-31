export const enum SMS {
  WECHAT = 1,
  ALIPAY = 2
}
export const enum USER_TYPES {
  USER = 1,
  CROWD = 2,
  ALL = 3
}
export const enum SEND_TYPES {
  NOW = 1,
  ONTIME = 2
}
export const enum TMPL_TYPES {
  CUSTOM = 2,
  PERSONAL = 1
}
export const enum NOTIFY_TYPES {
  MEMBER = 1,
  SHOP = 2
}
export const enum NOTIFY_MEMBER_SUB_TYPE {
  //会员通知：预约成功
  RESERVE_SUCCESS = 1,

  //会员通知：预约取消
  RESERVE_CANCEL = 2,

  //会员通知：预约变更
  RESERVE_CHANGE = 3,

  //会员通知：预约到期
  RESERVE_EXPIRE = 4,

  //会员通知：升级正式会员
  UPGRADE_FORMAL = 5,

  //会员通知：商品到期
  GOODS_EXPIRE = 6,

  //会员通知：商品消费
  GOODS_CONSUME = 7,

  //会员通知：开卡成功
  OPEN_CARD = 8,

  //会员通知：支付成功
  PAY_SUCCESS = 9,

  //会员通知：跑步完成
  TREADMILL_END = 10,

  //会员通知：场地预约成功通知
  VENUES_RESERVE_SUCCESS = 20,

  //会员通知：场地预约取消通知
  VENUES_RESERVE_CANCEL = 21,

  //会员通知：场地预约到期通知
  VENUES_RESERVE_DEADLINE = 22
}
export const enum NOTIFY_SHOP_SUB_TYPE {
  //门店通知：预约成功
  RESERVE_SUCCESS = 1,

  //门店通知：预约取消
  RESERVE_CANCEL = 2,

  //门店通知：过期未签到
  RESERVE_OVERDUE = 3,

  //门店通知：新订单
  NEW_ORDER = 4,

  //门店通知：订单取消
  ORDER_CANCEL = 5,

  //门店通知：交易成功
  ORDER_SUCCESS = 6,

  //门店通知：订单退款
  ORDER_REFUND = 7,

  /***v2.16.0新增模板通知**/
  //门店通知：分配跟进销售提醒
  ASSIGN_SELLER = 8,

  //门店通知：分配跟进教练提醒
  ASSIGN_COACH = 9,

  //门店通知：客保即将到期提醒
  MEMBER_EXPIRE_DUE = 10,

  //门店通知：客保到期提醒
  MEMBER_EXPIRE = 11,

  //门店通知：会员即将流失提醒
  MEMBER_FLOW_DUE = 12,

  //门店通知：会员流失提醒
  MEMBER_FLOW = 13,

  //门店通知：会员课程即将失效提醒
  MEMBER_COURSE_EXPIRE_DUE = 14,

  //门店通知：会员课程失效提醒
  MEMBER_COURSE_EXPIRE = 15,

  //门店通知：场地预约成功通知
  VENUES_RESERVE_SUCCESS = 20,

  //门店通知：场地预约取消通知
  VENUES_RESERVE_CANCEL = 21,

  /***v2.16.0新增模板通知**/
  /***v2.22.0新增模板通知**/
  //门店通知：入场成功时发送
  MEMBER_ENTRANCE_SUCCESS = 24,
  //门店通知：批量操作通知
  BATCH_OPERATE = 23
}
