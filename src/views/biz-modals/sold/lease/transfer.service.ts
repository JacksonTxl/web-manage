import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { CabinetApi } from '@/api/v1/sold/cabinet'
import { OPERATION_TYPES } from '@/constants/sold/operations'
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
      }),
      switchMap((res: any) => {
        return this.getPayList({
          member_id: res.info.member_id,
          product_type: res.info.product_type,
          operation_type: OPERATION_TYPES.TRANSFORM
        })
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
  getPayList(params: any) {
    return this.transactionApi.getMemberPaymentList(params).pipe(
      tap((res: any) => {
        this.payList$.commit(() => res.list)
      })
    )
  }
}
