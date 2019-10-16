import { Api } from '../../api'

export interface TicketInfo {
  ticket_name: string
  ticket_price: number
  ticket_total_num: number
  crowd_id: number
  buy_limit_min: number
  buy_limit_max: number
  is_group_buy: number
  group_buy_min: number
  reduce_price: number
  buy_time_limit: number
  buy_start_time: string
  buy_end_time: string
  ticket_remark: string
}
export interface SignUpInfo {
  activity_id?: number
  activity_name: string
  start_time: string
  end_time: string
  province_id: number
  city_id: number
  area_id: number
  address: string
  image_key: string
  description: string
  activity_status: number
  ticket: TicketInfo[]
  member_limit_status: number
  member_limit_num: number
  rule_settings: string
}
/**
 * 列表查询条件
 */
export interface GetSignUpList {
  current_page?: number
  size?: number
  activity_name?: string
  /**
   * 活动状态 1开启 2未开启 3已过期 4草稿
   */
  activity_status?: number
}
/**
 * 名单列表查询条件
 *
 */
export interface GetSignUpSignList {
  id: number
  current_page?: number
  size?: number
  ticket_id?: number
  ticket_status?: number
  keyword?: string
}
export class SignUpApi extends Api {
  /**
   * 添加活动报名
   */
  AddSignUp(params: SignUpInfo) {
    return this.http.post('/v1/plugin/sign_up', { params })
  }
  /**
   * 编辑回显
   */
  getSignUpEditInfo(id: number) {
    return this.http.get(`/v1/plugin/sign_up/${id}`)
  }
  /**
   * 编辑活动信息
   */
  updateSignUpInfo(query: SignUpInfo) {
    return this.http.put(`/v1/plugin/sign_up`, { query })
  }
  /**
   * 获取活动列表
   */
  getSignUpList(query: GetSignUpList) {
    return this.http.get(`/v1/plugin/sign_up`, { query })
  }
  /**
   * 取消活动
   */
  cancelSignUp(id: number) {
    return this.http.put(`/v1/plugin/sign_up/${id}`)
  }
  /**
   * 获取某个活动的名单列表
   */
  getSignUpRoster(query: GetSignUpSignList) {
    return this.http.get(`/v1/plugin/sign_up/${query.id}/roster`, {
      query
    })
  }
  /**
   * 获取某个活动信息
   * @param id
   */
  getActivityInfo(activity_id: number) {
    return this.http.get(`/v1/plugin/sign_up/${activity_id}`)
  }
  /**
   * 票种签到
   */
  updateSIgnUpChecked(id: number) {
    return this.http.put(`/v1/plugin/sign_up/sign/${id}`)
  }
  /**
   * 【签到验票】票号，手机号，用户姓名搜索
   */
  getSignUpSignList(query: any) {
    return this.http.get(`/v1/plugin/sign_up/search`, query)
  }
  /**
   * 【签到验票】票号，手机号，用户姓名搜索
   */
  getSignUpDefaultExtInfo() {
    return this.http.get(`/v1/plugin/sign_up/get_default_ext_info`)
  }
}
