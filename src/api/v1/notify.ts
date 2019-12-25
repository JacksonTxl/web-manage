import { Api } from '../api'
export class NotifyApi extends Api {
  getNoticeList(query: GetNoticeListQuery) {
    return this.http.get(`/v1/notice/pc`, { query })
  }
  getInformList(query: GetInformListQuery) {
    return this.http.get(`/v1/announcement/pc`, { query })
  }
  getAnnouncementInfo(query: any) {
    return this.http.get(`v1/brand/announcement/${query.id}`, { query })
  }
  getNoticeEnum(query: GetInformListQuery) {
    return this.http.get(`/v1/notice/enum`, { query })
  }
  getAnnouncementEnum(query: GetInformListQuery) {
    return this.http.get(`/v1/announcement/enum`, { query })
  }
  getNoticeSettingInfo(query: GetInformListQuery) {
    return this.http.get(`/v1/notice/pc/setting`, { query })
  }
  updateNoticeSetting(params: any) {
    return this.http.get(`/v1/notice/pc/setting`, { params })
  }
  getNewAnnouncement(query: any) {
    return this.http.get(`/v1/brand/new/announcement`, { query })
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
