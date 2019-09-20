import { FlowApi, GetListInput } from './../../../../../api/v1/finance/flow'
import { UserService } from '@/services/user.service'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class ExpenditureService implements RouteGuard {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  payType$ = this.userService.getOptions$('finance.pay_channel').pipe(
    tap((list: any) => {
      list.unshift({ value: -1, label: '全部' })
    })
  )

  constructor(private userService: UserService, private api: FlowApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getExpenditureListInShop(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  init(query: any) {
    return forkJoin([this.getList(query)])
  }
  beforeRouteEnter(to: ServiceRoute) {
    this.userService.getOptions$('finance.pay_channel').pipe(
      tap((list: any) => {
        list = [{ value: -1, label: '全部' }, ...list]
      })
    )
  }
  beforeEach(to: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
