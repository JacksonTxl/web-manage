import { Api } from '@/api/api'

export interface DtoreBoard {
  date_type: string
  date: string
}
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
   * 整体看板
   */
  storeBoard(params: DtoreBoard) {
    return this.http.get('/v1/store/board', {
      params
    })
  }
  /**
   * 商品列表
   */
  getList(query: StoreList) {
    return this.http.get(`/v1/store/product/1`, { query })
  }
  /**
   * 删除商品
   */
  delProduct(id: number) {
    return this.http.delete(`/v1/store/product/${id}`)
  }
  /**
   * 上下架商品
   */
  onShelf(id: number) {
    return this.http.put(`/v1/store/product/${id}`)
  }
}
