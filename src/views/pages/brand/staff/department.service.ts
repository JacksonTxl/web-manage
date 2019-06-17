import { DepartmentService as DepService } from './department.service#/department.service'
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, Params } from '@/api/v1/staff'
import { CommonService } from './department.service#/common.service'
import { UserService } from '@/services/user.service'

interface SetState {
  staffList: any
}
@Injectable()
export class DepartmentService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  staffList$: Computed<any>
  // staffList$: Computed<StaffState>
  constructor(private staffApi: StaffApi, private depService: DepService) {
    super()
    this.state$ = new State({
      staffList: []
    })
    this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
  }
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data).pipe(tap(res => {
      this.state$.commit(state => {
        state.staffList = res.list
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
