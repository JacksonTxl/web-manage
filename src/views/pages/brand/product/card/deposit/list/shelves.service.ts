import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardsApi, CardShelfListInput, BrandCardShelfDownInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
import { ShopApi } from '@/api/v1/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShelvesService implements RouteGuard {
    shopList$ = new State([])
    list$ = new State([])
    page$ = new State({})
    loading$ = new State({})
    auth$ = new State({
      batchDown: this.authService.can('brand_shop:product:deposit_card|batch_down')
    })
    constructor(private cardApi: CardsApi, private shopApi: ShopApi, private authService: AuthService) {}
    getList(query:CardShelfListInput) {
      return this.cardApi.getCardShelfList(query, 'brand', 'deposit').pipe(tap((res:any) => {
        res = this.authService.filter(res)
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
    setCardShelfDown(params:BrandCardShelfDownInput) {
      return this.cardApi.setBrandCardsShelfDown(params)
    }
    beforeEach(to:ServiceRoute, from: ServiceRoute, next:()=>{}) {
      this.init(to.meta.query).subscribe(() => {
        next()
      })
    }
}
