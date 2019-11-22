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
export interface GroupData {
  id: string
  group_status: number
  search_where: string
}
export interface GroupDataId {
  id: number
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
   * 获取课程包列表
   */
  getCourseList(params: { shop_id: number }) {
    return this.http.get('/v1/course/package/group/list', { query: params })
  }
  /**
   * 获取私教课列表
   */
  getPersonalList() {
    return this.http.get('/v1/course/personal/brand_list')
  }
  /**
   * 获取教练列表
   */
  getCoachList(params: { id: number }) {
    return this.http.get(`/v1/course/personal/coach_level/${params.id}`)
  }
  /**
   * 拼团结束
   */
  stopGroupList(params: { id: number }) {
    return this.http.get('/v1/plugin/group_buy/stop/', { params })
  }
  /**
   * 拼团发布
   */
  releaseGroupList(params: { id: number }) {
    return this.http.get('/v1/plugin/group_buy/release/', { params })
  }
  /**
   * 获取推广海报
   */
  getPosterInfo(params: { id: number }) {
    return this.http.get('/v1/plugin/group_buy/spread/', { params })
  }
  /**
   * 获取数据top
   */
  getGroupBuyDataTop(query: GroupDataId) {
    console.log(query)
    return this.http.get('/v1/plugin/group_buy/data_top/', { query })
  }
}
