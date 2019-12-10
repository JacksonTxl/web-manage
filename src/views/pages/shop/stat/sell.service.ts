import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  StatApi,
  OrderShopListQuery,
  SellStaffListQuery
} from '@/api/v1/stat/shop'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SellService {
  list$ = new State([])
  departmentList$ = new State([])
  staffList$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})
  authTabs$ = this.authService.getAuthTabs$('shop-stat-sell')
  constructor(private StatApi: StatApi, private authService: AuthService) {}
  @Effect()
  getsellList(query: OrderShopListQuery) {
    return this.StatApi.getSellList(query).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  @Effect()
  getSellStaffList(query: SellStaffListQuery) {
    return this.StatApi.getSellStaffList(query).pipe(
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
