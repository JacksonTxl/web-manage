import { Api } from '@/api/api'

export class PayApi extends Api {
  getSmsPayInfo() {
    return this.http.get('/v1/setting/sms/pay')
  }
  // 短信购买详情
  getSmsPayDetail() {
    return this.http.get('/v1/setting/sms/pay/detail')
  }
  postSmsPay(params: PostSmsPayQuery) {
    return this.http.post('/v1/setting/sms/pay', { params })
  }
}

export interface PostSmsPayQuery {
  sms_num: string
  pay_price: string
  pay_channel: number
}
