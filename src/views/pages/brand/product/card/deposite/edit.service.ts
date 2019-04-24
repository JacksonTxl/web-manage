import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CardsApi, CardsInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class EditService implements RouteGuard {
  cardInfo$ = new State({})
  loading$ = new State({})
  constructor(private cardsApi: CardsApi) { }
  getCardInfo(id: string) {
    return this.cardsApi.getCardDepositInfoBackBrand(id).pipe(tap((res: any) => {
      this.cardInfo$.commit(() => res.info)
    }))
  }
  @Effect()
  editCard(data: CardsInput) {
    return this.cardsApi.editCardDepositBrand(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: () => {}) {
    this.getCardInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
