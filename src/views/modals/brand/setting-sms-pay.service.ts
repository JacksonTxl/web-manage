import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { PayApi, PostSmsPayParams } from '@/api/v1/setting/sms/pay'
interface SetState {}
@Injectable()
export class SettingSmsPayService extends Store<SetState> {
  constructor(protected PayApi: PayApi) {
    super()
  }
  @Effect()
  getSmsPayDetail() {
    return this.PayApi.getSmsPayDetail()
  }
  postSmsPay(params: PostSmsPayParams) {
    return this.PayApi.postSmsPay(params)
  }
}
