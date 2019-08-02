import { Api } from '@/api/api'
const url = '/v1/setting/cabinet/long-term'

export class LongTermCabinetApi extends Api {
  /**
   * 新增长期储物柜
   * @param params
   */
  add(params: AddInput) {
    return this.http.post(url, { params })
  }
  /**
   * 删除长期储物柜
   * @param id
   */
  del(id: number) {
    return this.http.delete(`${url}/${id}`)
  }
  /**
   * 获取长期储物柜列表
   */
  getList(id: number) {
    return this.http.get(`${url}/${id || 0}`)
  }
  /**
   * 长期储物柜编辑回显
   * @param id
   */
  getUpdateInfo(id: number) {
    return this.http.get(`${url}-area/${id}`)
  }
  /**
   * 编辑长期储物柜
   * @param params
   */
  update(params: UpdateInput) {
    return this.http.put(`${url}/${params.id}`, { params })
  }
}

export interface AddInput {}
export interface UpdateInput extends AddInput {
  id: number
}
