import { Injectable, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ShopApi, ShopEditShopInput } from '@/api/v1/shop'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditService implements RouteGuard {
  loading$ = new State({})
  info$ = new State({})
  serviceList$ = new State([])
  auth$ = new State({

  })
  constructor(
    private shopApi: ShopApi

  ) {}
  @Effect()
  getInfo() {
    return this.shopApi.getShopSettingInfo().pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.serviceList$.commit(() => res.services)
    }))
  }
  @Effect()
  edit(params:ShopEditShopInput) {
    return this.shopApi.updateShop(params)
  }
  init() {
    return forkJoin(this.getServiceList(), this.getInfo())
  }
  beforeEach() {
    return this.init()
  }
}
