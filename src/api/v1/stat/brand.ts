import { HttpService } from '@/services/http.service'
import { AppConfig } from '@/constants/config'
import { Injectable } from 'vue-service-app'
/**
 *
 *
 * @export
 * @class StatInBrandApi
 * @extends {Api}
 */
@Injectable()
export class StatApi {
  private version: string
  constructor(protected http: HttpService, protected appConfig: AppConfig) {
    this.version = 'club'
  }
  /**
   * 头部数据
   */
  getTop() {
    return this.http.get(`/v1/stat/${this.version}/top`)
  }
  /**
   * 入场次数
   */
  getEntry() {
    return this.http.get(`/v1/stat/${this.version}/entry`)
  }
  /**
   * 用户分析
   */
  getUser(query: RecentQuery) {
    return this.http.get(`/v1/stat/${this.version}/user`, { query })
  }
  /**
   * 客单价
   */
  getAvg() {
    return this.http.get(`/v1/stat/${this.version}/avg`)
  }
  /**
   * 用户分析漏斗数据
   */
  getUserFunnel() {
    return this.http.get(`/v1/stat/${this.version}/user/funnel`)
  }
  /**
   * 营销分析
   */
  getMarketing(query: RecentQuery) {
    return this.http.get(`/v1/stat/${this.version}/marketing`, { query })
  }
  /**
   * 营销分析漏斗
   */
  getMarketingFunnel() {
    return this.http.get(`/v1/stat/${this.version}/marketing/funnel`)
  }
}
export interface GetBrandIndexInput { }
export interface RecentQuery {
  recently_day?: number,
  start_date?:string,
  end_date?:string
}
