import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

interface CardsListInfoState {
  cardsListInfo: any
  followInfo: any
}
@Injectable()
export class AddService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  followInfo$: Computed<string>
  constructor(private crowdAPI: CrowdAPI) {
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
  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdBrandField().pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }
  // 新增
  setCrowdBrandField(params: any) {
    return this.crowdAPI.setCrowdBrandField(params)
  }
  // 详情
  getCrowdBrand(params: string) {
    return this.crowdAPI.getCrowdBrand(params)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => next())
  }
}
