import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, GetStaffFollowInput } from '@/api/v1/staff'

@Injectable()
export class FollowService implements RouteGuard {
    followList$ = new State({})
    page$ = new State({})
    loading$ = new State({})

    constructor(private staffApi: StaffApi) {}
    @Effect()
    getStaffFollow(query: any) {
      return this.staffApi.getStaffFollow(query).pipe(
        tap(res => {
          this.followList$.commit(() => res.list)
          this.page$.commit(() => res.page)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      return this.getStaffFollow(to.meta.query)
    }
}
