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
    add: 'shop:member:member|add',
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
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
          return [{ id: -1, coach_name: '全部教练' }, ...res.list]
        })
      })
    )
  }
  getOperatorList() {
    return this.memberApi.getCoachList().pipe(
      tap((res: any) => {
        this.coachList$.commit(() => {
          return [{ id: -1, coach_name: '录入人' }, ...res.list]
        })
      })
    )
  }
  init(query: any) {
    return forkJoin(
      this.getList(query),
      this.getCoachList(query.CoachQuery),
      this.getStaffList(query.retrieve),
      this.getOperatorList()
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
