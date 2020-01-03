import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'

@Injectable()
export class TransferService {
  loading$ = new State({})
  info$ = new State({})
  memberPaymentlist$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private smallCourseApi: SmallCourseApi,
    private transactionApi: TransactionApi
  ) {}

  @Effect()
  getCourseInfo(id: string) {
    return this.smallCourseApi.getTransferSmallCourseInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  editCourseTransfer(params: any, id: string) {
    return this.smallCourseApi.smallCourseTransfer(params, id)
  }
  @Effect()
  getCodeNumber(id: string) {
    return this.contractApi.getCodeNumber(id)
  }
  @Effect()
  getMemberPaymentList(query: { member_id: number; product_type: number }) {
    return this.transactionApi.getMemberPaymentList(query).pipe(
      tap((res: any) => {
        this.memberPaymentlist$.commit(() => res.list)
      })
    )
  }
}
