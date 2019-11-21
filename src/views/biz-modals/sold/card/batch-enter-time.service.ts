import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class BatchEnterTimeService {
  loading$ = new State({})
  count$ = new State(0)
  inoutTypes$ = this.userService.getOptions$('member_card.inout_type')
  constructor(private cardApi: CardApi, private userService: UserService) {}
  fetchCardNum(params: any) {
    return this.cardApi.fetchSoldCardValidNum(params).pipe(
      tap((res: any) => {
        this.count$.commit(() => res.info.count)
      })
    )
  }
  @Effect()
  setCardEnterTime(params: any) {
    return this.cardApi.setCardEnterTime(params)
  }
}
