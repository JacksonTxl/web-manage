import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class FollowService implements Controller {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  memberListInfo$: Computed<string>
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
  getList(paramsObj: any) {
    return this.statApi.getFollowHistory(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getStaffList() {
    console.log('getStaffList')
    return this.statApi.getDepartmentStaffList().pipe(
      tap((res: any) => {
        this.staffList$.commit(() => {
          return [{ id: -1, name: '所有销售' }, ...res.info.staff_list]
        })
      })
    )
  }
  getCoachList() {
    console.log('getCoachList')
    return this.statApi.getCoachList().pipe(
      tap((res: any) => {
        this.coachList$.commit(() => {
          return [{ id: -1, name: '全部教练' }, ...res.info.coach_list]
        })
      })
    )
  }
  init(query: any) {
    return forkJoin(
      this.getList(query),
      this.getCoachList(),
      this.getStaffList()
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
