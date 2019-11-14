import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { OrderApi } from '@/api/v1/finance/order'

@Injectable()
export class RefundInfoService implements Controller {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  @Effect()
  getInfo(id: string) {
    return this.orderApi.getDetail(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo(to.meta.query.id)
  }
}
