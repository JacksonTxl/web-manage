import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
interface SetState {
  tabs: object[]
}
@Injectable()
export class TemplateService extends Store<SetState> implements RouteGuard {
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
  initTabs(fn: Function) {
    const can = this.authService.can
    const tabs: object[] = []
    if (can('底薪模板的auth key')) {
      tabs.push({
        label: '底薪模板',
        route: {
          name: 'brand-finance-salary-template-basic'
        }
      })
    }
    if (can('业绩模板的auth key')) {
      tabs.push({
        label: '业绩模板',
        route: {
          name: 'brand-finance-salary-template-performance'
        }
      })
    }
    this.state$.commit(state => {
      state.tabs = tabs
    })
    fn(tabs)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.initTabs((tabs: any) => {
      const target = tabs[0].route
      if (to.name === 'brand-finance-salary-template' && target) {
        next(target)
      } else {
        next()
      }
    })
  }
}
