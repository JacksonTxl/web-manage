import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StaffApi } from '@/api/v1/staff'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements Controller {
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
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.meta.query
    return this.getInfo(id)
  }
}
