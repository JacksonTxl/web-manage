import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class StudioService implements Controller {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  memberListInfo$: Computed<string>
  list$ = new State({})
  page$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:member|add',
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
    export: 'shop:member:member|export'
  })
  constructor(
    private memberApi: MemberApi,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.state$ = new State({
      memberListInfo: {}
    })
    this.memberListInfo$ = new Computed(
      this.state$.pipe(pluck('memberListInfo'))
    )
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
