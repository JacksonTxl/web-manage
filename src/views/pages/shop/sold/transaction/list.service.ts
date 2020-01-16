import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import {
  TransactionApi,
  TransactionListInput,
  TransactionPriceInput,
  MemberCouponParams
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
  currentPrice$ = new State('0')
  actualAmount$ = new State('0')
  couponList$ = new State({})
  productPage$ = new State({})
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
  getStoreProductList(params: TransactionListInput) {
    return this.transactionApi.getStoreProductList(params).pipe(
      tap((res: any) => {
        res.list.map((item: any) => (item.isError = false))
        this.storeProductList$.commit(() => res.list)
        this.productPage$.commit(() => res.page)
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
    return this.transactionApi.getTransactionPrice(params).pipe(
      tap(res => {
        this.currentPrice$.commit(() => res.info.price)
        this.actualAmount$.commit(() => res.info.product_amount)
      })
    )
  }
  /**
   * 获取可用优惠券
   */
  getUseCoupon(params: MemberCouponParams) {
    return this.transactionApi
      .getTransactionCouponList(params, 'cloud_product')
      .pipe(
        tap(res => {
          this.couponList$.commit(() => res.list)
        })
      )
  }
  /**
   * 云店创建订单
   */
  @Effect()
  createOrder(params: any) {
    return this.transactionApi.setTransaction(params, 'cloud_product')
  }
  /**
   * 云店支付创建订单
   */
  @Effect()
  createOrderPay(params: any) {
    return this.transactionApi.setTransaction(params, 'cloud_product')
  }
}
