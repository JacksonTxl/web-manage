import { Api } from '@/api/api'
const url = '/v1/setting/course/personal/reserve'

export class PersonReserveSettingApi extends Api {
  /**
   * 私教课程预约设置info
   */
  getInfo() {
    return this.http.get(url)
  }
  /**
   * 私教课课程预约设置编辑
   */
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {
  /**
   * 私教预约范围开始选项,1 1小时后, 2 2小时后….12 12小时后
   */
  reserve_start: number,
  /**
   * 私教可预约范围: 1 1周 2 2 周 3 3周
   */
  reserve_limit: number,
  /**
   * 私教取消预约时间限制: 1 1小时后, 2 2小时后….12 12小时后
   */
  cancel_reserve: number,
  /**
   * 私教预约提醒选项: 1 1小时 2 2 小时 3 4小时 4 6小时 5 12小时 6 24小时
   */
  reserve_remind: number,
  /**
   * 私教是否支持用户自主签到: 1是 0否
   */
  is_sign: number,
  /**
   * 私教课程签到时间限制: 1 0分钟 2 10分钟 3 20分钟 4 30分钟 5 40分钟
   */
  sign_time: number,
  /**
   * 是否私教课程系统自动签到: 1 是 0 否
   */
  is_auto_sign: number,
  /**
   * 私教课程系统自动签到时间: 1 1 天 2 2天 3 3天
   */

  auto_sign_limit: number
}
