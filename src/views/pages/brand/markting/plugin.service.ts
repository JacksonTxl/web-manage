import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { MarktingApi } from '@/api/v1/markting/markting'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state/src'

@Injectable()
export class PluginService {
  info$ = new State({});
  constructor(private marktingApi: MarktingApi) { }
  getInfo() {
    return this.marktingApi.getMarktingInfo().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
