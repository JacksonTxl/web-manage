import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CouponApi, ListPageInput } from '@/api/v1/marketing/coupon'
import { tap } from 'rxjs/operators'
@Injectable()
export class CouponTableService {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({
    current_page: 1,
    size: 20,
    total_counts: 1,
    total_pages: 1
  })
  constructor(private cardApi: CouponApi) {}
  @Effect()
  getPluginCouponShop(query: ListPageInput, id: string) {
    return this.cardApi.getPluginCouponShop(query, id).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
