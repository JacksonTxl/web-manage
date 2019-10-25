import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, first } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
interface SetState {}
@Injectable()
export class CourseService {
  list$ = new State([])
  departmentList$ = new State([])
  coachList$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export_all: 'shop:stat:class_reports|list_summary',
    export_coach: 'shop:stat:class_reports|list_coach'
  })
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-course')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getCourseList(query: OrderShopListQuery) {
    return this.StatApi.getCourseList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getCourseCoachShopList(query: any) {
    return this.StatApi.getCourseCoachShopList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
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
    return query.showTable === 'all'
      ? forkJoin(this.getCourseList(query))
      : forkJoin(this.getCourseCoachShopList(query), this.getCoachList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
