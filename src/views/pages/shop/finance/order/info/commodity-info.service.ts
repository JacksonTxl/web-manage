import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect, computed } from 'rx-state'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'
import { InfoService } from '../info.service'

@Injectable()
export class CommodityInfoService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  product_type$ = computed((info: any) => info.product_type, [
    this.infoService.info$
  ])
  constructor(private orderApi: OrderApi, private infoService: InfoService) {}
  @Effect()
  getCommodityInfo(id: string) {
    return this.orderApi.getCommodityInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() =>
          res.info.product_list ? res.info.product_list : res.info
        )
      })
    )
  }
  @Effect()
  getGoodsInfo(id: number) {
    return this.orderApi.getGoodsInfo(id).pipe(
      tap((res: any) => {
        console.log(res)
        this.info$.commit(() => res.info.product_list)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getCommodityInfo(to.meta.query.id)
  }
}
