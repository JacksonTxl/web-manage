import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { CardApi, RenewalCardInput } from '@/api/v1/sold/cards'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'
import { ContractApi } from '@/api/v1/setting/contract'
import { TransactionApi, MemberCouponParams, TransactionPriceInput } from '@/api/v1/sold/transaction'

@Injectable()
export class RenewalMemberService {
  info$ = new State({})
  loading$ = new State({})
  couponList$ = new State([])
  advanceList$ = new State([])
  saleList$ = new State([])
  priceAction$: Action<any>
  priceInfo$ = new State('0')
  constructor(private contractApi: ContractApi,
    private transactionApi: TransactionApi,
    private cardApi: CardApi) {
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
    return this.cardApi.getCardRenewalInfo(id).pipe(tap((res:any) => {
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
  getCodeNumber(type:string) {
    return this.contractApi.getCodeNumber(type)
  }
  @Effect()
  getCouponList(query:MemberCouponParams) {
    return this.transactionApi.getTransactionCouponList(query, 'member').pipe(tap((res:any) => {
      this.couponList$.commit(() => res.list)
    }))
  }
  resetCouponList() {
    this.couponList$.commit(() => [])
  }
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id).pipe(tap((res:any) => {
      this.advanceList$.commit(() => res.list)
    }))
  }
  resetAdvanceList() {
    this.advanceList$.commit(() => [])
  }
  @Effect()
  getPrice(params:TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
  @Effect()
  renewal(params:RenewalCardInput, id:string) {
    return this.cardApi.setCardRenewal(params, id)
  }
  @Effect()
  renewalPay(params:RenewalCardInput, id:string) {
    return this.cardApi.setCardRenewal(params, id)
  }
}
