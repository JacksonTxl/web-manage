import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { DetailParams, StockApi } from '@/api/v1/shop/store/stock'
import { anyAll, then } from '@/operators'
import { UserService } from '@/services/user.service'
@Injectable()
export class DetailService implements Controller {
  list$ = new State([])
  productList$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  // stockFlow$ = this.userService.getOptions$('cloud_store.stock_flow', {
  //   addAll: '全部类型'
  // }) TODO: 需后端修改枚举接口，删除全部之后替换
  stockFlow$ = this.userService.getOptions$('cloud_store.stock_flow')
  constructor(private stockApi: StockApi, private userService: UserService) {}
  @Effect()
  getList(params: DetailParams) {
    return this.stockApi.stockDetailList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  productList() {
    return this.stockApi.productList().pipe(
      tap((res: any) => {
        res.list.unshift({ id: -1, product_name: '全部商品' })
        this.productList$.commit(() => res.list)
      })
    )
  }
  init(params: DetailParams) {
    return anyAll(this.getList(params), this.productList())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
