import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi, DtoreBoard, MemberAnalysis } from '@/api/v1/shop/store/store'
import { anyAll } from '@/operators'
import moment from 'moment'
let times =
  moment()
    .endOf('day')
    .format('YYYY-MM-DD') + ''
@Injectable()
export class DataService implements Controller {
  dataProfile$ = new State({})
  storeBoard$ = new State({})
  storeSaleList$ = new State({})
  storeCategoryRank$ = new State({})
  storeMemberAnalysis$ = new State({})
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
        this.storeBoard$.commit(() => res)
      })
    )
  }
  @Effect()
  // 类目支付排行
  getStoreSaleList(query: DtoreBoard) {
    return this.stockApi.storeSaleList(query).pipe(
      tap((res: any) => {
        this.storeSaleList$.commit(() => res)
      })
    )
  }
  @Effect()
  // 商品销售榜
  getStoreCategoryRank(query: DtoreBoard) {
    return this.stockApi.storeCategoryRank(query).pipe(
      tap((res: any) => {
        this.storeCategoryRank$.commit(() => res)
      })
    )
  }
  @Effect()
  // 【门店】用户分析
  getStoreMemberAnalysis(query: MemberAnalysis) {
    console.log(query)
    return this.stockApi.storeMemberAnalysis(query).pipe(
      tap((res: any) => {
        this.storeMemberAnalysis$.commit(() => res)
      })
    )
  }
  init() {
    return anyAll(
      this.getDataProfile(),
      this.getStoreBoard({
        date_type: 1,
        date: times
      }),
      this.getStoreSaleList({
        date_type: 1,
        date: times
      }),
      this.getStoreCategoryRank({
        date_type: 1,
        date: times
      }),
      this.getStoreMemberAnalysis({
        date_type: 1,
        date: times,
        choose_type: 1
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
