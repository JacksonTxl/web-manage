import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi, GetStaffFollowInput } from '@/api/v1/staff'

@Injectable()
export class FollowService implements RouteGuard {
    followList$ = new State({})
    page$ = new State({})
    constructor(private staffApi: StaffApi) {}
    getStaffFollow(query: any) {
      return this.staffApi.getStaffFollow(query).pipe(
        tap(res => {
          this.followList$.commit(() => res.list)
          this.page$.commit(() => res.page)
        })
      )
    }

    beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
      // const { shop_id } = to.query
      return this.getStaffFollow(to.query)
    }
}
