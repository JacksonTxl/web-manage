import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { ShopPersonalCourseApi } from '@/api/v1/course/personal/shop'

@Injectable()
export class SaleDepositeCardService {
  loading$ = new State({})
  info$ = new State({})
  memberList$ = new State({})
  constructor(private contractApi: ContractApi, private memberApi: ShopPersonalCourseApi, private transactionApi: TransactionApi) {}
  @Effect()
  getInfo(id:string) {
    return this.transactionApi.getTransactionCardInfo(id, 'deposit').pipe(tap((res:any) => {
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
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
}
