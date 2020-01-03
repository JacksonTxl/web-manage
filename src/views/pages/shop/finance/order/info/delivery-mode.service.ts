import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'

@Injectable()
export class DeliveryModeService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  @Effect()
  getInfo(id: number) {
    return this.orderApi.getDelivery(id).pipe(
      tap((res: any) => {
        console.log(res)
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo(to.meta.query.id)
  }
}
