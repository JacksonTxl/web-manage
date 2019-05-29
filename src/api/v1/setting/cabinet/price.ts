import { Api } from '@/api/api'
const url = '/v1/setting/cabinet/price'

export class CabinetPriceApi extends Api {
  update(params: UpdateInput) {
    return this.http.put(url, { params })
  }
}

export interface UpdateInput {
  /**
   * 需要删除的储物柜id
   */
  ids: number[]
  /**
   * 价格
   */
  price_num: number
  /**
   * 转让手续费
   */
  transfer_num: number
  /**
   * 转让手续费 单位
   */
  transfer_unit: number
}
