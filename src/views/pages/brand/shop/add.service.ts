import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { Store } from '@/services/store'
import { Computed, State } from 'rx-state'
import { pluck } from 'rxjs/operators'
interface ShopState {
  serviceList: any
}
@Injectable()
export class AddService extends Store<ShopState> implements RouteGuard {
  state$: State<ShopState>
  serviceList$: Computed<any>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      serviceList: []
    })
    this.serviceList$ = new Computed(this.state$.pipe(pluck('serviceList')))
  }
  getServiceList() {
    return this.shopApi.getServiceList()
  }
  SET_SERVICE_LIST(list:any) {
    this.state$.commit(state => {
      state.serviceList = list
    })
  }
  save(data: ShopInput) {
    return this.shopApi.add(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getServiceList().subscribe((res:any) => {
      this.SET_SERVICE_LIST(res.services)
    })
    next()
  }
}
