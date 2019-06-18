import { Api } from '@/api/api'
const url = '/v1/brand/shop_holiday'

export class ShopHolidayApi extends Api {
  set(params: SetInput) {
    return this.http.post(`${url}/${params.shop_id}`, { params })
  }
  del(id: number) {
    return this.http.delete(`${url}/${id}`)
  }
}
export interface SetInput {
  /**
   * 门店id
   */
  shop_id?: number
  /**
   * 放假开始时间
   */
  start_time?: string
  /**
   * 放假结束时间
   */
  end_time?: string
}
