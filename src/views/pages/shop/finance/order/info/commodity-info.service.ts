import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'
import { InfoService } from '../info.service'

@Injectable()
export class CommodityInfoService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  product_type$ = new Computed(
    this.infoService.info$.pipe(pluck('product_type'))
  )
  constructor(private orderApi: OrderApi, private infoService: InfoService) {}
  @Effect()
  getCommodityInfo(id: string) {
    return this.orderApi.getCommodityInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getCommodityInfo(to.meta.query.id)
  }
}
