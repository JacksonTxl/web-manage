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
  getTop(version: Version) {
    return this.http.get(`/v1/stat/${version.version}/top`)
  }
  /**
   * 入场次数
   */
  getEntry(version: Version) {
    return this.http.get(`/v1/stat/${version.version}/entry`)
  }
  /**
   * 用户分析
   */
  getUser(version: Version, query: RecentQuery) {
    return this.http.get(`/v1/stat/${version.version}/user`, { query })
  }
  /**
   * 客单价
   */
  getAvg(version: Version) {
    return this.http.get(`/v1/stat/${version.version}/avg`)
  }
  /**
   * 用户分析漏斗数据
   */
  getUserFunnel(version: Version) {
    return this.http.get(`/v1/stat/${version.version}/user/funnel`)
  }
  /**
   * 营销分析
   */
  getMarketing(version: Version, query: RecentQuery) {
    return this.http.get(`/v1/stat/${version.version}/marketing`, { query })
  }
  /**
   * 营销分析漏斗
   */
  getMarketingFunnel(version: Version) {
    return this.http.get(`/v1/stat/${version.version}/marketing/funnel`)
  }
}
export interface GetBrandIndexInput { }
export interface RecentQuery {
  recently_day?: number,
  start_date?:string,
  end_date?:string
}
export interface Version {
  version: string
}
