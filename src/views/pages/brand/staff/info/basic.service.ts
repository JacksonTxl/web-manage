import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi } from '@/api/v1/staff'

@Injectable()
export class BasicService implements RouteGuard {
  basicInfo$ = new State({})
  constructor(private staffApi: StaffApi) {}
  getBasicInfo(id: string) {
    return this.staffApi.getStaffInfo(id).pipe(
      tap(res => {
        this.basicInfo$.commit(() => res.common_info)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    return this.getBasicInfo(id)
  }
}
