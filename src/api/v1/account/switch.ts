import { Api } from '../../api'

export class SwitchApi extends Api {
  /**
   * 切换品牌
   */
  switchIndex(params: SwitchIndexInput) {
    return this.http.get('/v1/account/switch/index', { params, mock: {} })
  }
}

export interface SwitchIndexInput {
}
