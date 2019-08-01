import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { FrontApi, GetEntranceListInput, SetEntranceLeaveBatchInput } from '@/api/v1/front'
import { tap, map } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class EntranceService implements RouteGuard {
  loading$ = new State({})
  list$ = new State([])
  page$ = new State({})
  auth$ = this.authService.authMap$({
    checkout: 'shop:front_end:check_in_out|checkout',
    batchCheckout: 'shop:front_end:check_in_out|batch_checkout'
  })
  entryTypeList$ = this.userService
    .getOptions$('front.visit_type')
    .pipe(map(options => [{ value: -1, label: '全部类型' }].concat(options)))

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private frontApi: FrontApi) {}
  @Effect()
  getList(query:GetEntranceListInput) {
    return this.frontApi.getEntranceList(query).pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  // 单个离场
  setEntranceLeave(id:string) {
    return this.frontApi.setEntranceLeave(id)
  }
  // 批量离场
  setEntranceLeaveBatch(params:SetEntranceLeaveBatchInput) {
    return this.frontApi.setEntranceLeaveBatch(params)
  }
  beforeEach(to:ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
