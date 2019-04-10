import { Store } from '@/services/store'
import { State, Computed, Action } from 'rx-state'
import { CardsApi } from '@/api/v1/cards'
import { pluck, throttleTime, switchMap, catchError, tap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { Injectable } from 'vue-service-app'
interface CardBgState {
    cardBgList: any
}
@Injectable()
export class CardBgService extends Store<CardBgState> {
    state$: State<CardBgState>
    cardBgList$: Computed<any>
    constructor(private cardsApi: CardsApi) {
      super()
      this.state$ = new State({
        cardBgList: []
      })
      this.cardBgList$ = new Computed(this.state$.pipe(pluck('cardBgList')))
      this.getCardBgList().subscribe()
    }
    getCardBgList() {
      return new Action(data$ =>
        data$.pipe(
          throttleTime(10000),
          switchMap(() =>
            this.cardsApi.getCardsBgList()
              .pipe(catchError(() => EMPTY))
          ),
          tap((res: any) => {
            console.log(res)
            this.state$.commit(state => {
              state.cardBgList = res.card_bg_list
            })
          })
        )
      )
    }
}
