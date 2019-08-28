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

export enum CONSUMPTION_RANGE {
  /**
   * 仅消费门店
   */
  ONLY_STORE = 1,
  /**
   * 通店
   */
  GENERAL_STORE = 2,
  /**
   * 全店
   */
  ALL_STORE = 3
}

export enum SUPPORT_SALES {
  /**
   * 所有门店
   */
  ALL_STORE = 1,
  /**
   * 指定门店
   */
  SPECIFIED_STORE = 2,
  /**
   * 同消费门店
   */
  CONSUMER_STORE = 3
}

export enum UNIT {
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

export enum TRANSFER_UNIT {
  /**
   * %
   */
  PERCENT = 1,
  /**
   * 元
   */
  RMB = 2
}

export enum IS_TRANSFER {
  /**
   * 不允许
   */
  NOT_ALLOW = 0,
  /**
   * 允许
   */
  ALLOW = 1
}
