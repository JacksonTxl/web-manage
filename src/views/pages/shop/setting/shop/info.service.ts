import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { ShopApi } from '@/api/v1/shop'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  serviceList$ = new State([])
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
  getInfo() {
    return this.shopApi.getShopSettingInfo().pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.serviceList$.commit(() => res.services)
    }))
  }
  init() {
    return forkJoin(this.getInfo(), this.getServiceList())
  }
  beforeEach() {
    return this.init()
  }
}
