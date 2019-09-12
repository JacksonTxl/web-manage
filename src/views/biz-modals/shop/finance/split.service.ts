import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { OrderApi, SplitParams } from '@/api/v1/finance/order'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
@Injectable()
export class SplitService {
  info$ = new State({})
  loading$ = new State({})
  saleList$ = new State([])
  constructor(private orderApi: OrderApi) {}
  getDetail(id: string) {
    return this.orderApi.getSplitDetail(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getSaleList() {
    return this.orderApi.getSaleList().pipe(
      tap((res: any) => {
        this.saleList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  split(params: SplitParams) {
    return this.orderApi.split(params)
  }

  @Effect()
  serviceInit(id: string) {
    return anyAll(this.getDetail(id), this.getSaleList())
  }
}
