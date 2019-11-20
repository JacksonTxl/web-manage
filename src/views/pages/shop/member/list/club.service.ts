import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { MemberApi, CoachParams, CoachQuery, SaleQuery } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'

@Injectable()
export class ClubService implements Controller {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  memberListInfo$: Computed<string>
  list$ = new State({})
  page$ = new State({})
  memberLevel$ = this.userService.getOptions$('member.member_level', {
    addAll: true
  })
  isFollow$ = this.userService.getOptions$('member.is_follow', {
    addAll: true
  })
  sourceList$ = this.userService.getOptions$('member.source_channel', {
    addAll: true
  })
  followStatus$ = this.userService.getOptions$('member.club_follow_status', {
    addAll: true
  })
  auth$ = this.authService.authMap$({
    add: 'shop:member:member|add',
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
    export: 'shop:member:member|export',
    unbindSalesman: 'shop:member:member|batch_unbind_saleman',
    unbindCoach: 'shop:member:member|batch_unbind_coach'
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
    return this.memberApi.getClubMember(paramsObj).pipe(
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
  getSaleList(query: any) {
    return this.memberApi.getSaleList(query)
  }
  getCoachList(query: any) {
    return this.memberApi.getCoachList(query)
  }
  getCrmRule() {
    return this.memberApi.getCrmRule()
  }
  dropCoachSea(params: any) {
    return this.memberApi.dropCoachSea(params)
  }
  dropSalerSea(params: any) {
    return this.memberApi.dropSalerSea(params)
  }
  init(query: any) {
    return forkJoin(this.getListInfo(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
