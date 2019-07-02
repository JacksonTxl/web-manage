import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'

@Injectable()
export class IndexService implements RouteGuard {
  isOpen$ = new State(false)
  constructor(private marketingApi: MarketingApi) { }
  getOpenStatus() {
    return this.marketingApi.getInviteOpenStatus().pipe(tap((res: any) => {
      this.isOpen$.commit(() => res.info.has_opened)
    }))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.getOpenStatus().subscribe(() => {
      next()
    })
  }
}
