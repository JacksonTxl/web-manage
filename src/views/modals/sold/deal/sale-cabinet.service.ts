import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'
import { forkJoin } from 'rxjs'
import { ContractApi } from '@/api/v1/setting/contract'

@Injectable()
export class SaleCabinetService {
  info$ = new State({})
  loading$ = new State({})
  memberList$ = new State({})
  saleList$ = new State({})
  constructor(private contractApi: ContractApi, private transactionApi: TransactionApi, private memberApi: ShopPersonalCourseApi) {}
  getInfo(id:string) {
    return this.transactionApi.getTransactionCabinetInfo(id).pipe(tap((res:any) => {
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
  getMember(member:string) {
    return this.memberApi.getMemberList(member).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getCodeNumber() {
    return this.contractApi.getCodeNumber('5')
  }
  @Effect()
  getAdvanceList(id:string|number) {
    return this.transactionApi.getTransactionAdvanceList(id)
  }

  setAdvance(params:any) {
    return this.transactionApi.setAdvance(params)
  }
}
