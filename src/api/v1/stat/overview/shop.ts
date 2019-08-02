import { Api } from '@/api/api'
const url = '/v1/shop/area_seat'

export class OverviewApi extends Api {
  /**
   *头部
   */
  getTop(query: Version) {
    return this.http.get(`/v1/stat/overview/shop/${query.version}/top`)
  }
  /**
   * 营收
   */
  getRevenue(query: RevenueParams) {
    return this.http.get(`/v1/stat/overview/shop/revenue`, { query })
  }
  /**
   * 课程
   */
  getCourse(query: RevenueParams) {
    return this.http.get(`/v1/stat/overview/shop/course`, { query })
  }
  /**
   * 入场
   */
  getInout(query: RevenueParams) {
    return this.http.get(`/v1/stat/overview/shop/entry`, { query })
  }
  /**
   * 新增会员
   */
  getNewMember(query: RevenueParams) {
    return this.http.get(`/v1/stat/overview/shop/new_member`, { query })
  }
  /**
   * 购买私教
   */
  getBuyCourse(query: RevenueParams) {
    return this.http.get(`/v1/stat/overview/shop/buy_course`, { query })
  }
  /**
   *  转化
   */
  getMember(query: Version) {
    return this.http.get(`/v1/stat/overview/shop/${query.version}/member`)
  }
}

export interface Version {
  version: string
}

export interface RevenueParams {
  recently_day?: number
  start_date?: string
  end_date?: string
}
