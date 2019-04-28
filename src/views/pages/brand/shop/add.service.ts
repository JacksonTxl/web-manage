import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddService implements RouteGuard {
  serviceList$ = new State({})
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.serviceList$.commit(() => res.services)
    }))
  }
  @Effect()
  save(data: ShopInput) {
    return this.shopApi.add(data)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getServiceList().subscribe(() => {
      next()
    })
  }
}
