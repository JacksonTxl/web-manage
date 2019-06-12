import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap } from 'rxjs/operators'
import { ContractApi } from '@/api/v1/setting/contract'
import { CardApi, TransferCardInput } from '@/api/v1/sold/cards'
import moment from 'moment'
import { TransactionApi, MemberListInput } from '@/api/v1/sold/transaction'

@Injectable()
export class TransferService {
  loading$ = new State({})
  memberList$ = new State([])
  depositTransferInfo$ = new State({})
  memberTransferInfo$ = new State({})
  timeScope$ = new State({})
  payList$ = new State([])
  constructor(private contractApi:ContractApi, private transactionApi: TransactionApi, private cardApi:CardApi) {}
  @Effect()
  getMember(query:MemberListInput) {
    return this.transactionApi.getTransactionMemeberList(query).pipe(tap((res:any) => {
      this.memberList$.commit(() => res.list)
    }))
  }
  @Effect()
  getTransferInfo(id:string, type:string) {
    return this.cardApi.getCardTransferInfo(id, type).pipe(tap((res:any) => {
      if (type === 'member') {
        this.memberTransferInfo$.commit(() => res.info)
        this.timeScope$.commit(() => {
          return moment(res.info.end_time).valueOf() - Date.now()
        })
      } else if (type === 'deposit') {
        this.depositTransferInfo$.commit(() => res.info)
      }
    }))
  }
  @Effect()
  editCardTransfer(params:TransferCardInput, id:string, type:string) {
    return this.cardApi.editCardTransfer(params, id, type)
  }
  @Effect()
  getCodeNumber(id:string) {
    return this.contractApi.getCodeNumber(id)
  }
  @Effect()
  getPayList(id:string) {
    return this.transactionApi.getPaymentMethodList(id).pipe(tap((res:any) => {
      this.payList$.commit(() => res.list)
    }))
  }
}
