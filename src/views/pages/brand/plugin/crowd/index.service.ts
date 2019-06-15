import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

interface CrowdIndexState {
  crowdIndexInfo: any
}
@Injectable()
export class IndexService extends Store<CrowdIndexState> {
  state$: State<CrowdIndexState>
  crowdIndexInfo$: Computed<string>
  constructor(private crowdAPI: CrowdAPI) {
    super()
    this.state$ = new State({
      crowdIndexInfo: {}
    })
    this.crowdIndexInfo$ = new Computed(this.state$.pipe(pluck('crowdIndexInfo')))
  }
  SET_CROWD_INDEX_INFO(crowdIndexInfo: CrowdIndexState) {
    console.log(crowdIndexInfo)
    this.state$.commit(state => {
      state.crowdIndexInfo = crowdIndexInfo
    })
  }
  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdIndex().pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_CROWD_INDEX_INFO(res)
      })
    )
  }
  delCrowdBrandCrowd(id: string) {
    return this.crowdAPI.delCrowdBrandCrowd(id)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => next())
  }
}
