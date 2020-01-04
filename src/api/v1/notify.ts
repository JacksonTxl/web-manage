import { Api } from '../api'
export class NotifyApi extends Api {
  getNoticeList(query: GetNoticeListQuery) {
    return this.http.get(`/v1/announcement/pc`, { query })
  }
  getInformList(query: GetInformListQuery) {
    return this.http.get(`/v1/notice/pc`, { query })
  }
  // 获取公告详情
  getAnnouncementInfo(query: any) {
    return this.http.get(`/v1/announcement/detail`, { query })
  }
  getNoticeEnum() {
    return this.http.get(`/v1/notice/enum`)
  }
  getAnnouncementEnum() {
    return this.http.get(`/v1/announcement/enum`)
  }
  getNoticeSettingInfo() {
    return this.http.get(`/v1/notice/pc/setting`)
  }
  updateNoticeSetting(params: any) {
    return this.http.put(`/v1/notice/pc/setting`, { params })
  }
  getNewAnnouncementActivity(query?: any) {
    return this.http.get(`/v1/announcement/activity/new`, { query })
  }
  getNewAnnouncementSystem(query?: any) {
    return this.http.get(`/v1/announcement/system/new`, { query })
  }
  getNoticePcUnread() {
    return this.http.get(`/v1/notice/pc/unread`)
  }
  setRead() {
    return this.http.put(`/v1/notice/announcement/read`)
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
