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
  auth$ = this.authService.authMap$({
    areaAdd: 'shop:shop:shop_area|add',
    areaEdit: 'shop:shop:shop_area|edit',
    areaDel: 'shop:shop:shop_area|del',
    seatSet: 'shop:shop:area_seat|set'
  })
  constructor(protected courtApi: CourtApi, private authService: AuthService) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
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
  sort(list: any[]) {
    list = list.map((item, index) => {
      return {
        id: item.id,
        sorted: index
      }
    })
    return this.courtApi.sort({ list })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList()
  }
}
