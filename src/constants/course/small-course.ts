export enum CLASS_STATUS {
  UNPUBLISH = 1,
  PUBLISH_UNSTARTED = 2,
  SIGNING_UNCLASSED = 3,
  SIGNING_CLASSED = 4,
  CLASS_FAILED = 5,
  CLASSED = 6,
  CLASS_END = 7
}
export enum COURSE_TYPE {
  FIXED_COURSE = 1, //  固定排课
  AUTO_COURSE = 2
}
export enum RESERVE_TYPE {
  UN_CHECK = 1, //  未签到
  CHECKED = 2, // 已签到
  TRUANCK = 3, // 旷课
  LAEVE_REMEDIAL = 4, // 请假已补课
  LAEVE_UNREMEDIAL = 5, // 请假未补课
  TRUANCK_REMEDIAL = 6 // 旷课已补课
}
export enum PERSON_TYPE {
  CHILD = 1, //  未成年
  ADULT = 0
}
export enum IS_SIGN {
  YES = '支持',
  NO = '不支持'
}
export enum IS_SIGN_ENTRANCE {
  YES = '必须有',
  NO = '可以没有'
}
