import { Api } from '@/api/api'
const url = '/v1/shop/area'

export class CourtApi extends Api {
  /**
   * 获取场地列表
   */
  getList() {
    return this.http.get(url, {})
  }
  /**
   * 添加场地
   */
  add(params: SetInput) {
    return this.http.post(url, { params })
  }
  /**
   * 编辑场地
   */
  update(params: SetInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 获取场地信息
   */
  getInfo(id: number) {
    return this.http.get(`${url}/${id}`)
  }
  /**
   * 删除场地
   */
  del(id: number) {
    return this.http.delete(`${url}/${id}`)
  }
  /**
   * 场地排序
   */
  sort(params: SortInput) {
    return this.http.put('/v1/shop/area_move', { params })
  }
}
export interface SetInput {
  id: number
  /**
   * 场地名称
   */
  area_name: string
  /**
   * 容纳人数
   */
  contain_number?: number
  /**
   * 是否是vip场地
   */
  is_vip?: number
}
export interface SortListItem {
  /**
   * 区域 id
   */
  id: number
  /**
   * 排序
   */
  sorted: number
}
export interface SortInput {
  /**
   * 场地列表
   */
  list: SortListItem[]
}
