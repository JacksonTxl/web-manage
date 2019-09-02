import { Api } from '../../api'
export interface GetPrizedListQuery {
  coupon_status: number
  coupon_name: number
  specs_id: number
}
export interface AddParams {
  wheel_bg: number
  activity_base: object
  activity_rule: object
  activity_prizes: object
  activity_lucky: object
}

export class LotteryApi extends Api {
  getPrizedList(query: GetPrizedListQuery) {
    return this.http.get(`/v1/plugin/wheel/prized`, {
      query
    })
  }
  // 核销
  checkin(prize_code: string) {
    return this.http.get('/v1/plugin/wheel/checkin', {
      query: { prize_code }
    })
  }
  // 添加大转盘
  add(params: AddParams) {
    return this.http.get('/v1/plugin/wheel/add', {
      params
    })
  }
  // 编辑大转盘
  edit(params: AddParams) {
    return this.http.get('/v1/plugin/wheel/edit', {
      params
    })
  }
  // 详情
  info(activity_id: string) {
    return this.http.get('/v1/plugin/wheel/edit', {
      query: { activity_id }
    })
  }
  // 抽奖
  join(activity_id: string, member_id: number) {
    return this.http.get('/v1/plugin/wheel/join', {
      query: { activity_id, member_id }
    })
  }
  // 活动列表
  getActivityList() {
    return this.http.get('/v1/plugin/wheel')
  }
  // 用户列表
  getUserList() {
    return this.http.get('/v1/plugin/member')
  }
}
