import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { SettingMinaApi } from '@/api/v1/setting/mina'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class ActivityService implements RouteGuard {
  actList$ = new State({});
  info$ = new State({})
  constructor(private settingMinaApi: SettingMinaApi) { }
  getInfo() {
    return this.settingMinaApi.getInfo().pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  getActList() {
    return this.settingMinaApi.getActivityList().pipe(
      tap(res => {
        this.actList$.commit(() => res)
      })
    )
  }
  init() {
    return forkJoin(
      this.getInfo(),
      this.getActList()
    )
  }
  beforeRouteEnter() {
    return this.init()
  }
}
