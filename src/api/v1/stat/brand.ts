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
    this.http.get(`/v1/stat/${this.version}/entry`)
  }
  /**
   * 用户分析
   */
  getUser() {
    this.http.get(`/v1/stat/${this.version}/user`)
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
  getMarketing() {
    return this.http.get(`/v1/stat/${this.version}/marketing`)
  }
  /** */
}
export interface GetBrandIndexInput { }
