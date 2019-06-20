import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetListQuery } from '@/api/v1/staff/staff'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'

interface SetState {
    staffList: Object;
    department: Object
}
@Injectable()
export class ListService extends Store<SetState> {
  state$: State<SetState>
  staffList$: Computed<Object>
  department$: Computed<Object>
  staffEnums$: Computed<Object>
  auth$: Computed<Object>
  constructor(private staffApi: ShopStaffApi, private userService: UserService, private authService: AuthService) {
    super()
    this.state$ = new State({
      staffList: {},
      department: {},
      auth: {
        join: this.authService.can('brand_shop:staff:staff|join'),
        add: this.authService.can('brand_shop:staff:staff|add'),
        import: this.authService.can('brand_shop:staff:staff|import')
      }
    })
    this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
    this.department$ = new Computed(this.state$.pipe(pluck('department')))
    this.staffEnums$ = this.userService.staffEnums$
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getStaffList(query: GetListQuery) {
    return this.staffApi.getList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.staffList = res
        })
      })
    )
  }

  getStaffDepartment() {
    return this.staffApi.getStaffDepartmentList().pipe(
      tap(res => {
        this.state$.commit(state => {
          state.department = res.department
        })
      })
    )
  }

  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { page = 1, size = 99, shop_id } = to.meta.query
    this.getStaffDepartment().subscribe(() => {})
    this.getStaffList({ page, size, ...to.query }).subscribe(() => {
      next()
    })
  }
}
