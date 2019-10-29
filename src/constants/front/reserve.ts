export const enum VISIT_STATUS {
  RESERVED = 1,
  VISITED = 2,
  CANCELED = 3
}

export const enum COURSE_STATUS {
  RESERVEING = 2,
  RESERVED = 3,
  SIGNED = 4,
  CANCELED = 5
}

export const enum RESERVE_TYPE {
  COURSE = 1,
  VISIT = 2
}
// 小票消费类型
export const enum TICKET_TYPE {
  PERSONAL = 1, // 私教课
  DESOPOSIT = 2, // 储值卡
  WECHAT = 3 // 微信
}
