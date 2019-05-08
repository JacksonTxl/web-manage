import { Api } from './api'

export class ConstApi extends Api {
  /**
   * 静态枚举
   */
  getEnum() {
    return this.http.get('/const/enum', { mock: {} })
  }
  /**
   * 帮助信息 tooltip
   */
  getToolTip(id: GetToolTipInput) {
    return this.http.get(`/const/tooltip/${id}`)
  }
}

export interface GetToolTipInput {
  id: string
}
