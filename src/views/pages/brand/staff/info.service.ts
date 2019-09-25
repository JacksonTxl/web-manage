import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi } from '../../../../api/v1/staff'
import { AuthService } from '@/services/auth.service'

interface SetState {
  info: object
  auth: object
}
@Injectable()
export class InfoService {
  info$ = new State({})
  auth$ = new State({})
  constructor(private staffApi: StaffApi, private authService: AuthService) {}
  @Effect()
  getInfo(id: string) {
    return this.staffApi.getStaffInfoCommonHeader(id).pipe(
      tap(res => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.common_info)
        this.auth$.commit(() => res.auth)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.meta.query
    return this.getInfo(id)
  }
}
