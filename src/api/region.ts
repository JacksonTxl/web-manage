import { Api } from './api'

export class RegionApi extends Api {
  /**
   * 获取省市区树
   */
  getRegions() {
    return this.http.get('/regions', { mock: {} })
  }
  /**
   * 获取省
   */
  getRegionProvinces() {
    return this.http.get('/region/provinces')
  }
  /**
   * 获取市
   */
  getRegionCitys(params: GetRegionInput) {
    return this.http.get('/region/citys', { query: { province_id: params } })
  }
  /**
   * 获取市
   */
  getRegionDistricts(params: GetRegionInput) {
    return this.http.get('/region/districts', { query: { city_id: params } })
  }
}

export interface GetRegionInput {
  /**
   * 地区id
   */
  id: number
}

export interface LoginPhoneInput {
  /**
   * 国家编号id
   */
  country_code: number | string
  /**
   * 登录的手机号码
   */
  phone: string
}
