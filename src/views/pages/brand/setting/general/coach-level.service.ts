import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CoachLevelApi, GetCoachLevelListInput, DeleteCoachLevelInput } from '@/api/v1/setting/coach/level'
import { AuthService } from '@/services/auth.service'

interface ListState {
  resData: object
}
@Injectable()
export class CoachLevelService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$: Computed<object>
  constructor(
    private coachLevelApi: CoachLevelApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        add: this.authService.can('brand:setting:coach_level|add'),
        get: this.authService.can('brand:setting:coach_level|get')
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getCoachLevelList(query: GetCoachLevelListInput) {
    return this.coachLevelApi.getCoachLevelList(query).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.SET_STATE(res)
      })
    )
  }
  deleteCoachLevel(params: DeleteCoachLevelInput) {
    return this.coachLevelApi.deleteCoachLevel(params)
  }
  protected SET_STATE(data: any) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCoachLevelList({ page: to.meta.query.page, size: 20 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
