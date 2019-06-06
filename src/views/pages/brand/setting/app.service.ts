import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { AuthService } from '@/services/auth.service'
interface SetState {
  tabs: object[]
}
@Injectable()
export class AppService extends Store<SetState> implements RouteGuard {
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
    if (can('课程的auth key')) {
      tabs.push({
        label: '课程',
        route: {
          name: 'brand-setting-app-course-category'
        }
      })
    }
    if (can('员工的auth key')) {
      tabs.push({
        label: '员工',
        route: {
          name: 'brand-setting-app-staff-skillful'
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
      if (to.name === 'brand-setting-app' && target) {
        next(target)
      } else {
        next()
      }
    })
  }
}
