import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { BrandApi, GetBrandIndexInput } from '@/api/v1/brand'

interface DashboardState {
  shopInfo: Array<Object>
  page: Object
  [propName: string]: any
}
@Injectable()
export class DashboardService extends Store<DashboardState> {
  state$: State<DashboardState>
  shopInfo$: Computed<Array<Object>>
  page$: Computed<Object>
  constructor(private brandApi: BrandApi) {
    super()
    this.state$ = new State({
      shopInfo: [],
      page: {}
    })
    this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
  }
  @Effect()
  getBrands(data: GetBrandIndexInput = {}) {
    return this.brandApi.getBrandIndex(data).pipe(
      tap(res => {
        this.SET_DASHBOARD_STATE(res)
      })
    )
  }
  protected SET_DASHBOARD_STATE(data: DashboardState) {
    this.state$.commit(state => {
      state.shopInfo = data.shop_info
      state.page = data.page
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getBrands().subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
