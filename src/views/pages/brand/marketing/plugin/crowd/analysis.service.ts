import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { CrowdAPI } from '@/api/v1/crowd'

@Injectable()
export class AnalysisService {
  analysisInfo$ = new State({})
  constructor(private crowdAPI: CrowdAPI) {}
  // 获取列表
  getListInfo(id: string) {
    return this.crowdAPI.getCrowdBrandAnalysis(id).pipe(
      tap(res => {
        this.analysisInfo$.commit(() => res.info)
      })
    )
  }

  init(id: string) {
    return this.getListInfo(id)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
