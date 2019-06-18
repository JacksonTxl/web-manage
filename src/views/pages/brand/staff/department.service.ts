import { DepartmentService as DepService } from './department.service#/department.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, Params } from '@/api/v1/staff'
import { CommonService } from './department.service#/common.service'
import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'

interface SetState {
  staffList: any,
  page: object
}
@Injectable()
export class DepartmentService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  staffList$: Computed<any>
  page$: Computed<object>
  auth$: Computed<any>
  // staffList$: Computed<StaffState>
  constructor(private staffApi: StaffApi, private depService: DepService, private authService: AuthService) {
    super()
    this.state$ = new State({
      staffList: [],
      auth: {
        join: this.authService.can('brand_shop:staff:staff|join'),
        add: this.authService.can('brand_shop:staff:staff|add'),
        import: this.authService.can('brand_shop:staff:staff|import')
      }
    })
    this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data).pipe(tap(res => {
      this.state$.commit(state => {
        res = this.authService.filter(res)
        state.staffList = res.list
        state.page = res.page
      })
    }))
  }
  getDepartmentList() {
    return this.depService.getDepartmentList()
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getDepartmentList().subscribe(() => next())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getStaffList(to.query).subscribe((res: any) => {
      next()
    })
  }
}
