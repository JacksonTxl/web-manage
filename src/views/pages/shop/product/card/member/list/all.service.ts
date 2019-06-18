import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CardsApi, CardListInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class AllService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  constructor(private cardApi: CardsApi) {}
  getList(query:CardListInput) {
    return this.cardApi.getCardList(query, 'shop').pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
