import { FlowApi, GetListInput } from './../../../../../api/v1/finance/flow'
import { UserService } from '@/services/user.service'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class ExpenditureService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  total$ = new State({})
  payType$ = this.userService.getOptions$('finance.pay_channel')

  constructor(private userService: UserService, private api: FlowApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getExpenditureListInShop(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.userService.getOptions$('finance.pay_channel').pipe(
      tap((list: any) => {
        list = [{ value: -1, label: '全部' }, ...list]
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
