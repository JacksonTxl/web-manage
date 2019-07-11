import { Injectable } from 'vue-service-app'
import { Store } from '@/services/store'
import { SettingMinaApi } from '@/api/v1/setting/mina'

@Injectable()
export class SettingMinaMchService extends Store<any> {
  constructor(protected settingMinaApi: SettingMinaApi) {
    super()
  }
  getInfo() {
    return this.settingMinaApi.payMch()
  }
}
