import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'
import { ContractApi } from '@/api/v1/setting/contract'
import {
  TransactionApi,
  MemberCouponParams,
  TransactionPriceInput
} from '@/api/v1/sold/transaction'

@Injectable()
export class ChangeService {
  info$ = new State({})
  loading$ = new State({})
  smallCourseList$ = new State([])
  couponList$ = new State([])
  saleList$ = new State([])
  advanceList$ = new State([])
  priceAction$: Action<any>
  priceInfo$ = new State('0')
  constructor(
    private contractApi: ContractApi,
    private smallCourseApi: SmallCourseApi,
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
    return this.smallCourseApi.getSmallCourseChange(id).pipe(
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
  @Effect()
  serviceInit(id: string) {
    return forkJoin(this.getInfo(id), this.getSaleList()).pipe(
      switchMap((res: any) => {
        return this.getAdvanceList(res[0].info.member_id)
      })
    )
  }
  @Effect()
  getSmallCourseList(search: string) {
    return this.smallCourseApi.getSmallCourseSelectList(search).pipe(
      tap((res: any) => {
        this.smallCourseList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getCodeNumber(id: string) {
    return this.contractApi.getCodeNumber(id)
  }
  // 优惠券列表
  @Effect()
  getCouponList(query: MemberCouponParams) {
    return this.transactionApi.getTransactionCouponList(query, 'member')
  }
  // 定金
  @Effect()
  getAdvanceList(id: string | number) {
    return this.transactionApi.getTransactionAdvanceList(id).pipe(
      tap((res: any) => {
        this.advanceList$.commit(() => res.list)
      })
    )
  }
  // 小计
  @Effect()
  getPrice(params: TransactionPriceInput) {
    return this.transactionApi.getTransactionPrice(params)
  }
  // 下单
  @Effect()
  changeSmallCourse(params: any, id: string) {
    return this.smallCourseApi.changeSmallCourse(params, id)
  }
  // 下单并支付
  @Effect()
  changeSmallCoursePay(params: any, id: string) {
    return this.smallCourseApi.changeSmallCourse(params, id)
  }
}
