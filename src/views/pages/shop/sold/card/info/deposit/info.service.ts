import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  authTabs$ = this.redirectService.getAuthTabs$(
    'shop-sold-card-info-deposit-info'
  )
  constructor(
    private cardApi: CardApi,
    private authService: AuthService,
    private redirectService: RedirectService
  ) {}
  getInfo(id: string, type: string) {
    return this.cardApi.getCardInfo(id, type).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.id = to.meta.query.id
    return this.getInfo(to.meta.query.id, 'deposit')
  }
}
