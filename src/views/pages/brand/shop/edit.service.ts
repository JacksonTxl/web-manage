import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ShopApi, ShopInput } from '@/api/v1/shop'
import { State, Computed, Effect } from 'rx-state'
import { Store } from '@/services/store'
import { pluck, tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
interface ShopState {
  /**
   * 门店详情
   */
  shopInfo: any
  /**
   * 服务列表
   */
  serviceList: any[]
}
@Injectable()
export class EditService extends Store<ShopState> implements RouteGuard {
  state$: State<ShopState>
  shopInfo$: Computed<any>
  serviceList$: Computed<any>
  constructor(private shopApi: ShopApi) {
    super()
    this.state$ = new State({
      shopInfo: {},
      serviceList: []
    })
    this.shopInfo$ = new Computed(this.state$.pipe(pluck('shopInfo')))
    this.serviceList$ = new Computed(this.state$.pipe(pluck('serviceList')))
  }
  @Effect()
  edit(id: string, data: ShopInput) {
    return this.shopApi.brandUpdate(id, data)
  }
  getServiceList() {
    return this.shopApi.getServiceList().pipe(tap((res:any) => {
      this.SET_SERVICE_LIST(res.services)
    }))
  }
  SET_SERVICE_LIST(list:any) {
    this.state$.commit(state => {
      state.serviceList = list
    })
  }
  getShopInfo(id:string) {
    return this.shopApi.getInfo(id).pipe(tap((res:any) => {
      this.SET_SHOP_INFO(res.shop_info)
    }))
  }
  SET_SHOP_INFO(info:any) {
    this.state$.commit(state => {
      state.shopInfo = info
    })
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
