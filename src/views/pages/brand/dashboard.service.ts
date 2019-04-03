import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { BrandApi, GetBrandIndexInput } from '@/api/v1/brand'

interface DashboardState {
  shopInfo: Array<Object>
  page: Object
   [propName: string]: any
}
interface StateData {
  [propName: string]: any
}
@Injectable()
export class DashboardService extends Store<DashboardState> {
  state$: State<DashboardState>
  shopInfo$: Computed<Array<Object>>
  page$: Computed<Object>
  constructor(private brandApi: BrandApi) {
    super()
    this.state$ = new State({})
    this.shopInfo$ = new State([])
    this.page$ = new State({})
  }
  getBrands(data: GetBrandIndexInput = {}) {
    return this.brandApi.getBrandIndex(data)
  }
  protected SET_DASHBOARD_STATE(data: StateData = {}) {
    this.state$.commit(state => {
      for (let key in data) {
        state[key] = data[key]
      }
      return state
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getBrands().subscribe(res => {
      this.SET_DASHBOARD_STATE({
        shopInfo: res.shop_info,
        page: res.page
      })
      this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
      this.page$ = new Computed(this.state$.pipe(pluck('page')))
    })
    next()
  }
}
