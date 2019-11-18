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
export interface GroupListParams {
  activity_status: number
  activity_name: string
}
export interface GroupData {
  id: string
  group_status: number
  search_where: string
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
  /**
   * 编辑数据回显
   * */
  getStoredData(id: any) {
    return this.http.get('/v1/plugin/group_buy/' + id)
  }
  /**
   * 拼团列表
   */
  getList(query: GroupListParams) {
    return this.http.get(`/v1/plugin/group_buy`, { query })
  }
  /**
   * 数据列表
   */
  getData(query: GroupData) {
    return this.http.get(`/v1/plugin/group_buy/data/`, { query })
  }
  /**
   * 获取会籍卡列表
   */
  getMemberList() {
    return this.http.get('/v1/cards/member/brand_list')
  }
  /**
   * 获取储值卡列表
   * */
  getDepositList() {
    return this.http.get('/v1/cards/deposit/brand_list')
  }
  /**
   * 获取门店列表
   */
  getShopList() {
    return this.http.get('/v1/shop/all_list')
  }
  /**
   * 获取课程包列表
   */
  getCourseList(params: { shop_id: number }) {
    return this.http.get('/v1/course/package_list', { params })
  }
}
