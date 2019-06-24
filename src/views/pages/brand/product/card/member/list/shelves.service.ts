import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardsApi, CardShelfListInput, BrandCardShelfDownInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { ShopApi } from '@/api/v1/shop'
import { forkJoin } from 'rxjs'

@Injectable()
export class ShelvesService implements RouteGuard {
    shopList$ = new State([])
    list$ = new State([])
    page$ = new State({})
    loading$ = new State({})
    constructor(private cardApi: CardsApi, private shopApi:ShopApi) {}
    getList(query:CardShelfListInput) {
      return this.cardApi.getCardShelfList(query, 'brand', 'member').pipe(tap((res:any) => {
        this.page$.commit(() => res.page)
        this.list$.commit(() => res.list)
      }))
    }
    getShopList() {
      return this.shopApi.getShopListForSelect().pipe(tap((res:any) => {
        this.shopList$.commit(() => res.shops)
      }))
    }
    init(query:CardShelfListInput) {
      return forkJoin(this.getList(query), this.getShopList())
    }
    @Effect()
    setCardShelfDown(params:Array<BrandCardShelfDownInput>) {
      return this.cardApi.setBrandCardsShelfDown(params)
    }
    beforeEach(to:ServiceRoute, from: ServiceRoute, next:()=>{}) {
      this.init(to.meta.query).subscribe(() => {
        next()
      })
    }
}
