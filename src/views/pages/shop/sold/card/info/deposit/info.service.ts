import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  cardId = ''
  constructor(private cardApi: CardApi, private authService: AuthService) {}
  getInfo(id: string, type: string) {
    return this.cardApi.getCardInfo(id, type).pipe(
      tap((res: any) => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.cardId = to.meta.query.id
    this.getInfo(to.meta.query.id, 'deposit').subscribe(() => {
      next()
    })
  }
}
