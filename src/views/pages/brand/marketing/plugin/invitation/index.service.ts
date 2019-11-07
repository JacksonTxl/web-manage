import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { MarketingApi } from '@/api/v1/marketing/marketing'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements RouteGuard {
  isOpen$ = new State(false)
  authTabs$ = this.authService.getAuthTabs$(
    'brand-marketing-plugin-invitation-index'
  )
  constructor(
    private marketingApi: MarketingApi,
    private authService: AuthService
  ) {}
  getOpenStatus() {
    return this.marketingApi.getInviteOpenStatus().pipe(
      tap((res: any) => {
        this.isOpen$.commit(() => res.info.has_opened)
      })
    )
  }
  beforeRouteEnter() {
    return this.getOpenStatus()
  }
}
