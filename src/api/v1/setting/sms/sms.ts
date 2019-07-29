import { Api } from '@/api/api'

export class SmsApi extends Api {
  getSmsList(query: SmsListQuery) {
    return this.http.get('/v1/setting/sms', { query })
  }
}
export interface SmsListQuery {
  page: number
  size: number
  search: string
  send_status: number
  start_time: string
  end_time: string
}
