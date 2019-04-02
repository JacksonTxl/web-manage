import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, Params } from '@/api/v1/staff'
import { StResponse } from '@/types/app'

interface StaffState {
  name: string
  age: number
}
@Injectable()
export class DepartmentService extends Store<StaffState> implements RouteGuard {
  state$: State<StaffState>
  name$: Computed<string>
  constructor(private staffApi: StaffApi) {
    super()
    this.state$ = new State({
      name: 'lee',
      age: 33
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  getStaffList(data: Params) {
    return this.staffApi.getDetail(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getStaffList({}).subscribe((res: StResponse) => {
      console.log(res)
    })
    next()
  }
}
