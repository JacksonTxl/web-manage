import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ManageApi, ManagePhoneInput } from '@/api/account/manage'

interface StaffState {
  name: string
  age: number
}
@Injectable()
export class StaffService extends Store<StaffState> {
  state$: State<StaffState>
  name$: Computed<string>
  constructor(private manageApi: ManageApi) {
    super()
    this.state$ = new State({
      name: 'lee',
      age: 33
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Effect()
  test(data: ManagePhoneInput) {
    return this.manageApi.findManagePhone(data)
  }
  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
