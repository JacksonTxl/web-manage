import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { GroupBuyApi, GroupData } from '@/api/v1/marketing/group_buy'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
@Injectable()
export class DataService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  collect$ = new State([])
  constructor(private groupBuyApi: GroupBuyApi) {}
  @Effect()
  getData(params: GroupData) {
    return this.groupBuyApi.getData(params).pipe(
      tap((res: any) => {
        console.log(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.collect$.commit(() => res.collect)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getData(to.meta.query)
  }
}
