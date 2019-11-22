import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CardApi } from '@/api/v1/sold/cards'
import { tap } from 'rxjs/operators'

@Injectable()
export class GivingService {
  loading$ = new State({})
  count$ = new State(0)
  constructor(private cardApi: CardApi) {}
  fetchCardNum(params: any) {
    return this.cardApi.fetchSoldCardValidNum(params).pipe(
      tap((res: any) => {
        this.count$.commit(() => res.info.count)
      })
    )
  }
  @Effect()
  setGive(params: any) {
    return this.cardApi.setCardGive(params)
  }
}
