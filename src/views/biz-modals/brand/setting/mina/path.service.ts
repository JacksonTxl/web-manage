import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SettingMinaApi } from '@/api/v1/setting/mina'

@Injectable()
export class PathService {
  loading$ = new State({})
  pathList$ = new State([])
  constructor(private settingMinaApi: SettingMinaApi) {}
  @Effect()
  getPathList() {
    return this.settingMinaApi.getPathList().pipe(
      tap(res => {
        this.pathList$.commit(() => res.list)
      })
    )
  }
}
