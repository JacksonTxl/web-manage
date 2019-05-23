import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

interface CardsListInfoState {
  cardsListInfo: any
}
@Injectable()
export class AnalysisService extends Store<CardsListInfoState> {
  state$: State<CardsListInfoState>
  cardsListInfo$: Computed<string>
  constructor(private crowdAPI: CrowdAPI) {
    super()
    this.state$ = new State({
      cardsListInfo: {}
    })
    this.cardsListInfo$ = new Computed(this.state$.pipe(pluck('cardsListInfo')))
  }
  SET_CARDS_LIST_INFO(cardsListInfo: CardsListInfoState) {
    console.log(cardsListInfo)
    this.state$.commit(state => {
      state.cardsListInfo = cardsListInfo
    })
  }
  // 获取列表
  getListInfo(id: string) {
    return this.crowdAPI.getCrowdBrandAnalysis(id).pipe(
      tap(res => {
        this.SET_CARDS_LIST_INFO(res)
      })
    )
  }

  init(id: string) {
    return forkJoin(this.getListInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init(to.meta.query.id).subscribe(() => next())
  }
}
