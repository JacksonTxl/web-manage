import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { CardApi } from '@/api/v1/sold/cards'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'
import { ContractApi } from '@/api/v1/setting/contract'
import { TransactionApi, MemberCouponParams, TransactionPriceInput } from '@/api/v1/sold/transaction'

@Injectable()
export class UpgradeMemberService {
  info$ = new State({})
  loading$ = new State({})
  couponAction$: Action<any>
  couponList$ = new State([])
  saleList$ = new State([])
  advanceList$ = new State([])
  priceAction$: Action<any>
  priceInfo$ = new State('0')
  constructor(private contractApi:ContractApi, private cardApi:CardApi, private transactionApi: TransactionApi) {
    this.couponAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((params:MemberCouponParams) => this.getCouponList(params).pipe(catchError(() => EMPTY))),
        tap(res => {
          this.couponList$.commit(() => res.list)
        })
      )
    })
    this.priceAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((params:TransactionPriceInput) => this.getPrice(params).pipe(catchError(() => EMPTY))),
        tap(res => {
          this.priceInfo$.commit(() => res.info.price)
        })
      )
    })
  }
  getInfo(id:string) {
    return this.cardApi.getCardUpgradeInfo(id).pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(tap((res:any) => {
      this.saleList$.commit(() => res.list)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  getCardList(search?:string) {
    return this.cardApi.getCardUpgradeList(search)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
  // 获取升级的卡的信息，规格等
  @Effect()
  getUpgradeCardInfo(id:string) {
    return this.transactionApi.getTransactionInfo(id, 'member/card')
  }
  // 优惠券列表
  @Effect()
  getCouponList(query:MemberCouponParams) {
    return this.transactionApi.getTransactionCouponList(query, 'member')
  }
  resetCouponList() {
    this.couponList$.commit(() => [])
  }
  // 定金
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id).pipe(tap((res:any) => {
      this.advanceList$.commit(() => res.list)
    }))
  }
  resetAdvanceList() {
    this.advanceList$.commit(() => [])
  }
  // 小计
  @Effect()
  getPrice(params:TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
  // 下单
  @Effect()
  upgrade(params:any, id:string) {
    return this.cardApi.setCardUpgrade(params, id)
  }
  // 下单并支付
  @Effect()
  upgradePay(params:any, id:string) {
    return this.cardApi.setCardUpgrade(params, id)
  }
}
