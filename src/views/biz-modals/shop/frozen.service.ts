import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberApi } from '@/api/v1/member'

interface CardsTableModelState {
  lableInfo: any
  list: []
}
@Injectable()
export class FrozenService extends Store<CardsTableModelState> {
  state$: State<CardsTableModelState>
  info$: Computed<string>
  list$: Computed<any>
  staffList$ = new State([])
  payMethodList$ = this.userService.getOptions$('member.pay_method')
  hasTransferFeeList$ = this.userService.getOptions$('member.has_transferFee')
  constructor(private memberApi: MemberApi, private userService: UserService) {
    super()
    this.state$ = new State({
      list: [],
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }

  getMemberBuy(data: any) {
    return this.memberApi.getMemberFreeze(data).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
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
  getMemberTransfer(data: any) {
    return this.memberApi.getAddMemberFreeze(data)
  }
}
