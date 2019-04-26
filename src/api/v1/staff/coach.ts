import { Api } from '@/api/api'
export class CoachApi extends Api {
  getCoachSelect(params: GetSelectCoachInput) {
    return this.http.post('/v1/staff/coach/select', { params })
  }
  /**
   *
   */
  getCoachBasic(params: GetCoachBasicInput) {
    return this.http.post('/v1/staff/coach/basic', { params })
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

export interface GetCoachBasicInput {
  /**
   * 教练id集合
   */
  coach_ids: number[]
}
