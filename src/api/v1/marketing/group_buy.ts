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

export class GroupBuyApi extends Api {
  getStoredData(id: any) {
    return this.http.get('/v1/plugin/group_buy/' + id)
  }
}
