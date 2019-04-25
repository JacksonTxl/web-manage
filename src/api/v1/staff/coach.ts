import { Api } from '@/api/api'
export class CoachApi extends Api {
  getCoachSelect(params: GetSelectCoachInput) {
    return this.http.post('/v1/staff/coach/select', { params })
  }
}
export interface GetSelectCoachInput {
  /**
   * 搜索关键字
   */
  keyword: string,
  /**
   * 分页size
   */
  size: number,
  /**
   * 门店id集合
   */
  shop_ids: number[]
}
