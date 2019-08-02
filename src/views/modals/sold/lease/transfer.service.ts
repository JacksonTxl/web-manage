import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { CabinetApi } from '@/api/v1/sold/cabinet'
import moment from 'moment'
import { TransactionApi, MemberListInput } from '@/api/v1/sold/transaction'

@Injectable()
export class TransferService {
  loading$ = new State({})
  memberList$ = new State([])
  info$ = new State({})
  timeScope$ = new State({})
  payList$ = new State([])
  constructor(
    private contractApi: ContractApi,
    private transactionApi: TransactionApi,
    private cabinetApi: CabinetApi
  ) {}
  @Effect()
  getMember(query: MemberListInput) {
    return this.transactionApi.getTransactionMemeberList(query).pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  getDetail(id: number) {
    return this.cabinetApi.getDetail(id, 'transfer').pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  setTransaction(params: any, id: number) {
    return this.cabinetApi.setTransaction(params, 'transfer', id)
  }
  @Effect()
  getCodeNumber(id: string) {
    return this.contractApi.getCodeNumber(id)
  }
  @Effect()
  getPayList(id: string) {
    return this.transactionApi.getPaymentMethodList(id).pipe(
      tap((res: any) => {
        this.payList$.commit(() => res.list)
      })
    )
  }
}
