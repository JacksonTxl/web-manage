import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { CardApi, TransferCardInput } from '@/api/v1/sold/cards'
import moment from 'moment'
import { OPERATION_TYPES } from '@/constants/sold/operations'
import { TransactionApi, MemberListInput } from '@/api/v1/sold/transaction'
import { of } from 'rxjs'

@Injectable()
export class TransferService {
  loading$ = new State({})
  memberList$ = new State([])
  depositTransferInfo$ = new State({})
  memberTransferInfo$ = new State({})
  timeScope$ = new State({})
  payList$ = new State([])
  info$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private transactionApi: TransactionApi,
    private cardApi: CardApi
  ) {}
  @Effect()
  getMember(query: MemberListInput) {
    return this.transactionApi.getTransactionMemeberList(query).pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getTransferInfo(id: string, type: string) {
    return this.cardApi.getCardTransferInfo(id, type).pipe(
      tap((res: any) => {
        if (type === 'member') {
          this.memberTransferInfo$.commit(() => res.info)
          this.timeScope$.commit(() => {
            return moment(res.info.end_time).valueOf() - Date.now()
          })
          this.info$.commit(() => res.info)
        } else if (type === 'deposit') {
          this.depositTransferInfo$.commit(() => res.info)
        }
      }),
      switchMap((res: any) => {
        return this.getPayList({
          member_id: res.info.member_id,
          product_type: 1,
          operation_type: OPERATION_TYPES.TRANSFORM
        })
      })
    )
  }
  @Effect()
  editCardTransfer(params: TransferCardInput, id: string, type: string) {
    return this.cardApi.editCardTransfer(params, id, type)
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
