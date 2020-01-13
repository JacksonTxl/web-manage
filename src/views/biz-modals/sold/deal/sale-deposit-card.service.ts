import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import {
  TransactionApi,
  TransactionPriceInput,
  MemberCouponParams
} from '@/api/v1/sold/transaction'
import { tap, switchMap, catchError, debounceTime } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { forkJoin, EMPTY } from 'rxjs'

@Injectable()
export class SaleDepositCardService {
  priceAction$: Action<any>
  priceInfo$ = new State('0')
  loading$ = new State({})
  info$ = new State({})
  saleList$ = new State({})
  couponList$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private transactionApi: TransactionApi
  ) {
    this.priceAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((params: TransactionPriceInput) =>
          this.getPrice(params).pipe(catchError(() => EMPTY))
        ),
        tap(res => {
          this.priceInfo$.commit(() => res.info.price)
        })
      )
    })
  }
  getInfo(id: string) {
    return this.transactionApi.getTransactionInfo(id, 'deposit/card').pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(
      tap((res: any) => {
        this.saleList$.commit(() => res.list)
      })
    )
  }
  getCouponList(params: MemberCouponParams) {
    return this.transactionApi.getTransactionCouponList(params, 'deposit').pipe(
      tap((res: any) => {
        this.couponList$.commit(() => res.list)
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
  @Effect()
  serviceInit(id: string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  setTransaction(params: any) {
    return this.transactionApi.setTransaction(params, 'deposit')
  }
  @Effect()
  setTransactionPay(params: any) {
    return this.transactionApi.setTransaction(params, 'deposit')
  }
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
}
