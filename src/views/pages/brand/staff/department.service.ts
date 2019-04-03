import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, Params } from '@/api/v1/staff'
import { StResponse } from '@/types/app'

interface StaffState {
  staffList: []
}
@Injectable()
export class DepartmentService extends Store<StaffState> implements RouteGuard {
  state$: State<StaffState>
  name$: Computed<string>
  // staffList$: Computed<StaffState>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      staffList: []
    })
    // this.staffList$ = new Computed(this.state$.pipe(pluck('staffList')))
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getDetail(data)
  }
  SET_STAFF(data: any) {
    this.state$.commit(state => {
      console.log(state)
      state.staffList = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let res1 = [{ a: 1 }]
    this.SET_STAFF(res1)
    // this.getStaffList({}).subscribe((res) => {

    //   console.log(res)
    //   this.SET_STAFF(res1)
    // })
    next()
  }
}
