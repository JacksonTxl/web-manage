import { HttpService } from '@/services/http.service'
import { AppConfig } from '@/constants/config'

export class StatIApi {
  private version: string
  constructor(protected http: HttpService, protected appConfig: AppConfig) {
    this.version = 'club'
  }
  /**
   *
   */
  getTop() {
    return this.http.get(`/v1/stat/overview/shop/${this.version}/top`)
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
  getEntry() {
    return this.http.get(`/v1/stat/overview/shop/entry`)
  }
  /**
   *  转化
   */
  getMember() {
    return this.http.get(`/v1/stat/overview/shop/${this.version}/member`)
  }
  /**
   * 客单价
   */
  getAvg() {
    return this.http.get(`v1/stat/${this.version}/avg`)
  }
}
export interface GetBrandIndexInput { }
