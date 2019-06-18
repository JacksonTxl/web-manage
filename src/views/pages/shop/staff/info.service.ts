import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'

interface SetState{
  info: object
  auth: object
}
@Injectable()
export class InfoService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<object>
  auth$: Computed<object>
  constructor(private staffapi: ShopStaffApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  @Effect()
  getInfo(id: string) {
    return this.staffapi.getStaffInfoCommonHeader(id).pipe(tap(res => {
      res = this.authService.filter(res, 'auth')
      this.SET_STAFF_SHOP(res.common_info)
      this.SET_STAFF_AUTH(res.auth)
    }))
  }
  protected SET_STAFF_SHOP(data: SetState) {
    this.state$.commit(state => {
      state.info = data
    })
  }
  protected SET_STAFF_AUTH(data: SetState) {
    this.state$.commit(state => {
      state.auth = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { id } = to.query as any
    this.getInfo(id).subscribe(res => {
      next()
    })
  }
}
