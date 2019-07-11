import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

interface AnalysisInfoState {
  analysisInfo: any
}
@Injectable()
export class AnalysisService extends Store<AnalysisInfoState> {
  state$: State<AnalysisInfoState>
  analysisInfo$: Computed<string>
  constructor(private crowdAPI: CrowdAPI) {
    super()
    this.state$ = new State({
      analysisInfo: {}
    })
    this.analysisInfo$ = new Computed(this.state$.pipe(pluck('analysisInfo')))
  }
  SET_ANALYSIS_INFO(analysisInfo: AnalysisInfoState) {
    this.state$.commit(state => {
      state.analysisInfo = analysisInfo
    })
  }
  // 获取列表
  getListInfo(id: string) {
    return this.crowdAPI.getCrowdBrandAnalysis(id).pipe(
      tap(res => {
        this.SET_ANALYSIS_INFO(res)
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
