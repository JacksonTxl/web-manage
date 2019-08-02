import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
import { RedirectService } from '@/services/redirect.service'
interface SetState {}
@Injectable()
export class AppService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  authTabs$ = this.redirectService.getAuthTabs$('brand-setting-app')
  constructor(
    private authService: AuthService,
    private redirectService: RedirectService
  ) {
    super()
    this.state$ = new State({})
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
