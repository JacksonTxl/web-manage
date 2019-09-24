import { Injectable } from 'vue-service-app'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { Effect, State, Action, Computed } from 'rx-state'
import { then } from '@/operators'
import { debounceTime, switchMap, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs'

@Injectable()
export class MemberSearchService {
  memberList$ = new State([])
  loading$ = new State({})
  type$ = new State('')
  getMemberAction$ = new Action<string>(action$ =>
    action$.pipe(
      debounceTime(500),
      switchMap(searchText =>
        this.getMemberRequest(searchText).pipe(catchError(() => EMPTY))
      )
    )
  )

  constructor(private transactionApi: TransactionApi) {}
  SET_TYPE(type: string) {
    this.type$.commit(() => type)
  }
  RESET_LIST() {
    this.memberList$.commit(() => [])
  }
  getTransactionMember(member: string, type: number) {
    return this.transactionApi.getMemberList(member, type).pipe(
      then((res: any) => {
        this.memberList$.commit(() => res.list)
        return res.list
      })
    )
  }
  @Effect()
  getMemberRequest(searchText: string) {
    switch (this.type$.snapshot()) {
      case 'transaction':
        return this.getTransactionMember(searchText, 1)
      default:
        throw new Error('member-search.service should pass type')
    }
  }
  getMember(searchText: string) {
    this.getMemberAction$.dispatch(searchText)
  }
}
