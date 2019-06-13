import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import { ShopStaffApi } from '@/api/v1/staff/staff'
interface SetState{
  info: object
}
@Injectable()
export class InfoService extends Store<SetState> {
    state$: State<SetState>
    info$: Computed<Object>
    constructor(private staffapi : ShopStaffApi) {
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
    protected SET_STAFF_SHOP(data: SetState) {
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
        this.SET_STAFF_SHOP(res.common_info)
        next()
      })
    }
}
