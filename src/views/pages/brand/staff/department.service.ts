import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, Params } from '@/api/v1/staff'

interface StaffState {
  staffList: any
}
@Injectable()
export class DepartmentService extends Store<StaffState> implements RouteGuard {
  state$: State<StaffState>
  staffList$: Computed<any>
  // staffList$: Computed<StaffState>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      staffList: []
    })
    this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
  }
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getStaffBrandList(data)
  }
  SET_STAFF_LIST(list: StaffState) {
    this.state$.commit(state => {
      state.staffList = list
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getStaffList({}).subscribe((res: any) => {
      this.SET_STAFF_LIST(res.staffInfo)
    })
    next()
  }
}
