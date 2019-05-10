import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { MemberAPi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class FollowHistoryService extends Store<CardsListInfoState> {
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
  SET_FOLLOW_INFO(followInfo: CardsListInfoState) {
    this.state$.commit(state => {
      state.followInfo = followInfo
    })
  }
  getListInfo(id: any) {
    return this.cardsApi.getMemberFollowRecord(id).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }
  getFollowInfo(id: any) {
    return this.cardsApi.getMemberFollow(id).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_FOLLOW_INFO(res)
      })
    )
  }
  init(id: string) {
    return forkJoin(this.getListInfo(id), this.getFollowInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id).subscribe(() => next())
  }
}
