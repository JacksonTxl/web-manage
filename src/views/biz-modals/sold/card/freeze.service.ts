import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi, FreezeCardInput } from '@/api/v1/sold/cards'
import { tap, switchMap } from 'rxjs/operators'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { OPERATION_TYPES } from '@/constants/sold/operations'

@Injectable()
export class FreezeService {
  freezeInfo$ = new State({})
  loading$ = new State({})
  memberPaymentlist$ = new State({})
  constructor(
    private cardApi: CardApi,
    private transactionApi: TransactionApi
  ) {}
  @Effect()
  getFreezeInfo(id: string) {
    return this.cardApi.getMemberFreezeInfo(id).pipe(
      tap((res: any) => {
        this.freezeInfo$.commit(() => res.info)
      }),
      switchMap((res: any) => {
        return this.getMemberPaymentList({
          operation_type: OPERATION_TYPES.FREEZE,
          member_id: res.info.member_id,
          product_type: res.info.product_type
        })
      })
    )
  }
  @Effect()
  freeze(params: FreezeCardInput, id: string) {
    return this.cardApi.editMemberFreeze(params, id)
  }
  @Effect()
  getMemberPaymentList(query: {
    operation_type: number
    member_id: number
    product_type: number
  }) {
    return this.transactionApi.getMemberPaymentList(query).pipe(
      tap((res: any) => {
        this.memberPaymentlist$.commit(() => res.list)
      })
    )
  }
}
