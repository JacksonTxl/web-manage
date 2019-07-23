import { Api } from '@/api/api'
export class MsgApi extends Api {
  //   短信首页
  getMsgIndexList(query: GetMsgIndexListQuery) {
    return this.http.get('v1/setting/sms/index', {
      query: {
        ...query
      }
    })
  }
  //   短信充值首页
  getMsgDepositIndex(query: {}) {
    return this.http.get('v1/setting/sms', {
      query: {
        ...query
      }
    })
  }
  // 通知模版列表
  getNoticeList(query: {}) {
    return this.http.get('v1/setting/notice', {
      query: {
        ...query
      }
    })
  }
  // 通知模版编辑
  putNotice(params: PutNoticeParams) {
    return this.http.put('v1/setting/notice', { params })
  }
}

export interface GetMsgIndexListQuery {
  page?: number
  size?: number
  search: string
  send_status: number
  start_time: string
  end_time: string
}
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
