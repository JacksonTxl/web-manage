import { Api } from '@/api/api'
export interface AddSku {
  spec_name: string
  spec_item_name: string
  market_price: number
  selling_price: number
  stock_amount: number
}
export interface AddParams {
  product_name: string
  category_id: number
  product_images: string[]
  delivery_type: number
  sale_type: number
  product_intro: string
  product_sku: AddSku[]
  shelves_status: number
}
export interface EditParams {
  id: number
  product_name: string
  category_id: number
  product_images_add: string[]
  product_images_del: string[]
  delivery_type: number
  sale_type: number
  product_intro: string
  product_sku: AddSku[]
  shelves_status: number
}
export interface CategoryQuery {
  current_page: number
  size: number
}
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
   * 新建商品
   */
  addGoods(params: AddParams) {
    return this.http.post('/v1/store/product', {
      params
    })
  }
  /**
   * 编辑商品
   */
  editGoods(id: number, params: EditParams) {
    return this.http.put(`/v1/store/product/${id}`, {
      params
    })
  }
  /**
   * 商品详情
   */
  goodsDetail(id: number) {
    return this.http.get(`/v1/store/product/${id}`)
  }
  /**
   * 新建分类
   */
  addCategory(params: { category_name: string }) {
    return this.http.post('/v1/store/product/category', {
      params
    })
  }
  /**
   * 编辑分类
   */
  editCategory(id: number, params: { category_name: string }) {
    return this.http.put(`/v1/store/product/category/${id}`, { params })
  }
  /*
   * 分类列表
   */
  categoryList(query: CategoryQuery) {
    return this.http.get(`/v1/store/product/category`, {
      query
    })
  }
  /**
   * 分类列表
   */
  delCategory(id: number) {
    return this.http.get(`/v1/store/product/category/${id}`)
  }
  /**
   * 商品列表
   */
  getList(query: StoreList) {
    return this.http.get(`/v1/store/product/1`, { query })
  }
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
   * 类目支付排行
   */
  storeSaleList(params: DtoreBoard) {
    return this.http.get('/v1/store/sale_list', {
      params
    })
  }
  /**
   * 商品销售榜
   */
  storeCategoryRank(params: DtoreBoard) {
    return this.http.get('/v1/store/category_rank', {
      params
    })
  }
}
