import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  constructor(private cardApi: CardApi, private authService: AuthService) {}
  @Effect()
  getInfo(id: string) {
    return this.cardApi.getCardInfo(id, 'member').pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  @Effect()
  unFreeze(id: string) {
    return this.cardApi.unFreezeCard(id, 'member')
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.id = to.meta.query.id
    return this.getInfo(to.meta.query.id)
  }
}
