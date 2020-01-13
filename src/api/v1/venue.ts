import { Api } from '../api'
export class VenueApi extends Api {
  getVenueList(query?: VenueListQuery) {
    return this.http.get(`/v1/venues/list`, { query })
  }
  getSiteList(query: SiteQuery) {
    return this.http.get(`/v1/venues/site`, { query })
  }
  addVenue(params: VenueForm) {
    return this.http.post(`/v1/venues`, { params })
  }
  getVenue(query: VenueQuery) {
    return this.http.get(`/v1/venues/basic`, { query })
  }
  editVenue(params: VenueForm) {
    return this.http.put(`/v1/venues/${params.id}`, { params })
  }
  delVenue(query: VenueQuery) {
    return this.http.put(`/v1/venues/delete/${query.id}`)
  }
  switchVenue(params: SwitchParams) {
    return this.http.put(`/v1/venues/switch`, { params })
  }
  delSites(params: SitesParams) {
    return this.http.post(`/v1/venues/site/batch/delete`, { params })
  }
  addSites(params: SitesAddParams) {
    return this.http.post(`/v1/venues/site/batch`, { params })
  }
  editSite(params: SiteEditParams) {
    return this.http.post(`/v1/venues/site/edit`, { params })
  }
  switchSite(params: SiteSwitchParams) {
    return this.http.post(`/v1/venues/site/switch`, {
      params
    })
  }
  getSettings(query: SettingsQuery) {
    return this.http.get(`/v1/venues/site/settings`, { query })
  }
  orderSettings(params: OrderParams) {
    return this.http.post(`/v1/venues/site/order/settings`, { params })
  }
  delSetting(query: SettingDelQuery) {
    return this.http.get(`/v1/venues/site/settings/delete`, { query })
  }
  addSetting(params: SettingParams) {
    return this.http.post(`/v1/venues/site/batch/settings`, { params })
  }
  editSetting(params: SettingParams) {
    return this.http.post(`/v1/venues/site/settings/edit`, { params })
  }
  getSetting(query: SettingDelQuery) {
    return this.http.get(`/v1/venues/site/settings/view`, { query })
  }
  getRecord(query: RecordQuery) {
    return this.http.get(`/v1/venues/reserve/list`, { query })
  }
  getBookingList(query: BookingQuery) {
    return this.http.get(`/v1/schedule/venues/shop/reserve/list`, {
      query
    })
  }
  calcPrice(params: PriceParams) {
    return this.http.post(`/v1/schedule/venues/shop/reserve/price`, {
      params
    })
  }
  createOrder(params: CreateOrderParams) {
    return this.http.post(`/v1/schedule/venues/shop/reserve`, {
      params
    })
  }
  cancelReserve(params: CancelReserveParams) {
    return this.http.put(`/v1/venues/reserve/cancel`, { params })
  }
}

export interface RecordQuery {
  page?: number
  size?: number
  keywords?: number
}
export interface SiteQuery {
  /**
   * 页码
   */
  page?: number
  /**
   * 每页数量
   */
  size?: number
  /**
   * 场馆id
   */
  venues_id?: string
}

export interface VenueForm {
  id?: number
  venues_name: string
  open_time_start: string
  open_time_end: string
  per_time: number
  min_reserve_num?: number
  max_reserve_num?: number
  price: number
}

export interface VenueQuery {
  id: number
}
export interface SwitchParams {
  status: number
  id: number
}

export interface SitesParams {
  venues_id: number
  site_ids: Array<number>
}

export interface SitesAddParams {
  venues_id: number
  sites: Array<string>
}

export interface SiteEditParams {
  site_id: number
  site_name: string
}

export interface SiteSwitchParams {
  site_status: number
  site_id: number
}

export interface SettingsQuery {
  site_id: number
}

export interface OrderParams {
  site_id: number
  settings_id: number
}

export interface SettingDelQuery {
  settings_id: number
}

export interface SettingParams {
  venues_id?: number
  site_ids?: Array<number>
  site_id?: number
  settings_id?: number
  time_limit_type: number
  time_limit_start: string
  time_limit_end: string
  cyclic_type: number
  week_day?: Array<number>
  open_time_start: string
  open_time_end: string
  can_reserve: number
  price: number
  weight: number
}

export interface BookingQuery {
  venues_id: number
  page: number
  size: number
  reserve_day: string
}

export interface PriceParams {
  venues_id: number
  date: string
  venues_site_time: Array<any>
  reduce_price?: number
}

export interface CreateOrderParams {
  description?: string
  venues_id: number
  venues_name: string
  member_id: number
  reduce_price?: number
  order_amount: number
  reserve_day: string
  venues_data: Array<any>
}

export interface CancelReserveParams {
  order_id?: number
  sub_order_id?: number
}

export interface VenueListQuery {
  status: number
}
