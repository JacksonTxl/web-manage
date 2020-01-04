import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class CoachService implements Controller {
  list$ = new State([])
  departmentList$ = new State([])
  coachList$ = new State([])
  page$ = new State({})
  total$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:stat:class_reports|export_coach'
  })
  authTabs$ = this.authService.getAuthTabs$('shop-stat-course')
  constructor(
    private StatApi: StatApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getCourseList(query: OrderShopListQuery) {
    return this.StatApi.getCourseList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  @Effect()
  getCourseCoachShopList(query: any) {
    return this.StatApi.getCourseCoachShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  getDepartmentList() {
    return this.StatApi.getDepartmentList().pipe(
      tap((res: any) => {
        this.departmentList$.commit(() => res.list)
      })
    )
  }
  getCoachList() {
    return this.StatApi.getCoachList().pipe(
      tap((res: any) => {
        this.coachList$.commit(() => {
          return [
            { id: -1, name: `全部${this.userService.c('coach')}` },
            ...res.info.coach_list
          ]
        })
        this.departmentList$.commit(() => {
          return [{ id: -1, name: '全部部门' }, ...res.info.department_list]
        })
      })
    )
  }
  @Effect()
  init(query: any) {
    return forkJoin(this.getCourseCoachShopList(query), this.getCoachList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
