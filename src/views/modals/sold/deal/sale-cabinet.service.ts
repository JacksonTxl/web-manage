import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class SaleCabinetService {
  info$ = new State({})
  loading$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  constructor(private contractApi: ContractApi, private memberApi: ShopPersonalCourseApi, private transactionApi: TransactionApi) {}
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
  // 获取会员列表
  @Effect()
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  // 生成合同编号
  @Effect()
  getCodeNumber() {
    return this.contractApi.getCodeNumber('4')
  }
  // 获取定金列表
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id)
  }
  @Effect()
  init(id:string) {
    return forkJoin(this.getInfo(id), this.getSaleList())
  }
}
