import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ShopStaffApi, GetStaffFollowInput } from '@/api/v1/staff/staff'

interface FollowState {
    followList: Object
}
@Injectable()
export class FollowService extends Store<FollowState> {
    state$: State<FollowState>
    followList$: Computed<Object>
    constructor(private staffApi: ShopStaffApi) {
      super()
      this.state$ = new State({
        followList: {}
      })
      this.followList$ = new Computed(this.state$.pipe(pluck('followList')))
    }
    getStaffFollow(query: GetStaffFollowInput) {
      return this.staffApi.getStaffFollow(query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.followList = res
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      this.getStaffFollow(to.query).subscribe(() => {
        next()
      })
    }
}
