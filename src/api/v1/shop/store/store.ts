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
export interface DtoreBoard {
  date_type: number
  date: string
}
export interface MemberAnalysis {
  date_type: number
  date: string
  choose_type: number
}
export interface StoreList {
  category_id: number
  product_name: string
  shelves_status: number
}
export interface ShelvesStatus {
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
  categoryList() {
    return this.http.get(`/v1/store/product/category`)
  }
  /**
   * 删除分类
   */
  delCategory(id: number) {
    return this.http.delete(`/v1/store/product/category/${id}`)
  }
  /**
   * 商品列表
   */
  getList(query: StoreList) {
    return this.http.get(`/v1/store/product`, { query })
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
  storeBoard(query: DtoreBoard) {
    console.log(query, '整体看板')
    return this.http.get('/v1/store/board', {
      query
    })
  }
  /**
   * 类目支付排行
   */
  storeSaleList(query: DtoreBoard) {
    return this.http.get('/v1/store/sale_list', {
      query
    })
  }
  /**
   * 商品销售榜
   */
  storeCategoryRank(query: DtoreBoard) {
    return this.http.get('/v1/store/category_rank', {
      query
    })
  }
  /**
   * 【门店】用户分析
   */
  storeMemberAnalysis(query: MemberAnalysis) {
    return this.http.get('/v1/store/member_analysis', {
      query
    })
  }
  /*
   * 删除商品
   */
  delProduct(id: number) {
    return this.http.delete(`/v1/store/product/${id}`)
  }
  /**
   * 上下架商品
   */
  onShelf(id: number, params: ShelvesStatus) {
    return this.http.put(`/v1/store/product/${id}`, { params })
  }
  /**
   * 商品分类列表
   */
  getCategory() {
    return this.http.get(`/v1/store/product/category`)
  }
}
