import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { RedirectService } from '@/services/redirect.service'
interface SetState {
  tabs: object[]
}
@Injectable()
export class ListService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  authTabs$ = this.redirectService.getAuthTabs$(
    'brand-product-card-member-list'
  )
  constructor(private redirectService: RedirectService) {
    super()
    this.state$ = new State({})
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
  }
}
