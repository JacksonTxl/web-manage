import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardShelfListInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShelvesService implements RouteGuard {
    list$ = new State([])
    page$ = new State({})
    loading$ = new State({})
    auth$ = new State({})
    constructor(private cardApi: CardsApi, private authService: AuthService) {}
    getList(query:CardShelfListInput) {
      return this.cardApi.getCardShelfList(query, 'shop', 'member').pipe(tap((res:any) => {
        res = this.authService.filter(res)
        this.page$.commit(() => res.page)
        this.list$.commit(() => res.list)
      }))
    }
    @Effect()
    setCardShelfDown(id:string) {
      return this.cardApi.setCardsShelfDown(id, 'shop', 'member')
    }
    beforeEach(to:ServiceRoute, from: ServiceRoute, next:()=>{}) {
      this.getList(to.meta.query).subscribe(() => {
        next()
      })
    }
}
