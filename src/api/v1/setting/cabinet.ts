import { Api } from '@/api/api'
const url = '/v1/setting/cabinet'
export class CabinetApi extends Api {
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
  /**
   * 单个/批量删除储物柜
   * @param params
   */
  del(params: DelInput) {
    console.log('del', params)
    return this.http.put(url, { params })
  }
  getUpdateInfo(id: number) {
    return this.http.get(`${url}/${id}`)
  }
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
  getList() {
    return this.http.get(url)
  }
}

export interface DelInput {
  ids: number[]
}
export interface AddInput {
  /**
   * 区域id
   */
  cabinet_area_id: number
  /**
   * 储物柜类型1：长期储物柜 2：临时储物柜
   */
  cabinet_type: number
  /**
   * 首字母
   */
  first_letter?: string
  /**
   * 起始编号
   */
  start_num: number
  /**
   * 排序方式
   */
  sort_type: number
  /**
   * 柜子数量
   */
  num: number
  /**
   * 价格数量 当柜子类型为长期储物柜时必填
   */
  price_num?: number
  /**
   * 价格单位 当柜子类型为长期储物柜时必填
   */
  price_unit?: number
  /**
   * 转让手续费数量 当柜子类型为长期储物柜时必填
   */
  transfer_num?: number
  /**
   * 转让手续费 当柜子类型为长期储物柜时必填
   */
  transfer_unit: number
}
export interface UpdateInput extends AddInput {
  /**
   * 储物柜id
   */
  id: number
}
