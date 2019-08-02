import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, FlowParams } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'

@Injectable()
export class FlowService {
  info$ = new State({})
  loading$ = new State({})
  constructor(private orderApi: OrderApi) {}
  getDetail(id: string) {
    return this.orderApi.getFlowDetail(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  orderFlow(params: FlowParams) {
    return this.orderApi.orderFlow(params)
  }
}
