import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { Observable, EMPTY } from 'rxjs'

@Injectable()
export class AddCardMemberService {
  memberList$ = new State({})
  memberListAction$: Action<any>
  constructor(private transactionApi: TransactionApi) {
    this.memberListAction$ = new Action(data$ => {
      return data$.pipe(
        this.debounceMap(),
        tap(res => {
          this.memberList$.commit(() => res.list)
        })
      )
    })
  }
  debounceMap() {
    return (stream$: Observable<any>) =>
      stream$.pipe(
        debounceTime(200),
        switchMap((member: string, type: number) =>
          this.getMember(member, type).pipe(catchError(() => EMPTY))
        )
      )
  }
  @Effect()
  getMember(member: string, type: number) {
    return this.transactionApi.getMemberList(member, type)
  }
}
