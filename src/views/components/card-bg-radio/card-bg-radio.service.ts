import { Store } from '@/services/store'
import { State, Computed, Action } from 'rx-state'
import { CardsApi } from '@/api/v1/cards'
import { pluck, throttleTime, switchMap, catchError, tap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { Injectable } from 'vue-service-app'
let className = ['', 'first custom', 'second custom', 'third custom', 'fourth custom']
interface CardBgState {
    cardBgList: any
}
@Injectable()
export class CardBgService extends Store<CardBgState> {
    state$: State<CardBgState>
    cardBgList$: Computed<any>
    getCardBgListAction$: Action<null>
    constructor(private cardsApi: CardsApi) {
      super()
      this.state$ = new State({
        cardBgList: []
      })
      this.cardBgList$ = new Computed(this.state$.pipe(pluck('cardBgList')))
      this.getCardBgListAction$ = new Action(action$ =>
        action$.pipe(
          throttleTime(1000),
          switchMap(() =>
            this.cardsApi.getCardsBgList()
              .pipe(catchError(() => EMPTY))
          ),
          tap((res: any) => {
            this.state$.commit(state => {
              res.card_bg_list.forEach((i:any) => {
                i.className = className[i.index]
                i.id = 0
              })
              state.cardBgList = res.card_bg_list
            })
          })
        )
      )
      // 先缓存
      this.getCardBgListAction$.dispatch()
    }
}
