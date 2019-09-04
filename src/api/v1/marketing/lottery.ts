import { Api } from '../../api'
export interface GetPrizedListQuery {
  activity_id: string
  current_page: number
  size: number
}
export interface GetActivityListQuery {
  activity_status: number
  keyword: string
  current_page: number
  size: number
}

export interface AddParams {
  wheel_bg: number
  activity_base: object
  activity_rule: object
  activity_prizes: object
  activity_lucky: object
}

export class LotteryApi extends Api {
  // 奖品列表
  getPrizedList(query: GetPrizedListQuery) {
    return this.http.get(`/v1/plugin/wheel/prized`, {
      query
    })
  }
  // 活动列表
  getActivityList(query: GetActivityListQuery) {
    return this.http.get('/v1/plugin/wheel', { query })
  }
  // 用户列表
  getUserList() {
    return this.http.get('/v1/plugin/member')
  }
  //核销列表
  getCheckinList() {
    return this.http.get('/v1/plugin/code')
  }
  // 核销
  checkin(prize_code: string) {
    return this.http.post('/v1/plugin/wheel/checkin', {
      query: { prize_code }
    })
  }
  // 添加大转盘
  add(params: AddParams) {
    return this.http.post('/v1/plugin/wheel/add', {
      params
    })
  }
  // 编辑大转盘
  edit(params: AddParams) {
    return this.http.post('/v1/plugin/wheel/edit', {
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
  // 获取列表头部信息
  getHeaderInfo(id: number) {
    return this.http.get('/v1/plugin/wheel/' + id)
  }
}
