export enum CARD_TYPE {
  /**
   * 次卡
   */
  NUMBER = 1,
  /**
   * 期限卡
   */
  PERIOD = 2
}

export enum SELL_STATUS {
  /**
   * 可售卖
   */
  CAN_SELL = 1,
  /**
   * 不可售卖
   */
  NO_SELL = 2
}

export enum SELL_TYPE {
  /**
   * 用户端售卖
   */
  CLIENT = 1,
  /**
   * 线下售卖
   */
  OFFLINE = 2
}

export enum PRICE_SETTING {
  /**
   * 统一定价
   */
  UNIFORM_PRICE = 1,
  /**
   * 门店定价
   */
  SHOP_PRICE = 2
}

export enum ADMISSION_RANGE {
  /**
   * 单店
   */
  ONLY_STORE = 1,
  /**
   * 多店
   */
  GENERAL_STORE = 2,
  /**
   * 全店
   */
  ALL_STORE = 3
}

export enum PUBLISH_CHANNEL {
  /**
   * 品牌
   */
  BRAND = 1,
  /**
   * 门店
   */
  SHOP = 2
}

export enum SUPPORT_SALES {
  /**
   * 全部场馆
   */
  ALL_STORE = 1,
  /**
   * 指定场馆
   */
  SPECIFIED_STORE = 2,
  /**
   * 同入场门店
   */
  ENTRY_STORE = 3
}

export enum TRANSFER_UNIT {
  /**
   * 天
   */
  DAY = 1,
  /**
   * 月
   */
  MONTH = 2,
  /**
   * 年
   */
  YEAR = 3
}

export enum UNIT {
  /**
   * %
   */
  PERCENT = 1,
  /**
   * 元
   */
  RMB = 2
}

export enum ACTIVATE_TYPE {
  /**
   * 即时开卡
   */
  IMMEDIATE = 1,
  /**
   * 到店开卡
   */
  ARRIVE = 2,
  /**
   * 指定日期开卡
   */
  APPOINT = 3
}

export enum SHELF_STATUS {
  /**
   * 已下架
   */
  OFF = 1,
  /**
   * 已上架
   */
  ON = 2,
  /**
   * 未上架
   */
  NOT_ON = 3
}

export enum COURSE_INTERESTS {
  /**
   * 无
   */
  NULL = 1,
  /**
   * 全部团体课程
   */
  ALL = 2,
  /**
   * 指定团体课程
   */
  APPOINT = 3
}

export enum INOUT_TYPE {
  /**
   * 不限制
   */
  NO_LIMIT = 1,
  /**
   * 自定义
   */
  CUSTOM = 2
}
