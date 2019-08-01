import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class ListService implements RouteGuard {
  staffList$ = new State([])
  page$ = new State({})
  department$ = new State({})
  staffEnums$ = this.userService.staffEnums$
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    join: 'brand_shop:staff:staff|join',
    add: 'brand_shop:staff:staff|add',
    import: 'brand_shop:staff:staff|import'
  })
  constructor(
    private staffApi: ShopStaffApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getStaffList(query: GetListQuery) {
    return this.staffApi.getList(query).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.staffList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }

  getStaffDepartment() {
    return this.staffApi.getStaffDepartmentList().pipe(
      tap(res => {
        this.department$.commit(() => res.department)
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { page = 1, size = 20 } = to.meta.query
    return forkJoin(this.getStaffDepartment(), this.getStaffList({ page, size, ...to.query }))
  }
}
