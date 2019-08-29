import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CardsApi } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class InfoService implements RouteGuard {
  cardInfo$ = new State({})
  constructor(private cardsApi: CardsApi) {}
  getCardInfo(id: string) {
    return this.cardsApi.getCardInfo(id, 'shop').pipe(
      tap((res: any) => {
        this.cardInfo$.commit(() => res.info)
      })
    )
  }
  init(id: string) {
    return forkJoin([this.getCardInfo(id)])
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
