import { Injectable } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'

@Injectable()
export class SettingMinaMchService {
  constructor(protected settingMinaApi: SettingMinaApi) {}
  getInfo() {
    return this.settingMinaApi.payMch()
  }
}
