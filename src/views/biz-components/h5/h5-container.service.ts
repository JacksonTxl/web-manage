import { Injectable } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'

@Injectable()
export class H5ContainerService {
  constructor(private settingMinaApi: SettingMinaApi) { }
  getInfo() { return this.settingMinaApi.getInfo() }
}
