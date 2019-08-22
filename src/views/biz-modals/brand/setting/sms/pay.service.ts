import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { PayApi, PostSmsPayParams } from '@/api/v1/setting/sms/pay'
@Injectable()
export class SettingSmsPayService {
  loading$ = new State({})
  constructor(protected PayApi: PayApi) {}
  @Effect()
  getSmsPayDetail() {
    return this.PayApi.getSmsPayDetail()
  }
  postSmsPay(params: PostSmsPayParams) {
    return this.PayApi.postSmsPay(params)
  }
}
