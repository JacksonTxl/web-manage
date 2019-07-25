import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { PayApi, postSmsPayQuery } from '@/api/v1/setting/sms/pay'

interface SetState {}
@Injectable()
export class SmsPayService extends Store<SetState> {
  constructor(protected PayApi: PayApi) {
    super()
  }
  @Effect()
  getSmsPayDetail() {
    return this.PayApi.getSmsPayDetail()
  }
  postSmsPay(params: postSmsPayQuery) {
    return this.PayApi.postSmsPay(params)
  }
}
