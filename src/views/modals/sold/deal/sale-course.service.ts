import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi, MemberCouponParams } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { forkJoin } from 'rxjs'

@Injectable()
export class SaleCourseService {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  couponList$ = new State({})
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
    return this.transactionApi.getTransactionCouponList(params, 'package').pipe(tap((res:any) => {
      this.couponList$.commit(() => res.list)
    }))
  }
  @Effect()
  serviceInit(id:string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
  @Effect()
  setTransaction(params:any) {
    return this.transactionApi.setTransaction(params, 'package')
  }
}
