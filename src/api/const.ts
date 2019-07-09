import { Api } from './api'

export class ConstApi extends Api {
  /**
   * 静态枚举
   */
  getEnum() {
    return this.http.get('/const/enum')
  }
}
