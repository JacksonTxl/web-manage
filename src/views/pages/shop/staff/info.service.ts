import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  auth$ = new State([])
  constructor(
    private staffapi: ShopStaffApi,
    private authService: AuthService
  ) {}
  getInfo(id: string) {
    return this.staffapi.getStaffInfoCommonHeader(id).pipe(
      tap(res => {
        this.info$.commit(() => res.common_info)
        this.auth$.commit(() => res.auth)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    let { id } = to.query as any
    return this.getInfo(id)
  }
}
