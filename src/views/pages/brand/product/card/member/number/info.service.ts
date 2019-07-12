import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CardsApi } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'
@Injectable()
export class InfoService implements RouteGuard {
  cardInfo$ = new State({})
  constructor(private cardsApi: CardsApi) {}
  getCardInfo(id:string) {
    return this.cardsApi.getCardInfo(id, 'brand').pipe(tap((res:any) => {
      res.sell_shop_list = [...res.sell_shop_list, ...res.sell_shop_list, ...res.sell_shop_list, ...res.sell_shop_list, ...res.sell_shop_list]
      this.cardInfo$.commit(() => res.info)
    }))
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getCardInfo(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
