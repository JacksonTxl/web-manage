import { Api } from '@/api/api'
const url = '/v1/brand/shop_holiday'

export class ShopHolidayApi extends Api {
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
}
export interface AddInput {
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
