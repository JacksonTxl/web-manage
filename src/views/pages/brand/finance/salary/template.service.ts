import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
interface SetState {

}
@Injectable()
export class TemplateService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  authTabs$ = this.redirectService.getAuthTabs$('brand-finance-salary-template')
  constructor(private redirectService: RedirectService) {
    super()
    this.state$ = new State({})
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
