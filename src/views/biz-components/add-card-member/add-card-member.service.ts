import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddCardMemberService {
  memberList$ = new State({})
  constructor(private transactionApi: TransactionApi) {}
  @Effect()
  getMember(member: string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(
      tap((res: any) => {
        this.memberList$.commit(() => res.list)
      })
    )
  }
}
