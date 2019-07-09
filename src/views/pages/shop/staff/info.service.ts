import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  auth$ = new State([])
  loading$ = new State({})
  constructor(private staffapi: ShopStaffApi, private authService: AuthService) {}
  @Effect()
  getInfo(id: string) {
    return this.staffapi.getStaffInfoCommonHeader(id).pipe(tap(res => {
      res = this.authService.filter(res, 'auth')
      this.info$.commit(() => res.common_info)
      this.auth$.commit(() => res.auth)
    }))
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.query as any
    return this.getInfo(id)
  }
}
