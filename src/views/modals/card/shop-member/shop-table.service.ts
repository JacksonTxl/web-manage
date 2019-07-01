import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CardsApi, ListPageInput } from '@/api/v1/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class ShopTableService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  constructor(private cardApi: CardsApi) {}
  @Effect()
  getConsumeShopList(query:ListPageInput, id:string) {
    return this.cardApi.getCardsMemberConsumeShop(query, id).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  @Effect()
  getSaleShopList(query:ListPageInput, id:string) {
    return this.cardApi.getCardsMemberSaleShop(query, id).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
}
