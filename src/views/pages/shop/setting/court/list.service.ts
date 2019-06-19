import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourtApi } from '@/api/v1/shop/area'
import { AuthService } from '@/services/auth.service'

interface ListState {
  list: object[]
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<object[]>
  auth$: Computed<object[]>
  constructor(protected courtApi: CourtApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      list: [],
      auth: {
        areaAdd: this.authService.can('shop:shop:shop_area|add'),
        areaEdit: this.authService.can('shop:shop:shop_area|edit'),
        areaDel: this.authService.can('shop:shop:shop_area|del'),
        seatAdd: this.authService.can('shop:shop:area_seat|add')
      }
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  protected SET_STATE(list: object[]) {
    this.state$.commit(state => {
      state.list = list
    })
  }
  @Effect()
  getList() {
    return this.courtApi.getList().pipe(
      tap(res => {
        this.SET_STATE(res.list)
      })
    )
  }
  del(id: number) {
    return this.courtApi.del(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList().subscribe(next, () => { next(false) })
  }
}
