import { Api } from '@/api/api'
const url = '/v1/shop/status'

export class ShopStatusApi extends Api {
  /**
   * 更改门店运营状态
   * @param params
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
}
export interface UpdateInput {
  /**
   * 门店id
   */
  id: number
  /**
   * 门店状态 1：预售；2：试运营；3：正常运行； 4：已关店
   */
  shop_status: number
}
