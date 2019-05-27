import { Api } from '@/api/api'
const url = '/v1/setting/cabinet/area'

export class CabinetAreaApi extends Api {
/**
 * 新增区域
 * @param params
 */
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
  /**
   * 删除区域
   * @param id
   */
  del(id: string) {
    return this.http.delete(`${url}/${id}`)
  }
  /**
   * 获取储物柜区域列表
   */
  getList() {
    return this.http.get(url)
  }
  /**
   * 储物柜区域编辑回显
   * @param id
   */
  getUpdateInfo(id: string) {
    return this.http.get(`${url}/${id}`)
  }
  /**
   * 储物柜区域编辑
   * @param params
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  /**
   * 储物柜区域拖拽排序
   * @param params
   */
  sortByDrag(params: SortByDragInput) {
    return this.http.put(url, { params })
  }
}

export interface AddInput {
  /**
   * 储物柜区域名称
   */
  area_name: string
}
export interface UpdateInput extends AddInput {}
export interface SortByDragInput {
  /**
   * 完整的储物柜区域列表
   */
  list: object[]
}
