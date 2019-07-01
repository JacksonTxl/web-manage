import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CardsApi, CardListInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class AllService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({
    add: this.authService.can('brand_shop:product:deposit_card|add')
  })
  constructor(private cardApi: CardsApi, private authService: AuthService) {}
  getList(query:CardListInput) {
    return this.cardApi.getCardList(query, 'shop', 'deposit').pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  setShelf(id:string) {
    return this.cardApi.setCardsDepositShelf(id, 'shop')
  }
  deleteCard(id:string) {
    return this.cardApi.setCardsDelete(id, 'shop', 'deposit')
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
