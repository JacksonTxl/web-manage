import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { combineLatest } from 'rxjs'
import { RouteService } from '@/services/route.service'

@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  authTabs$ = this.authService.getAuthTabs$('shop-sold-card-info-deposit-info')
  pageAuthTabs$ = new Computed(
    combineLatest(this.authTabs$, this.routeService.query$, (authTabs, query) =>
      authTabs.map((tab: any) => {
        tab.route.query = { id: query.id, card_type: query.card_type }
        return tab
      })
    )
  )
  constructor(
    private cardApi: CardApi,
    private authService: AuthService,
    private routeService: RouteService
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
