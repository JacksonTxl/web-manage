import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'

@Injectable()
export class FrozenService {
  loading$ = new State({})
  list$ = new State([])
  staffList$ = new State([])
  payMethodList$ = this.userService.getOptions$('member.pay_method')
  hasTransferFeeList$ = this.userService.getOptions$('member.has_transferFee')
  constructor(private memberApi: MemberApi, private userService: UserService) {}
  @Effect()
  getMemberBuy(data: any) {
    return this.memberApi.getMemberFreeze(data).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getMemberList(key_word: string) {
    return this.memberApi.getSearchMemberList({ key_word }).pipe(
      tap((res: any) => {
        this.staffList$.commit(() => res.list)
      })
    )
  }
  @Effect()
  getMemberTransfer(data: any) {
    return this.memberApi.getAddMemberFreeze(data)
  }
}
