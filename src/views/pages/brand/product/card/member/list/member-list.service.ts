import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CardsApi } from '@/api/v1/cards'
import { AuthService } from '@/services/auth.service'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class MemberListService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  auth$: Computed<object>
  constructor(
    private cardsApi: CardsApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      cardsListInfo: {},
      auth: {
        add: this.authService.can('brand_shop:product:member_card|add')
      }
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_CARDS_LIST_INFO(cardsListInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.cardsListInfo = cardsListInfo
    })
  }
  @Effect()
  getListInfo(paramsObj: any) {
    return this.cardsApi.getCardsList(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
      })
    )
  }
  @Effect()
  getCardsSaleStopReason(id: string) {
    return this.cardsApi.getCardsSaleStopReason(id)
  }
  @Effect()
  beforeRouteUpdate(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.meta.query).subscribe(res => {
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getListInfo(to.meta.query ? to.meta.query : {}).subscribe(res => {
      console.log(res, '获取数据')
      this.SET_CARDS_LIST_INFO(res)
      next()
    })
  }
}
