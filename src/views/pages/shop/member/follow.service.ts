import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { anyAll } from '@/operators'
import { StatApi } from '@/api/v1/stat/shop'
import { MemberApi, SaleQuery, CoachQuery } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class FollowService implements Controller {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  list$ = new State({})
  page$ = new State({})
  staffList$ = new State({})
  coachList$ = new State({})
  operatorList$ = new State({})
  auth$ = this.authService.authMap$({
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    export: 'shop:member:member|export'
  })
  constructor(
    private statApi: StatApi,
    private memberApi: MemberApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  memberLevel$ = this.userService.getOptions$('shop_member.member_level', {
    addAll: true
  })
  followWayList$ = this.userService.getOptions$('member.follow_way', {
    addAll: true
  })
  followStatusList$ = this.userService.getOptions$('member.follow_status', {
    addAll: true
  })

  @Effect()
  getList(paramsObj: any) {
    return this.statApi.getFollowHistory(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getStaffList(param: SaleQuery) {
    return this.memberApi.getSaleList(param).pipe(
      tap((res: any) => {
        this.staffList$.commit(() => {
          return [{ id: -1, sale_name: '全部' }, ...res.list]
        })
      })
    )
  }
  @Effect()
  getCoachList(param: CoachQuery) {
    return this.memberApi.getCoachList(param).pipe(
      tap((res: any) => {
        this.coachList$.commit(() => {
          return [{ id: -1, coach_name: '全部' }, ...res.list]
        })
      })
    )
  }
  @Effect()
  getOperatorList() {
    return this.statApi.getFollowOperatoList().pipe(
      tap((res: any) => {
        this.operatorList$.commit(() => {
          return [{ id: -1, name: '全部' }, ...res.list]
        })
      })
    )
  }
  init(query: any) {
    return anyAll(
      this.getList(query),
      this.getCoachList(query.CoachQuery),
      this.getStaffList(query.retrieve),
      this.getOperatorList()
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    to.meta.query.follow_start_num = to.meta.query.follow_start_num
      ? Number(to.meta.query.follow_start_num)
      : ''
    to.meta.query.follow_end_num = to.meta.query.follow_end_num
      ? Number(to.meta.query.follow_end_num)
      : ''
    return this.init(to.meta.query)
  }
}
