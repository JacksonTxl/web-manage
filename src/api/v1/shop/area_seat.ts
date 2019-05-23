import { Api } from '@/api/api'
const url = '/v1/shop/area_seat'

export class AreaSeatApi extends Api {
  /**
   * 座位详情
   */
  getInfo(id: number) {
    return this.http.get(`${url}/${id}`)
  }
  /**
   * 添加座位
   */
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑座位
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 删除座位
   */
  del(id: number) {
    return this.http.delete(`${url}/${id}`)
  }
}

export interface AddInput {
  /**
   * 座位模板名称
   */
  seat_name: string
  /**
   * 座位数量
   */
  seat_num: number
  /**
   * 场地id
   */
  shop_area_id: number
  /**
   * 座位图
   */
  seat_img: object
}
export interface UpdateInput {
  /**
   * 场地id
   */
  id: number
  /**
   * 座位模板名称
   */
  seat_name: string
  /**
   * 座位数量
   */
  seat_num: number
  /**
   * 场地id
   */
  shop_area_id: number
  /**
   * 座位图
   */
  seat_img: object
}
