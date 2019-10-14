import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap, first } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
import {
  StatApi,
  OrderShopListQuery,
  SellStaffListQuery
} from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
interface SetState {}
@Injectable()
export class SellService {
  list$ = new State([])
  departmentList$ = new State([])
  staffList$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  authTabs$ = this.redirectService.getAuthTabs$('shop-stat-sell')
  constructor(
    private StatApi: StatApi,
    private redirectService: RedirectService
  ) {}
  @Effect()
  getsellList(query: OrderShopListQuery) {
    return this.StatApi.getSellList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  @Effect()
  getSellStaffList(query: SellStaffListQuery) {
    return this.StatApi.getSellStaffList(query).pipe(
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
  getDepartmentStaffList() {
    return this.StatApi.getDepartmentStaffList().pipe(
      tap((res: any) => {
        this.staffList$.commit(() => {
          return [{ id: -1, name: '所有销售' }, ...res.info.staff_list]
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
      ? forkJoin(this.getsellList(query))
      : forkJoin(this.getSellStaffList(query), this.getDepartmentStaffList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
