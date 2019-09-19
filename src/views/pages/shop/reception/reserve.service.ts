import { ReserveApi, GetListInput } from './../../../../api/v1/front/reserve'
import { UserService } from '@/services/user.service'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class ReserveService implements RouteGuard {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  reserveType$ = this.userService.getOptions$('front.reserve_type').pipe(
    tap((list: any) => {
      list.unshift({ value: -1, label: '全部' })
    })
  )

  constructor(private userService: UserService, private api: ReserveApi) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getList(params).pipe(
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
    console.log(to.meta.query)
    return this.init(to.meta.query)
  }
}
