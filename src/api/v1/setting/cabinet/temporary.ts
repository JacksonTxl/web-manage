import { Api } from '@/api/api'
const url = '/v1/setting/cabinet/temporary'

export class TemporaryCabinetApi extends Api {
/**
 * 新增临时储物柜
 * @param params
 */
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
  /**
   * 删除临时储物柜
   * @param id
   */
  del(id: number) {
    return this.http.delete(`${url}/${id}`)
  }
  /**
   * 获取临时储物柜列表
   */
  getList(id: number) {
    return this.http.get(`${url}/${id || 0}`)
  }
  /**
   * 临时储物柜编辑回显
   * @param id
   */
  getUpdateInfo(id: number) {
    return this.http.get(`${url}-area/${id}`)
  }
  /**
   * 编辑临时储物柜
   * @param params
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
}

export interface AddInput {

}
export interface UpdateInput extends AddInput {
  id: number
}
