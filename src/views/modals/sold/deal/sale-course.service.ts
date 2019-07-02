import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { TransactionApi, MemberCouponParams, TransactionPriceInput } from '@/api/v1/sold/transaction'
import { tap, switchMap, catchError, debounceTime } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin, EMPTY, Observable } from 'rxjs'

@Injectable()
export class SaleCourseService {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  couponList$ = new State({})
  currentPriceAction$: Action<any>
  currentPrice$ = new State('0')
  constructor(private contractApi: ContractApi, private transactionApi: TransactionApi) {
    this.currentPriceAction$ = new Action(data$ => {
      return data$.pipe(
        this.debounceMap(),
        tap(res => {
          this.currentPrice$.commit(() => res.info.price)
        })
      )
    })
  }
  debounceMap() {
    return (stream$:Observable<any>) => stream$.pipe(debounceTime(200),
      switchMap((params: TransactionPriceInput) => this.getPrice(params).pipe(catchError(() => EMPTY))))
  }
  getInfo(id:string) {
    return this.transactionApi.getTransactionInfo(id, 'package/course').pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  getMember(member:string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getCodeNumber(type: string) {
    return this.contractApi.getCodeNumber(type)
  }
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id)
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(tap((res:any) => {
      this.saleList$.commit(() => res.list)
    }))
  }
  getCouponList(params: MemberCouponParams) {
    return this.transactionApi.getTransactionCouponList(params, 'package').pipe(tap((res:any) => {
      this.couponList$.commit(() => res.list)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  setTransactionOrder(params:any) {
    return this.transactionApi.setTransaction(params, 'package')
  }
  @Effect()
  setTransactionPay(params:any) {
    return this.transactionApi.setTransaction(params, 'package')
  }
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
}
