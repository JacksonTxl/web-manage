import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'

interface CardsListInfoState {
  cardsListInfo: any
  followInfo: any
}
@Injectable()
export class SoldService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  followInfo$: Computed<string>
  constructor(private cardsApi: MemberAPi) {
    super()
    this.state$ = new State({
      cardsListInfo: {},
      followInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
  }
  SET_CARDS_LIST_INFO(cardsListInfo: CardsListInfoState) {
    console.log(cardsListInfo)
    this.state$.commit(state => {
      state.cardsListInfo = cardsListInfo
    })
  }
  getMemberReserve(id: string, params: any) {
    return this.cardsApi.getMemberReserve(id, params).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }

  init(id: string, params: any) {
    return forkJoin(this.getMemberReserve(id, params))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id, {
      start_date: '',
      reserve_type: 1,
      reserve_status: 0,
      checkin_status: 0,
      size: 20,
      page: 1
    }).subscribe(() => next())
  }
}
