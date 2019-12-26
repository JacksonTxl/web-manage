import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  TransactionApi,
  TransactionListInput,
  ProductInfoParams,
  TransactionPriceInput,
  CouponParams
} from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class ListService {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  storeProductList$ = new State({})
  productTypes$ = this.userService.getOptions$('transaction.product_type')
  constructor(
    private transactionApi: TransactionApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getProductList(params: TransactionListInput) {
    return this.transactionApi.getTransactionList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  /**
   * 根据手机号或姓名查找会员
   */
  @Effect()
  getMember(member: string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  /**
   * 销售成员获取
   */
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(
      tap((res: any) => {
        this.saleList$.commit(() => res.list)
      })
    )
  }
  /**
   * 云店获取商品列表
   */
  @Effect()
  getStoreProductList(productName: string) {
    return this.transactionApi
      .getStoreProductList({
        product_name: productName
      })
      .pipe(
        tap((res: any) => {
          this.storeProductList$.commit(() => res.list)
        })
      )
  }
  /**
   * 云店
   */
  getGoodsDetail(id: number) {
    return this.transactionApi.goodsDetail(id).pipe(tap(() => {}))
  }
  /**
   * 云店价格计算
   */
  getStorePrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params).pipe(tap(() => {}))
  }
  /**
   * 获取可用优惠券
   */
  getUseCoupon(query: CouponParams) {
    return this.transactionApi.getCouponList(query).pipe(tap(() => {}))
  }
  /**
   * 云店创建订单
   */
  @Effect()
  createOrder(params: ProductInfoParams) {
    return this.transactionApi.postStoreOrderNum(params)
  }
}
