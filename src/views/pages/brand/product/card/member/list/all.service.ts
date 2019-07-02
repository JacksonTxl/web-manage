import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardListInput } from '@/api/v1/cards'
import { AuthService } from '@/services/auth.service'
import { tap } from 'rxjs/operators'

@Injectable()
export class AllService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({
    add: this.authService.can('brand_shop:product:member_card|add')
  })
  constructor(private cardsApi: CardsApi, private authService: AuthService) {}
  @Effect()
  getList(query:CardListInput) {
    return this.cardsApi.getCardList(query, 'brand', 'member').pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  @Effect()
  deleteCard(id:string) {
    return this.cardsApi.setCardsDelete(id, 'brand', 'member')
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
