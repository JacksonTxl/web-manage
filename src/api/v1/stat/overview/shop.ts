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
  getRevenue() {
    return this.http.get(`/v1/stat/overview/shop/revenue`)
  }
  /**
   * 课程
   */
  getCourse() {
    return this.http.get(`/v1/stat/overview/shop/course`)
  }
  /**
   * 入场
   */
  getInout() {
    return this.http.get(`/v1/stat/overview/shop/entry`)
  }
  /**
   * 新增会员
   */
  getNewMember() {
    return this.http.get(`/v1/stat/overview/shop/new_member`)
  }
  /**
   * 购买私教
   */
  getBuyCourse() {
    return this.http.get(`/v1/stat/overview/shop/buy_course`)
  }
  /**
   *  转化
   */
  getMember(query: Version) {
    return this.http.get(`/v1/stat/overview/shop/${query.version}/member`)
  }
}

export interface Version{
    version: string
}
