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
      return this.staffapi.getStaffInfoCommonHeader(id)
    }
    protected SET_STAFF_BRND(data: SetState) {
      this.state$.commit(state => {
        state.info = data
      })
    }
    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
      let { id } = to.meta.query
      console.log('commonInfo service', id)

      this.getInfo(id).subscribe(res => {
        // 记着删 后端接口还没有呢
        res.common_info.has_card = 1
        this.SET_STAFF_BRND(res.common_info)
        next()
      })
    }
}
