import { Api } from '../../api'

export interface AddParams {
  product_type: number
  activity_name: string
  product_id: number
  sku: Array<any>
  start_time: string
  end_time: string
  group_sum: number
  valid_time: string
  is_limit_stock: number
  stock_total: number
  shop_ids: Array<any>
  published_type: number
  published_time: string
}
export interface EditParams {
  id: number
  product_type: number
  activity_name: string
  product_id: number
  sku: Array<any>
  start_time: string
  end_time: string
  group_sum: number
  valid_time: string
  is_limit_stock: number
  stock_total: number
  shop_ids: Array<any>
  published_type: number
  published_time: string
}

export class GroupBuyApi extends Api {
  /**
   * 新增拼团活动
   */
  addGroup(params: AddParams) {
    return this.http.post('/v1/plugin/group_buy', {
      params
    })
  }
  /**
   * 编辑拼团活动
   */
  editGroup(params: EditParams) {
    return this.http.put(`/v1/plugin/group_buy/${params.id}`, { params })
  }
  getStoredData(id: any) {
    return this.http.get('/v1/plugin/group_buy/' + id)
  }
  /**
   * 获取会籍卡列表
   */
  getMemberList() {
    return this.http.get('/v1/cards/member/brand_list')
  }
}
