import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { BrandApi } from '@/api/v1/brand'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddService implements RouteGuard {
  serviceList$ = new State([])
  loading$ = new State({})
  unusedShops$ = new State([])
  constructor(private shopApi: ShopApi, private brandApi: BrandApi) {}
  getServiceList() {
    return this.shopApi.getServiceList().pipe(
      tap((res: any) => {
        this.serviceList$.commit(() => res.services)
      })
    )
  }
  getUnusedShops() {
    return this.brandApi.getUnusedShops().pipe(
      tap((res: any) => {
        this.unusedShops$.commit(() => res.list)
      })
    )
  }
  @Effect()
  save(data: ShopInput) {
    return this.shopApi.add(data)
  }
  init() {
    return forkJoin(this.getServiceList(), this.getUnusedShops())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
