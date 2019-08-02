import { Api } from '@/api/api'
const url = '/v1/setting/course/team/reserve'

export class TeamReserveSettingApi extends Api {
  /**
   * 团课课程预约设置info
   */
  getInfo() {
    return this.http.get(url)
  }
  /**
   * 团课课课程预约设置编辑
   */
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {
  /**
   * 团课预约范围开始选项,1 1小时后, 2 2小时后….12 12小时后
   */
  reserve_start: number
  /**
   * 团课团课可预约范围: 1 1周 2 2 周 3 3周
   */
  reserve_range: number
  /**
   * 团课取消预约时间限制: 1 1小时后, 2 2小时后….12 12小时后
   */
  cancel_reserve: number
  /**
   * 团课预约提醒选项: 1 1小时 2 2 小时 3 4小时 4 6小时 5 12小时 6 24小时
   */
  reserve_remind: number
  /**
   * 预约上限设置
   */
  reserve_upper_limit: object
  /**
   * 是否支持候补预约: 1支持 0不支持
   */
  alternate_reserve: number
  /**
   * 团课是否支持用户自主签到: 1是 0否
   */
  is_sign: number
  /**
   * 团课课程签到时间限制: 1 0分钟 2 10分钟 3 20分钟 4 30分钟 5 40分钟
   */
  sign_time: number
  /**
   * 是否团课课程系统自动签到: 1 是 0 否
   */
  is_auto_sign: number
  /**
   * 团课课程系统自动签到时间: 1 1 天 2 2天 3 3天
   */
  auto_sign_limit: number
  /**
   * 团课是否支持爽约惩罚: 1支持 0不支持
   */
  is_miss_punishment: number
  /**
   * 爽约惩罚设置
   */
  miss_punishment: object
}
