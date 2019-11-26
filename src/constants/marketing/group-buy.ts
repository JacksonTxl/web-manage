/**
 * 发布状态
 * @params {Number} ACTIVITY_STATUS
 * @params {Number} ACTIVITY_STATUS.PUBLISHER 备注：待发布
 * @params {Number} ACTIVITY_STATUS.NO_START 备注：未开始
 * @params {Number} ACTIVITY_STATUS.UNDER_WAY 备注：活动中
 * @params {Number} ACTIVITY_STATUS.END 备注：已结束
 * */
export const enum ACTIVITY_STATUS {
  PUBLISHER = 1,
  NO_START = 2,
  UNDER_WAY = 3,
  END = 4
}

/**
 * 发布状态
 * @params {Number} RELEASE_STATUS
 * @params {Number} RELEASE_STATUS.PROMPTLY 备注：立即发布
 * @params {Number} RELEASE_STATUS.TEMPORARILY 备注：暂不发布
 * @params {Number} RELEASE_STATUS.TIMING 备注：定时发布
 * */
export const enum RELEASE_STATUS {
  PROMPTLY = 1,
  TEMPORARILY = 2,
  TIMING = 3
}

/**
 * 商品类型
 * @params {Number} PRODUCT_TYPE
 * @params {Number} PRODUCT_TYPE. 备注：立即发布
 * @params {Number} PRODUCT_TYPE. 备注：暂不发布
 * @params {Number} PRODUCT_TYPE. 备注：定时发布
 */
export const enum PRODUCT_TYPE {
  MEMBER = 1,
  DEPOSIT = 2,
  PERSONAL = 3,
  PACKAGE_COURSE = 4
}
