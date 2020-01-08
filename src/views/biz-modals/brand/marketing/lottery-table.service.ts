import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { LotteryApi, GetPrizedListQuery } from '@/api/v1/marketing/lottery'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'

@Injectable()
export class PrizeService implements Controller {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private lotteryApi: LotteryApi) {}
  @Effect()
  getPrizedList(query: any) {
    return this.lotteryApi.getPrizedList(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
}
