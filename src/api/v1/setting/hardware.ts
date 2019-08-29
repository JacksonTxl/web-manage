import { Api } from '@/api/api'

export class HareWareApi extends Api {
  //全局详情
  getGlobalInfo() {
    return this.http.get('/v1/setting/hardware/global')
  }
  //
  getStaffList(query: any) {
    return this.http.get(
      '/v1/setting/hardware/area/staff/options?keyword=' + query
    )
  }
  // 区域列表
  getAreaList(query: GetAreaListQuery) {
    return this.http.get('/v1/setting/hardware/area', { query })
  }
  // 单区域列表
  getSingleAreaList() {
    return this.http.get('/v1/setting/hardware/area/options')
  }
  // 黑名单列表
  getBlackList(query: GetBlackListQuery) {
    return this.http.get('/v1/setting/hardware/global/black', {
      query
    })
  }
  // 模糊搜索
  onSearchKeyWords(query: GetBlackListSelectQuery) {
    return this.http.get('/v1/setting/hardware/global/options?keyword=' + query)
  }
  // 黑名单设置
  postBlackListSetting(params: PostBlackListParams) {
    return this.http.put('/v1/setting/hardware/global/black', {
      params
    })
  }
  // 白名单列表
  getWhiteList(query: GetWhiteListQuery) {
    return this.http.get(
      '/v1/setting/hardware/area/staff/options?keyword=' + query
    )
  }
  //区域设置
  putAreaSettingParams(params: PutAreaSettingParams) {
    return this.http.put('/v1/setting/hardware/area', { params })
  }
  // 全局设置
  postGlobalSetting(params: PostGlobalSettingParams) {
    return this.http.put('/v1/setting/hardware/global', {
      params
    })
  }
  // 区域设置详情
  getAreaInfo(query: GetAreaInfoQuery) {
    return this.http.get('/v1/setting/hardware/area/info/' + query)
  }
}

export interface GetAreaListQuery {
  page?: number
  size?: number
}
export interface GetBlackListQuery {
  page?: number
  size?: number
}
export interface GetWhiteListQuery {
  page?: number
  size?: number
}
export interface GetBlackListSelectQuery {
  mobile: string
}
export interface PostBlackListParams {
  black_list: object
}
export interface PutAreaSettingParams {
  black_list: object
}
export interface PostGlobalSettingParams {
  charge_type: number
  charge_value: number
}
export interface GetAreaInfoQuery {
  area_id: number
}
