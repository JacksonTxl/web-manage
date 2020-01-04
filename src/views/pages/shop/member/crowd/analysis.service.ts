import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

@Injectable()
export class AnalysisService {
  loading$ = new State({})
  analysisInfo$ = new State({})
  constructor(private crowdAPI: CrowdAPI) {}
  // 获取列表
  getListInfo(id: string) {
    return this.crowdAPI.getCrowdShopAnalysis(id).pipe(
      tap(res => {
        this.analysisInfo$.commit(() => res)
      })
    )
  }

  init(id: string) {
    return forkJoin(this.getListInfo(id))
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
