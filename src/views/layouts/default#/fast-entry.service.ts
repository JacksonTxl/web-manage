import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CodeUrlApi } from '@/api/v1/brand/orcodeurl'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class FastEntryService implements RouteGuard {
  info$ = new State({})
  auth$ = new State([])
  urlData$ = new State({})
  constructor(
    private CodeUrlApi: CodeUrlApi,
    private authService: AuthService
  ) {}
  getInfo() {
    return this.CodeUrlApi.getCodeUrl().pipe(
      tap(res => {
        res = this.authService.filter(res, 'auth')
        this.info$.commit(() => res.common_info)
        this.auth$.commit(() => res.auth)
        this.urlData$.commit(() => res.data)
      })
    )
  }

  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getInfo()
  }
}
