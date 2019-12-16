import { Api } from '@/api/api'
export interface StoreList {
  category_id: number
  product_name: string
  shelves_status: number
}
export class StoreApi extends Api {
  /**
   * 数据概况
   */
  dataProfile() {
    return this.http.get('/v1/store/data_profile')
  }
  /**
   * 商品列表
   */
  getList(query: StoreList) {
    return this.http.get(`/v1/store/product/1`, { query })
  }
}
