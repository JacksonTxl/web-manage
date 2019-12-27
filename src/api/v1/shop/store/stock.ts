import { Api } from '@/api/api'
export interface ListParams {
  product_name: string
  current_page: number
  size: number
}
export interface DetailParams {
  product_id: number
  stock_flow: number
  start_time: string
  end_time: string
  current_page: number
  size: number
}
export interface StockInfo {
  product_id: number
  sku_id: number
  amount: number
  remark: string
}
export interface WarehouseParams {
  stock: StockInfo[]
  brand_id: number
}

export class StockApi extends Api {
  /**
   * 库存列表
   */
  stockList(query: ListParams) {
    return this.http.get('/v1/store/stock/list', {
      query
    })
  }
  /**
   * 出入库明细列表
   */
  stockDetailList(query: DetailParams) {
    return this.http.get('/v1/store/stock/turnover', {
      query
    })
  }
  /**
   * 商品入库
   */
  stockWarehouse(params: WarehouseParams) {
    return this.http.post('/v1/store/stock/warehouse', {
      params
    })
  }
  /**
   * 商品出库
   */
  stockOutbound(params: WarehouseParams) {
    return this.http.post('/v1/store/stock/outbound', {
      params
    })
  }
  /**
   * 商品列表（出入库明细下拉框）
   */
  productList() {
    return this.http.get('/v1/store/product/search/list')
  }
}
