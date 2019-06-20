import { Api } from '@/api/api'

export class ShopHolidayApi extends Api {
  set(params: SetInput) {
    return this.http.post(`/v1/brand/${params.shop_id}/shop_holiday`, { params })
  }
  del(id: number) {
    return this.http.delete(`/v1/brand/${id}/shop_holiday`)
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
