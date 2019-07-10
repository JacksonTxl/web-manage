import { DepartmentService as DepService } from './department.service#/department.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, Params } from '@/api/v1/staff'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class DepartmentService implements RouteGuard {
  staffList$ = new State([])
  page$ = new State({})
  auth$ = new State({
    join: this.authService.can('brand_shop:staff:staff|join'),
    add: this.authService.can('brand_shop:staff:staff|add'),
    import: this.authService.can('brand_shop:staff:staff|import')
  })
  loading$ = new State({})
  constructor(private staffApi: StaffApi, private depService: DepService, private authService: AuthService) {}
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data).pipe(tap(res => {
      this.authService.filter(res)
      this.staffList$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  getDepartmentList() {
    return this.depService.getDepartmentList()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getDepartmentList()
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getStaffList(to.query)
  }
}
