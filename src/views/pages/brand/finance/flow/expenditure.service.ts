import { FlowApi, GetListInput } from '@/api/v1/finance/flow'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'

@Injectable()
export class ExpenditureService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])

  constructor(private api: FlowApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getExpenditureSummaryList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
