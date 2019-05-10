import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  WechatPaymentSettingApi,
  UpdateInput
} from '@/api/v1/setting/payments/wechat'

@Injectable()
export class WechatPaymentSettingService extends Store<any> {
  constructor(protected wechatPaymentSettingApi: WechatPaymentSettingApi) {
    super()
  }
  getInfo() {
    return this.wechatPaymentSettingApi.getInfo()
  }
  @Effect()
  update(params: UpdateInput) {
    return this.wechatPaymentSettingApi.update(params)
  }
}
