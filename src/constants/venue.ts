/**
 * 预约状态
 */
export const enum RESERVE_STATUS {
  FAILURE = 1,
  BEING = 2,
  SUCCESS = 3,
  CANCEL = 4
}
/**
 * 应用类型
 */
export const enum APP_TYPE {
  VENUES = 1
}
/**
 * 场地状态
 */
export const enum SITE_STATUS {
  ON = 1,
  OFF = 2
}
/**
 * 场馆状态
 */
export const enum AREA_STATUS {
  ON = 1,
  OFF = 2
}
/**
 * 是否可预约
 */
export const enum CAN_RESERVE {
  YES = 1,
  NO = 2
}
/**
 * 日期限制
 */
export const enum TIME_LIMIT_TYPE {
  UNLIMITED = 1,
  APPOINTED = 2
}
/**
 * 循环设置
 */
export const enum CYCLIC_TYPE {
  EVERYDAY = 1,
  CUSTOM = 2
}

export const WEEK_MAP = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
}
