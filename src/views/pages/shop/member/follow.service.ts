import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { StatApi } from '@/api/v1/stat/shop'
import { MemberApi, SaleQuery, CoachQuery } from '@/api/v1/member'

import { AuthService } from '@/services/auth.service'

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
    private authService: AuthService
  ) {}
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
  getStaffList(param: SaleQuery) {
    return this.memberApi.getSaleList(param).pipe(
      tap((res: any) => {
        this.staffList$.commit(() => {
          return [{ id: -1, sale_name: '所有销售' }, ...res.list]
        })
      })
    )
  }
  getCoachList(param: CoachQuery) {
    return this.memberApi.getCoachList(param).pipe(
      tap((res: any) => {
        this.coachList$.commit(() => {
          return [{ id: -1, coach_name: '所有教练' }, ...res.list]
        })
      })
    )
  }
  getOperatorList() {
    return this.statApi.getFollowOperatoList().pipe(
      tap((res: any) => {
        this.operatorList$.commit(() => {
          return [{ id: -1, name: '录入人' }, ...res.list]
        })
      })
    )
  }
  init(query: any) {
    console.log(query)
    return forkJoin(
      this.getList(query),
      this.getCoachList(query.CoachQuery),
      this.getStaffList(query.retrieve),
      this.getOperatorList()
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    to.meta.query.follow_start_num =
      to.meta.query.follow_start_num === ''
        ? to.meta.query.follow_start_num
        : Number(to.meta.query.follow_start_num)
    to.meta.query.follow_end_num =
      to.meta.query.follow_end_num === ''
        ? to.meta.query.follow_end_num
        : Number(to.meta.query.follow_end_num)
    return this.init(to.meta.query)
  }
}
