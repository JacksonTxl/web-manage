import { Api } from '../api'

export class LabelApi extends Api {
  /**
     * 标签列表
     */
  getLabelList(query: ListParams) {
    return this.http.get(`/v1/member/label`, { query })
  }
  /**
     * 添加标签
     */
  addLabel(params: AddLabel) {
    return this.http.post(`/v1/member/label`, { params })
  }
  /**
     * 删除标签
     */
  deleteLabel(id:number) {
    return this.http.delete(`/v1/member/label/${id}`)
  }
  /**
     * 修改标签
     */
  editLabel(id: number, params: EditParams) {
    return this.http.put(`/v1/member/label/${id}`, { params })
  }
}
export interface AddLabel{
    /**
     * 标签名
     */
    tag_name: string;
}

export interface EditParams{
    /**
     * id
     */
    id: number;
    /**
     * 标签名字
     */
    tag_name: string;
}

export interface ListParams{
  /**
   * size
   */
  size: number;
  /**
   * page
   */
  page: number;
  /**
   * 标签名
   */
  tag_name?: string;
}
