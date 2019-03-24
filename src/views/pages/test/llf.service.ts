import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Request, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ManageApi, ManagePhoneInput } from '@/api/account/manage'

interface LlfState {
  name: string
  age: number
}
@Injectable()
export class LlfService extends Store<LlfState> {
  state$: State<LlfState>
  name$: Computed<string>
  constructor(private manageApi: ManageApi) {
    super()
    this.state$ = new State({
      name: 'lee',
      age: 33
    })
    this.name$ = new Computed(this.state$.pipe(pluck('name')))
  }
  @Request()
  test(data: ManagePhoneInput) {
    return this.manageApi.findManagePhone(data)
  }
  beforeRouteEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
