import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffFollowInput } from '@/api/v1/staff/staff'

@Injectable()
export class FollowService implements RouteGuard {
    page$ = new State({})
    followList$ = new State([])
    loading$ = new State({})
    constructor(private staffApi: ShopStaffApi) {}
    @Effect()
    getStaffFollow(query: GetStaffFollowInput) {
      return this.staffApi.getStaffFollow(query).pipe(
        tap(res => {
          this.page$.commit(() => res.page)
          this.followList$.commit(() => res.list)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      return this.getStaffFollow(to.query)
    }
}
