import { DepartmentService as DepService } from './department.service#/department.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, Params } from '@/api/v1/staff'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class DepartmentService implements RouteGuard {
  staffList$ = new State([])
  page$ = new State({})
  auth$ = new State({
    join: this.authService.can('brand_shop:staff:staff|join'),
    add: this.authService.can('brand_shop:staff:staff|add'),
    import: this.authService.can('brand_shop:staff:staff|import')
  })
  departmentList$ = new State([])
  departmentSearchList$ = new State([])
  loading$ = new State({})
  constructor(private staffApi: StaffApi, private shopStaffApi: ShopStaffApi, private depService: DepService, private authService: AuthService) {}
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data).pipe(tap(res => {
      this.authService.filter(res)
      this.staffList$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  getDepartmentList() {
    return this.depService.getDepartmentList().pipe(tap(res => {
      this.departmentList$.commit(() => res.department)
    }))
  }
  searchDepartment(keyword: string) {
    return this.shopStaffApi.searchDepartment({
      keyword: keyword
    }).pipe(tap(res => {
      this.departmentSearchList$.commit(() => res.department)
    }))
  }
  init(query: any) {
    return forkJoin(this.getDepartmentList(), this.getStaffList(query))
  }
  // beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
  //   return this.getDepartmentList()
  // }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.query)
  }
}
