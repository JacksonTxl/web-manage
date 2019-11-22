import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'

@Injectable()
export class CommodityInfoService implements Controller {
  info$ = new State({})
  product_type$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  @Effect()
  getCommodityInfo(id: string) {
    return this.orderApi.getCommodityInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    this.product_type$.commit(() => to.meta.query.type)
    return this.getCommodityInfo(to.meta.query.id)
  }
}
