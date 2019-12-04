import { Injectable } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class ChangeMemberService {
  loading$ = new State({})
  info$ = new State({})
  constructor(private cardApi: CardApi) {}
  getInfo(id: string) {
    return this.cardApi.getCardInfo(id, 'member').pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }

  @Effect()
  changeCardMember(id: number, params: any) {
    return this.cardApi.changeCardMember(id, params)
  }
}
