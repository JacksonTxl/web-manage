import { Injectable } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'
import { Effect, State } from 'rx-state/src'

@Injectable()
export class H5ContainerService {
  loading$ = new State({})
  constructor(private settingMinaApi: SettingMinaApi) {}
  @Effect()
  getInfo() {
    return this.settingMinaApi.getInfo()
  }
}
