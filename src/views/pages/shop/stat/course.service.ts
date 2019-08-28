import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
import { StatApi, OrderShopListQuery } from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
interface SetState {}
@Injectable()
export class CourseService extends Store<SetState> implements RouteGuard {
  list$ = new State([])
  departmentList$ = new State([])
  coachList$ = new State([])
  page$ = new State({})
  // loading$ = new State({})
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-revenue')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {
    super()
    this.state$ = new State({})
  }
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
  getCourseCoachShopList(query: OrderShopListQuery) {
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
  getCoachList(query: any) {
    return this.StatApi.getCoachList(query).pipe(
      tap((res: any) => {
        debugger
        this.coachList$.commit(() => res.list)
      })
    )
  }
  init(query: any) {
    forkJoin
    return query.showTable === 'all'
      ? forkJoin(this.getCourseList(query), this.getDepartmentList())
      : forkJoin(this.getCourseCoachShopList(query), this.getDepartmentList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
