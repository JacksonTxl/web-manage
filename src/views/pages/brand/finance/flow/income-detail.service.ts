import { FlowApi, GetListInput } from '../../../../../api/v1/finance/flow'
import { UserService } from '@/services/user.service'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { cloneDeep } from 'lodash-es'

@Injectable()
export class IncomeDetailService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  payType$ = this.userService.getOptions$('finance.pay_channel')

  constructor(private userService: UserService, private api: FlowApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getIncomeListInShop(params).pipe(
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
