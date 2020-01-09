import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { TransactionApi } from '@/api/v1/sold/transaction'
import { Effect, State, Action } from 'rx-state'
import { then } from '@/operators'
import { debounceTime, switchMap, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class MemberSearchService {
  memberList$ = new State([])
  loading$ = new State({})
  type$ = new State('')
  getMemberAction$ = new Action<object>(action$ =>
    action$.pipe(
      debounceTime(500),
      switchMap((params: any) =>
        this.getMemberRequest(params).pipe(catchError(() => EMPTY))
      )
    )
  )
  parent_types$ = this.userService.getOptions$('small_course.parent_type')
  constructor(
    private transactionApi: TransactionApi,
    private userService: UserService,
    private memberApi: MemberApi
  ) {}
  SET_TYPE(type: string) {
    this.type$.commit(() => type)
  }
  RESET_LIST() {
    this.memberList$.commit(() => [])
  }
  getTransactionMember(params: any) {
    return this.transactionApi.getMemberList(params.member, params.type).pipe(
      then((res: any) => {
        this.memberList$.commit(() => res.list)
        return res.list
      })
    )
  }
  getTransfer(params: any) {
    return this.transactionApi.getTransactionMemeberList(params).pipe(
      then((res: any) => {
        this.memberList$.commit(() => res.list)
        return res.list
      })
    )
  }
  @Effect()
  getMemberRequest(params: any) {
    switch (this.type$.snapshot()) {
      case 'transaction':
        return this.getTransactionMember(params)
      case 'transfer':
        return this.getTransfer(params)
      default:
        throw new Error('member-search.service should pass type')
    }
  }
  getMember(member: string, type: number) {
    this.getMemberAction$.dispatch({
      member,
      type
    })
  }
  getParentInfoByPhone(params: any) {
    return this.memberApi.getParentInfoByPhone(params)
  }
}
