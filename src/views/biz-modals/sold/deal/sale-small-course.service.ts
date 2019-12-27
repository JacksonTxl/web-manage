import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import {
  TransactionApi,
  MemberCouponParams,
  TransactionPriceInput
} from '@/api/v1/sold/transaction'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { forkJoin, EMPTY, Observable } from 'rxjs'
import { tap, switchMap, catchError, debounceTime } from 'rxjs/operators'

@Injectable()
export class SaleSmallCourseService {
  loading$ = new State({})
  info$ = new State({})
  priceAction$: Action<any>
  priceInfo$ = new State('0')
  orderAmountPriceAction$: Action<any>
  orderAmountPrice$ = new State('0')
  memberList$ = new State({})
  saleList$ = new State({})
  couponList$ = new State([])
  coachList$ = new State({})
  personalPrice$ = new State({})

  constructor(
    private contractApi: ContractApi,
    private memberApi: ShopPersonalCourseApi,
    private transactionApi: TransactionApi
  ) {
    this.priceAction$ = new Action(data$ => {
      return data$.pipe(
        this.debounceMap(),
        tap(res => {
          this.priceInfo$.commit(() => res.info.price)
        })
      )
    })
    this.orderAmountPriceAction$ = new Action(data$ => {
      return data$.pipe(
        this.debounceMap(),
        tap(res => {
          this.orderAmountPrice$.commit(() => res.info.price)
        })
      )
    })
  }
  debounceMap() {
    return (stream$: Observable<any>) =>
      stream$.pipe(
        debounceTime(200),
        switchMap((params: TransactionPriceInput) =>
          this.getPrice(params).pipe(catchError(() => EMPTY))
        )
      )
  }
  getInfo(id: string) {
    return this.transactionApi
      .getTransactionInfo(id, 'small_course/detail')
      .pipe(
        tap((res: any) => {
          this.info$.commit(() => res.info)
        })
      )
  }

  @Effect()
  getCodeNumber(type: string) {
    return this.contractApi.getCodeNumber(type)
  }
  @Effect()
  getAdvanceList(id: string | number) {
    return this.transactionApi.getTransactionAdvanceList(id)
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(
      tap((res: any) => {
        this.saleList$.commit(() => res.list)
      })
    )
  }
  getCouponList(params: MemberCouponParams) {
    return this.transactionApi
      .getTransactionCouponList(params, 'small_course')
      .pipe(
        tap((res: any) => {
          this.couponList$.commit(() => res.list)
        })
      )
  }
  @Effect()
  serviceInit(id: string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  setTransactionOrder(params: any) {
    return this.transactionApi.setTransaction(params, 'small_course')
  }
  @Effect()
  setTransactionPay(params: any) {
    return this.transactionApi.setTransaction(params, 'small_course')
  }
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
}
