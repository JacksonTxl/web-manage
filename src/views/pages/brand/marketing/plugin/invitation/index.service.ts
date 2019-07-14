import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class IndexService implements RouteGuard {
  isOpen$ = new State(false)
  authTabs$ = this.redirectService.getAuthTabs$('brand-marketing-plugin-invitation-index')
  constructor(private marketingApi: MarketingApi, private redirectService: RedirectService) { }
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
