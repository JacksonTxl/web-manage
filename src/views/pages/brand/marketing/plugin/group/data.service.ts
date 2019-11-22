import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { GroupBuyApi, GroupData } from '@/api/v1/marketing/group_buy'
import { LotteryApi } from '@/api/v1/marketing/lottery'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
@Injectable()
export class DataService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  collect$ = new State([])
  info$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getData(params: GroupData) {
    return this.groupBuyApi.getData(params).pipe(
      tap((res: any) => {
        console.log(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.collect$.commit(() => res.collect)
        this.loading$.commit(() => res.loading)
        console.log(this.collect$)
      })
    )
  }
  getDatatop(id: Number) {
    return this.groupBuyApi.getGroupBuyDataTop(id).pipe(
      tap((res: any) => {
        console.log(res)
        this.info$.commit(() => res)
        console.log(this.info$)
      })
    )
  }
  init(params: any) {
    return forkJoin(this.getData(params), this.getDatatop(params.id))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
