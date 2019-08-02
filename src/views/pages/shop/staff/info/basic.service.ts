import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi } from '@/api/v1/staff/staff'

@Injectable()
export class BasicService implements RouteGuard {
  basicInfo$ = new State({})
  constructor(private staffApi: ShopStaffApi) {}
  getStaffInfo(id: string) {
    return this.staffApi.getStaffInfo(id).pipe(
      tap(res => {
        this.basicInfo$.commit(() => res.common_info)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const { id } = to.meta.query
    console.log('basic service')
    return this.getStaffInfo(id)
  }
}
