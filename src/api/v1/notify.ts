import { Api } from '../api'
export class NotifyApi extends Api {
  getNoticeList(query: GetNoticeListQuery) {
    return this.http.get(`/v1/brand/notice`, { query })
  }
  getInformList(query: GetInformListQuery) {
    return this.http.get(`/v1/brand/announcement`, { query })
  }
}
export interface GetNoticeListQuery {
  notify_type?: number
  sub_notify_type?: number
  shop_id?: number
  page?: number
  size?: number
}
export interface GetInformListQuery {
  notify_type?: number
}
