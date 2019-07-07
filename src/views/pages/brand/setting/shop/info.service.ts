import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { ShopApi } from '@/api/v1/shop'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class InfoService implements RouteGuard {
  info$ = new State({})
  serviceList$ = new State([])
  constructor(private shopApi: ShopApi) {}
  getInfo(id:string) {
    return this.shopApi.getInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.serviceList$.commit(() => res.services)
    }))
  }
  init(id:string) {
    return forkJoin(this.getInfo(id), this.getServiceList())
  }
  beforeEach(to:ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
