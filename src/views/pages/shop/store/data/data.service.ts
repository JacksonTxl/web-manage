import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi, DtoreBoard } from '@/api/v1/shop/store/store'
import { anyAll } from '@/operators'
@Injectable()
export class DataService implements Controller {
  dataProfile$ = new State({})
  storeBoard$ = new State({})
  storeSaleList$ = new State({})
  storeCategoryRank$ = new State({})
  constructor(private stockApi: StoreApi) {}
  @Effect()
  // 数据概况
  getDataProfile() {
    return this.stockApi.dataProfile().pipe(
      tap((res: any) => {
        console.log(res)
        this.dataProfile$.commit(() => res)
      })
    )
  }
  @Effect()
  // 整体看板
  getStoreBoard(query: DtoreBoard) {
    return this.stockApi.storeBoard(query).pipe(
      tap((res: any) => {
        console.log(res)
        this.storeBoard$.commit(() => res)
      })
    )
  }
  @Effect()
  // 类目支付排行
  getStoreSaleList(query: DtoreBoard) {
    return this.stockApi.storeSaleList(query).pipe(
      tap((res: any) => {
        console.log(res)
        this.storeSaleList$.commit(() => res)
      })
    )
  }
  @Effect()
  // 商品销售榜
  getStoreCategoryRank(query: DtoreBoard) {
    return this.stockApi.storeCategoryRank(query).pipe(
      tap((res: any) => {
        console.log(res)
        this.storeCategoryRank$.commit(() => res)
      })
    )
  }
  @Effect()
  init() {
    return anyAll(
      this.getDataProfile(),
      this.getStoreBoard({ date_type: '', date: '' }),
      this.getStoreSaleList({ date_type: '', date: '' }),
      this.getStoreCategoryRank({ date_type: '', date: '' })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
