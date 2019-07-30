import { Api } from '@/api/api'

export class NoticeApi extends Api {
  // 通知模版列表
  getNoticeList() {
    return this.http.get('/v1/setting/sms/notice')
  }
  // 通知模版编辑
  putNotice(params: PutNoticeParams) {
    return this.http.put(`/v1/setting/sms/notice/${params.id}`, { params })
  }
}

export interface UpdateInput {}

export interface PutNoticeParams {
  id: number
  notify_method: number
  notify_time: number
  receiver_type: number
  msg_preffix: string
  msg_suffix: string
  course_limit: number
  receiver_limit: number
  receivers: string
}
