import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi, GetStaffFollowInput } from '@/api/v1/staff'

interface FollowState {
    followList: Object
}
@Injectable()
export class FollowService extends Store<FollowState> {
    state$: State<FollowState>
    followList$: Computed<Object>
    constructor(private staffApi: StaffApi) {
      super()
      this.state$ = new State({
        followList: {}
      })
      this.followList$ = new Computed(this.state$.pipe(pluck('followList')))
    }
    getBasicInfo(id: string, query: GetStaffFollowInput) {
      return this.staffApi.getStaffFollow(id, query).pipe(
        tap(res => {
          this.state$.commit(state => {
            state.followList = res.list
          })
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
      console.log('-===========', to.meta.query)
      let { id, member_name, follow_date_first, follow_date_last, page, size } = to.meta.query
      this.getBasicInfo(id, { member_name, follow_date_first, follow_date_last, page, size }).subscribe(() => {
        next()
      })
    }
}
