import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi, GetStaffFollowInput } from '@/api/v1/staff/staff'

@Injectable()
export class FollowService implements RouteGuard {
    page$ = new State({})
    followList$ = new State([])
    constructor(private staffApi: ShopStaffApi) {}

    getStaffFollow(query: GetStaffFollowInput) {
      return this.staffApi.getStaffFollow(query).pipe(
        tap(res => {
          this.page$.commit(() => res.page)
          this.followList$.commit(() => res.followList)
        })
      )
    }

    beforeEach(to: ServiceRoute, from: ServiceRoute) {
      return this.getStaffFollow(to.query)
    }
}
