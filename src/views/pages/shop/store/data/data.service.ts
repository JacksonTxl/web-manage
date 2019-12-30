import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { StoreApi, DtoreBoard, MemberAnalysis } from '@/api/v1/shop/store/store'
import { anyAll } from '@/operators'
import moment from 'moment'
let setObj = {
  date_type: 1,
  date:
    moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD') + ''
}
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
        res.category_list = this.storeCategoryRankFilter(res)
        console.log('商品销售榜', res)
        this.storeCategoryRank$.commit(() => res)
      })
    )
  }
  @Effect()
  // 【门店】用户分析
  getStoreMemberAnalysis(query: MemberAnalysis) {
    return this.stockApi.storeMemberAnalysis(query).pipe(
      tap((res: any) => {
        this.storeMemberAnalysis$.commit(() => res)
      })
    )
  }
  init() {
    return anyAll(
      this.getDataProfile(),
      this.getStoreBoard(setObj),
      this.getStoreSaleList(setObj),
      this.getStoreCategoryRank(setObj),
      this.getStoreMemberAnalysis(Object.assign(setObj, { choose_type: 1 }))
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
  // 数据处理
  // 类目分析数据处理
  storeCategoryRankFilter(data: any) {
    return data.category_list.map((item: any) => {
      return {
        name: item.category_name,
        value: item.amount
      }
    })
  }
}
