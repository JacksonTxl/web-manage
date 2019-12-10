import { FlowApi } from '@/api/v1/finance/flow'
import { UserService } from '@/services/user.service'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class IncomeDetailService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  payType$ = this.userService.getOptions$('finance.pay_channel')

  constructor(private userService: UserService, private api: FlowApi) {}

  @Effect()
  getList(params: any) {
    return this.api.getIncomeList(params).pipe(
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
