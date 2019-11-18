/**
 * 发布状态
 * @params {Number} ACTIVITY_STATUS
 * @params {Number} ACTIVITY_STATUS.PUBLISHER 备注：待发布
 * @params {Number} ACTIVITY_STATUS.NO_START 备注：未开始
 * @params {Number} ACTIVITY_STATUS.UNDER_WAY 备注：活动中
 * @params {Number} ACTIVITY_STATUS.UNDER_WAY 备注：已结束
 * */
export const enum ACTIVITY_STATUS {
  PUBLISHER = 1,
  NO_START = 2,
  UNDER_WAY = 3,
  UNDER_WAY = 4
}

/**
 * 发布状态
 * @params {Number} ACTIVITY_STATUS
 * @params {Number} ACTIVITY_STATUS.PROMPTLY 备注：立即发布
 * @params {Number} ACTIVITY_STATUS.NO_START 备注：暂不发布
 * @params {Number} ACTIVITY_STATUS.TIMING 备注：定时发布
 * */
export const enum RELEASE_SRTATUS {
  PROMPTLY = 1,
  TEMPORARILY = 2,
  TIMING = 3
}
