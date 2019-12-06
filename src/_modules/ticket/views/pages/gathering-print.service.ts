import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { OrderApi } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class GatheringPrintService implements Controller {
  info$ = new State({})
  constructor(private orderApi: OrderApi) {}
  getPrintInfo(id: any) {
    return this.orderApi.gatheringTicketInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getPrintInfo(to.meta.query.id)
  }
}
