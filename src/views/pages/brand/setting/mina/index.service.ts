import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class IndexService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private settingMinaApi: SettingMinaApi) { }
  @Effect()
  getInfo() {
    return this.settingMinaApi.getInfo().pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  @Effect()
  subAudit() {
    return this.settingMinaApi.subAudit()
  }
}
