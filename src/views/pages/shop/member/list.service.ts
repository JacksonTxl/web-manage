import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ListService implements RouteGuard {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  memberListInfo$: Computed<string>
  auth$: Computed<object>
  list$ = new State({})
  page$ = new State({})
  constructor(private memberApi: MemberApi, private authService: AuthService) {
    this.state$ = new State({
      memberListInfo: {},
      auth: {
        add: this.authService.can('shop:member:member|add'),
        import: this.authService.can('shop:member:member|import'),
        tag: this.authService.can('shop:member:member|tag'),
        bindCoach: this.authService.can('shop:member:member|bind_coach'),
        bindSalesman: this.authService.can('shop:member:member|bind_salesman'),
        export: this.authService.can('shop:member:member|export')
      }
    })
    this.memberListInfo$ = new Computed(
      this.state$.pipe(pluck('memberListInfo'))
    )
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getListInfo(paramsObj: any) {
    return this.memberApi.getMember(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  removeWechatBind(id: number) {
    return this.memberApi.removeWechatBind(id)
  }
  getMemberSourceRegisters() {
    return this.memberApi.getMemberSourceRegisters()
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getListInfo(to.meta.query)
  }
}
