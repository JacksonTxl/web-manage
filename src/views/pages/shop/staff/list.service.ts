import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class ListService implements Controller {
  staffList$ = new State([])
  page$ = new State({})
  department$ = new State({})
  identityList$ = this.userService.getOptions$('staff.identity')
  workStatusList$ = this.userService.getOptions$('staff.work_status')
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    join: 'shop:staff:staff|join',
    add: 'shop:staff:staff|add',
    import: 'shop:staff:staff|import',
    export: 'shop:staff:staff|export' // 现在没有权限
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
        this.department$.commit(() => [
          { id: '-1', name: '全部部门' },
          ...res.department
        ])
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { page = 1, size = 20 } = to.meta.query
    return forkJoin(
      this.getStaffDepartment(),
      this.getStaffList({ page, size, ...to.query })
    )
  }
}
