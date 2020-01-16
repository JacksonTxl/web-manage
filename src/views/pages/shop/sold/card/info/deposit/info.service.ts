import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  authTabs$ = this.authService.getAuthTabs$(
    'shop-sold-card-info-deposit-info',
    {
      withQuery: ['id', 'card_type']
    }
  )
  constructor(private cardApi: CardApi, private authService: AuthService) {}
  getInfo(id: string, type: string) {
    return this.cardApi.getCardInfo(id, type).pipe(
      tap((res: any) => {
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
