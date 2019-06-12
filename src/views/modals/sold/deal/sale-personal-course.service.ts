import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi, MemberCouponParams } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { forkJoin } from 'rxjs'

@Injectable()
export class SalePersonalCourseService {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  couponList$ = new State({})
  coachList$ = new State({})
  personalPrice$ = new State({})
  constructor(private contractApi: ContractApi, private memberApi: ShopPersonalCourseApi, private transactionApi: TransactionApi) {}
  getInfo(id:string) {
    return this.transactionApi.getTransactionInfo(id, 'package/course').pipe(tap((res:any) => {
      this.info$.commit(() => res.info)
    }))
  }
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
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
    return this.transactionApi.getTransactionCouponList(params, 'personal').pipe(tap((res:any) => {
      this.couponList$.commit(() => res.list)
    }))
  }
  getCoachList(level: number) {
    return this.transactionApi.getTransactionCoachList(level).pipe(tap((res:any) => {
      this.coachList$.commit(() => res.list)
    }))
  }
  @Effect()
  getPersonalPriceInfo(params: {id: number, buy_num: number, coach_level_id: number}) {
    return this.transactionApi.getPersonalCoursePrice(params).pipe(tap((res:any) => {
      this.personalPrice$.commit(() => res.list)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id), this.getSaleList(), this.getCoachList(0))
  }
  @Effect()
  setTransactionOrder(params:any) {
    return this.transactionApi.setTransaction(params, 'personal')
  }
  @Effect()
  setTransactionPay(params:any) {
    return this.transactionApi.setTransaction(params, 'personal')
  }
}
