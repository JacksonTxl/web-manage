import { FlowApi, GetListInput } from '@/api/v1/finance/flow'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class IncomeService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])

  constructor(private api: FlowApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getIncomeSummaryList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(query: any) {
    return forkJoin([this.getList(query)])
  }
  beforeEach(to: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
