import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class PluginService {
  info$ = new State({});
  constructor(private marketingApi: MarketingApi) { }
  getInfo() {
    return this.marketingApi.getMarktingInfo().pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
