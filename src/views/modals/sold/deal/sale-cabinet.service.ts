import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { TransactionApi, TransactionPriceInput } from '@/api/v1/sold/transaction'
import { tap, switchMap, catchError, debounceTime } from 'rxjs/operators'
import { forkJoin, EMPTY, Observable } from 'rxjs'
import { CabinetApi } from '@/api/v1/sold/cabinet'

@Injectable()
export class SaleCabinetService {
  info$ = new State({})
  saleList$ = new State([])
  cabinetList$ = new State([])
  memberList$ = new State([])
  loading$ = new State({})
  currentPriceAction$: Action<any>
  currentPrice$ = new State('0')
  orderAmountPriceAction$: Action<any>
  orderAmountPrice$ = new State('0')
  constructor(
    private contractApi: ContractApi,
    private cabinetApi: CabinetApi,
    private memberApi: ShopPersonalCourseApi,
    private transactionApi: TransactionApi
  ) {
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
  // 获取储物柜签单详情
  getInfo(id:string) {
    return this.transactionApi.getTransactionInfo(id, 'cabinet').pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  // 获取销售员列表
  getSaleList() {
    return this.transactionApi.getTransactionSaleList().pipe(tap((res:any) => {
      this.saleList$.commit(() => res.list)
    }))
  }
  // 获取租赁柜列表
  getCabinetList(areaId:number|string) {
    return this.cabinetApi.getCabinetList(areaId).pipe(tap((res:any) => {
      this.cabinetList$.commit(() => res.list)
    }))
  }

  // 获取租赁金额
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params).pipe(tap((res:any) => {
      this.cabinetList$.commit(() => res.list)
    }))
  }

  // 获取初始数据
  @Effect()
  init(id:string, areaId:number|string) {
    return forkJoin(this.getInfo(id), this.getSaleList(), this.getCabinetList(areaId))
  }

  // 获取会员列表
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  // 获取定金列表
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id)
  }
  // 生成合同编号
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
  @Effect()
  setTransaction(params:any) {
    return this.transactionApi.setTransaction(params, 'cabinet')
  }
  @Effect()
  setTransactionPay(params:any) {
    return this.transactionApi.setTransaction(params, 'cabinet')
  }
}
