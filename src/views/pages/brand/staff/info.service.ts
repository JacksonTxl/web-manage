import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi } from '../../../../api/v1/staff'
import { forkJoin } from 'rxjs'
interface SetState{
  info: object
}
@Injectable()
export class InfoService extends Store<SetState> {
    state$: State<SetState>
    info$: Computed<Object>
    constructor(private staffapi : StaffApi) {
      super()
      this.state$ = new State({
        info: {}
      })
      this.info$ = new Computed(this.state$.pipe(pluck('info')))
    }
    @Effect()
    getInfo(id: string) {
      return this.staffapi.staffDetailInfo(id)
    }
    protected SET_STAFF_BRND(data: SetState) {
      this.state$.commit(state => {
        state.info = data
      })
    }
    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      let { staffId } = to.query
      this.getInfo(staffId + '').subscribe(res => {
        this.SET_STAFF_BRND(res)
        next()
      })
    }
}
