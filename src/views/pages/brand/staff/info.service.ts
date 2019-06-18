import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { StaffApi } from '../../../../api/v1/staff'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

interface SetState{
  info: object
}
@Injectable()
export class InfoService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<object>
  auth$: Computed<object>
  constructor(private staffApi: StaffApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      info: {},
      auth: {
        edit: this.authService.can('brand_shop:staff:staff|edit'),
        bindCard: this.authService.can('brand_shop:staff:staff|bind_card'),
        rebindCard: this.authService.can('brand_shop:staff:staff|rebind_card'),
        save: this.authService.can('brand_shop:staff:account|save'),
        position: this.authService.can('brand_shop:staff:staff|position'),
        salary: this.authService.can('brand_shop:staff:staff|salary'),
        leave: this.authService.can('brand_shop:staff:staff|leave'),
        reinstate: this.authService.can('brand_shop:staff:staff|reinstate')
      }
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getInfo(id: string) {
    return this.staffApi.getStaffInfoCommonHeader(id).pipe(tap(res => {
      res = this.authService.filter(res, 'auth')
      this.SET_STAFF_BRAND(res.common_info)
    }))
  }
  protected SET_STAFF_BRAND(data: SetState) {
    this.state$.commit(state => {
      state.info = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { id } = to.query as any
    this.getInfo(id).subscribe(res => {
      next()
    })
  }
}
