import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
interface SetState {
  tabs: object[]
}
@Injectable()
export class ListService extends Store<SetState> implements RouteGuard {
  state$: State<SetState>
  tabs$: Computed<object[]>
  constructor(
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      tabs: []
    })
    this.tabs$ = new Computed(this.state$.pipe(pluck('tabs')))
  }
  initTabs() {
    const can = this.authService.can
    const tabs: object[] = []
    if (can('会员卡项的auth key')) {
      tabs.push({
        label: '会员卡项',
        route: {
          name: 'brand-product-card-member-list-member-list'
        }
      })
    }
    if (can('门店上架卡项的auth key')) {
      tabs.push({
        label: '门店上架卡项',
        route: {
          name: 'brand-product-card-member-list-stop-sale-list'
        }
      })
    }
    this.state$.commit(state => {
      state.tabs = tabs
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.initTabs()
    const target = this.tabs$.snapshot()[0].route
    if (to.name === 'brand-product-card-member-list') {
      next(target)
    } else {
      next()
    }
  }
}
