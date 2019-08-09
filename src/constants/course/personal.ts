export enum SHOP_SETTING {
  /**
   * 全店
   */
  ALL_STORE = 1,
  /**
   * 指定门店
   */
  SPECIFIED_STORE = 2
}

export enum IS_AVAILABLE {
  /**
   * 无效
   */
  INVALID = 0,
  /**
   * 有效
   */
  VALID = 1
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
