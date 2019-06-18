import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CardsApi, CardShelfListInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class ShelvesService implements RouteGuard {
    list$ = new State([])
    page$ = new State({})
    loading$ = new State({})
    constructor(private cardApi: CardsApi) {}
    getList(query:CardShelfListInput) {
      return this.cardApi.getCardShelfList(query, 'brand').pipe(tap((res:any) => {
        this.page$.commit(() => res.page)
        this.list$.commit(() => res.list)
      }))
    }
    beforeEach(to:ServiceRoute, from: ServiceRoute, next:()=>{}) {
      this.getList(to.meta.query).subscribe(() => {
        next()
      })
    }
}
