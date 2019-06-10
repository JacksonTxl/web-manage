import { Api } from '../api'

export class ShopApi extends Api {
  add(params: ShopInput) {
    return this.http.post('/v1/shop', { params })
  }
  // 品牌维度下修改门店
  brandUpdate(id: string, params: ShopInput) {
    return this.http.put(`/v1/brand/shop/${id}`, { params })
  }
  update(id: string, params: ShopInput) {
    return this.http.put(`/v1/brand/shop/${id}`, { params })
  }
  getInfo(id: string) {
    return this.http.get(`/v1/shop/${id}`)
  }
  getShopSettingStopInfo(id: string) {
    return this.http.get(`/v1/shop/${id}`)
  }
  updateStatus(id: number, params: ShopStatusInput) {
    return this.http.put(`/v1/shop/${id}/status`, { params })
  }
  getServiceList() {
    return this.http.get(`/v1/shop/service`)
  }
  getShopList(query: GetShopListInput = {}) {
    query = Object.assign(
      {
        size: 99
      },
      query
    )
    return this.http.get('/v1/shop', { query })
  }
  /**
   * 门店列表 省市区门店树形
   */
  getShopListTree() {
    return this.http.get('/v1/shop/list')
  }
  getShopBasic(params: GetShopBasicInput) {
    return this.http.post('/v1/shop/basic', {
      params
    })
  }
}

export interface ShopImages {
  /**
   * 图片id
   */
  image_id?: number
  /**
   * 是否是店招 0不是，1是
   */
  is_cover: number
  /**
   * 图片key
   */
  image_key: string
  /**
   * 图片url
   */
  image_url?: string
}

export interface ShopStatusInput {
  /**
   * 门店状态 1：预售；2：试运营；3：正常运行； 4：已关店
   */
  shop_status: number
}

export interface WeekDay {
  /**
   * 星期
   */
  week_day: number
  /**
   * 开始时间
   */
  start_time: string
  /**
   *  结束时间
   */
  end_time: string
}
export interface GetShopListInput {
  page?: number
  size?: number
}
export interface ShopInput {
  /**
   * 商户的账户名
   */
  shop_name: string
  /**
   * 门店省份id
   */
  province_id: number
  /**
   * 门店城市id
   */
  city_id: number
  /**
   * 门店区域id
   */
  district_id: number
  /**
   * 门店详细地址
   */
  address: string
  /**
   * 门店电话 ，请按用户输入顺序传，后端默认保存第一个号码为首选号码
   */
  shop_phones: any[]
  /**
   * 运营状态 ；1：试运营；2：正常运营；3：预售 4：已关店
   */
  shop_status: number
  /**
   * 纬度
   */
  lat: string
  /**
   * 经度
   */
  lng: string
  /**
   * 门店服务的ids
   */
  service_ids: any[]
  /**
   * 门店营业时间
   */
  business_time: WeekDay[]
  /**
   * 门店邮箱
   */
  email: string
  /**
   * 门店封面图片
   */
  shop_cover_image?: string
  /**
   * 门店图片
   */
  shop_images?: ShopImages[]
}
export interface GetShopBasicInput {
  shop_ids: number[]
}
