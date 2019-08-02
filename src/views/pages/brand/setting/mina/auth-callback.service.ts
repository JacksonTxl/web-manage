import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { SettingMinaApi, CallbackParams } from '@/api/v1/setting/mina'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class AuthCallbackService {
  constructor(private settingMinaApi: SettingMinaApi) {}
  callback(params: CallbackParams) {
    return this.settingMinaApi.callback(params)
  }
}
