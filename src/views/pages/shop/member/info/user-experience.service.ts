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
export class UserExperienceService extends Store<CardsListInfoState> {
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
  getMemberSideRecord(id: any, query: any) {
    return this.cardsApi.getMemberSideRecord(id, query).pipe(
      tap(res => {
        console.log(res, '获取数据')
        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }
  getMemberSideChart(id: any) {
    return this.cardsApi.getMemberSideChart(id).pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_FOLLOW_INFO(res)
      })
    )
  }
  init(id: string) {
    return forkJoin(
      this.getMemberSideRecord(id, {
        size: 20,
        page: 1
      }),
      this.getMemberSideChart({
        id: id,
        filed: 1
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    next()
    this.init(to.meta.query.id).subscribe(() => next())
  }
}
