import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { TransactionApi, MemberCouponParams, TransactionPriceInput } from '@/api/v1/sold/transaction'
import { CabinetApi } from '@/api/v1/sold/cabinet'
import { tap, switchMap, catchError, debounceTime } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { forkJoin, EMPTY, Observable } from 'rxjs'

@Injectable()
export class ReletService {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  advanceList$ = new State({})
  currentPriceAction$: Action<any>
  currentPrice$ = new State('0')
  orderAmountPriceAction$: Action<any>
  orderAmountPrice$ = new State('0')
  constructor(private contractApi: ContractApi, private transactionApi: TransactionApi, private cabinetApi: CabinetApi) {
    this.currentPriceAction$ = new Action(data$ => {
      return data$.pipe(
        this.debounceMap(),
        tap(res => {
          this.currentPrice$.commit(() => res.info.price)
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
    return (stream$:Observable<any>) => stream$.pipe(debounceTime(200),
      switchMap((params: TransactionPriceInput) => this.getPrice(params).pipe(catchError(() => EMPTY))))
  }
  getInfo(id: number) {
    return this.cabinetApi.getDetail(id, 'lease').pipe(tap((res:any) => {
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
    return this.transactionApi.getTransactionAdvanceList(id).pipe(tap((res:any) => {
      this.advanceList$.commit(() => res.list)
    }))
  }
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(tap((res:any) => {
      this.saleList$.commit(() => res.list)
    }))
  }
  @Effect()
  serviceInit(id:number) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  setTransactionOrder(params:any, id: number) {
    return this.cabinetApi.setTransaction(params, '', id)
  }
  @Effect()
  setTransactionPay(params:any, id: number) {
    return this.cabinetApi.setTransaction(params, '', id)
  }
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionSoldPrice(params)
  }
}
