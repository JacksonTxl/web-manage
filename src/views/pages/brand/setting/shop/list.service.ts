import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  ShopApi,
  GetListInput
} from '@/api/v1/brand/shop'
import {
  AuthService
} from '@/services/auth.service'

interface ListState {
  resData: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$: Computed<object>
  constructor(
    private authService: AuthService,
    private shopApi: ShopApi
  ) {
    super()
    this.state$ = new State({
      resData: {},
      auth: {
        add: this.authService.can('brand_shop:shop:shop|add')
      }
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  getList(query: GetListInput) {
    return this.shopApi.getList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.SET_STATE(res)
      })
    )
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
