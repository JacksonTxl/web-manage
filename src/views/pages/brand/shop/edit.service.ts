import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
@Injectable()
export class EditService implements RouteGuard {
  shopInfo$ = new State({})
  serviceList$ = new State({})
  loading$ = new State({})
  constructor(private shopApi: ShopApi) {}
  @Effect()
  edit(id: string, data: ShopInput) {
    return this.shopApi.brandUpdate(id, data)
  }
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.serviceList$.commit(() => res.services)
    }))
  }
  getShopInfo(id:string) {
    return this.shopApi.getInfo(id).pipe(tap((res:any) => {
      this.shopInfo$.commit(() => res.shop_info)
    }))
  }
  getDataInit(id:string) {
    return forkJoin(this.getShopInfo(id), this.getServiceList())
  }
  beforeRouteEnter(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.getDataInit(to.meta.query.id).subscribe(() => {
      next()
    })
  }
}
