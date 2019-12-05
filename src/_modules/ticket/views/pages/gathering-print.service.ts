import { Injectable, Controller } from 'vue-service-app'
import { OrderApi } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'
import { State } from 'rx-state'

@Injectable()
export class GatheringPrintService {
  info$ = new State({})
  constructor(private orderApi: OrderApi) {}
  getPrintInfo(id: any) {
    return this.orderApi.gatheringTicketInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
}
