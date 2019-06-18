import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { forkJoin } from 'rxjs'
import { ShopStaffApi } from '@/api/v1/staff/staff'
import { AuthService } from '@/services/auth.service'

interface SetState{
  info: object
}
@Injectable()
export class InfoService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<object>
  auth$: Computed<object>
  constructor(private staffapi: ShopStaffApi, private authService: AuthService) {
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
    return this.staffapi.getStaffInfoCommonHeader(id).pipe(tap(res => {
      res = this.authService.filter(res)
    }))
  }
  protected SET_STAFF_SHOP(data: SetState) {
    this.state$.commit(state => {
      state.info = data
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let { id } = to.meta.query
    console.log('commonInfo service', id)

    this.getInfo(id).subscribe(res => {
      // 记着删 后端接口还没有呢
      res.common_info.has_card = 1
      this.SET_STAFF_SHOP(res.common_info)
      next()
    })
  }
}
