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
  constructor(
    private authService: AuthService,
    private shopApi: ShopApi
  ) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getList(query: GetListInput) {
    return this.shopApi.getList(query).pipe(
      tap(res => {
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
