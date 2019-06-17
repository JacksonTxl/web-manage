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
    const tabs: object[] = []
    if (this.authService.can('todo')) {
      tabs.push({
        label: '全部储值卡项',
        route: {
          name: 'brand-product-card-deposite-list-member-list'
        }
      })
    }
    if (this.authService.can('todo')) {
      tabs.push({
        label: '门店上架储值卡',
        route: {
          name: 'brand-product-card-deposite-list-shop-sale-list'
        }
      })
    }
    this.state$.commit(state => {
      state.tabs = tabs
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.initTabs()
    const tabs: any = this.tabs$.snapshot()
    const target = tabs[0].route
    if (to.name === 'brand-product-card-deposite-list') {
      next(target)
    } else {
      next()
    }
  }
}
