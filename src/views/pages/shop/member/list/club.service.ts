import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'

@Injectable()
export class ClubService implements Controller {
  loading$ = new State({})
  list$ = new State({})
  page$ = new State({})
  coachList$ = new State({})
  saleList$ = new State({})
  crmRule$ = new State({})
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
  ) {}
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
    return this.memberApi.getSaleList(query).pipe(
      tap(res => {
        this.saleList$.commit(() => {
          return [{ id: -1, sale_name: '全部' }, ...res.list]
        })
      })
    )
  }
  getCoachList(query: any) {
    return this.memberApi.getCoachList(query).pipe(
      tap(res => {
        this.coachList$.commit(() => {
          return [{ id: -1, coach_name: '全部' }, ...res.list]
        })
      })
    )
  }
  getCrmRule() {
    return this.memberApi.getClubCrmRule().pipe(
      tap(res => {
        this.crmRule$.commit(() => res)
      })
    )
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
  beforeRouteEnter(to: ServiceRoute) {
    return forkJoin(
      this.getCrmRule(),
      this.getCoachList({}),
      this.getSaleList({})
    )
  }
}
