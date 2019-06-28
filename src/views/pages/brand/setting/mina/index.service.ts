import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state/src'

@Injectable()
export class IndexService {
  info$ = new State({});
  url$ = new State({});
  constructor(private settingMinaApi: SettingMinaApi) { }
  getInfo() {
    return this.settingMinaApi.getInfo().pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  getAuthUrl() {
    return this.settingMinaApi.getAuthUrl().pipe(
      tap(res => {
        this.url$.commit(() => res.info)
      })
    )
  }
}
