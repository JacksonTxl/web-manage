import { Api } from '../../api'

export class SwitchApi extends Api {
  /**
   * 切换品牌
   */
  switchIndex(params: SwitchIndexInput) {
    return this.http.get('/v1/account/switch/index', { params, mock: {} })
  }
  /**
   * 切换门店
   */
  switchShop(params: SwitchShopInput) {
    return this.http.put('/v1/account/switch/shop', { params })
  }
}

export interface SwitchIndexInput {}
export interface SwitchShopInput {
  shop_id: number
}
