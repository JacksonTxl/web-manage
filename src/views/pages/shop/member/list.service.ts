import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'

interface MemberListInfoState {
  memberListInfo: any
}
@Injectable()
export class ListService extends Store<MemberListInfoState> {
  state$: State<MemberListInfoState>
  memberListInfo$: Computed<string>
  auth$: Computed<object>
  list$ = new State({})
  page$ = new State({})
  constructor(private memberApi: MemberApi, private authService: AuthService) {
    super()
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
  SET_MEMBER_LIST_INFO(memberListInfo: MemberListInfoState) {
    this.state$.commit(state => {
      state.memberListInfo = memberListInfo
    })
  }
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
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.meta.query).subscribe(res => {
      // this.SET_MEMBER_LIST_INFO(res)
      next()
    })
  }
}
