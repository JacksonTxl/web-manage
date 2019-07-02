import { Injectable } from 'vue-service-app'
import { SettingMinaApi, PayConfigForm } from '@/api/v1/setting/mina'
import { State } from 'rx-state'

@Injectable()
export class PayConfigService {
  info$ = new State({});
  url$ = new State({});
  constructor(private settingMinaApi: SettingMinaApi) { }
  saveMch(params: PayConfigForm) {
    return this.settingMinaApi.saveMch(params)
  }
}
