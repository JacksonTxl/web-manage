import { TitleService } from '@/services/title.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

interface CrowdInfoState {
  crowdInfo: any
  followInfo: any
}
@Injectable()
export class AddService extends Store<CrowdInfoState> {
  state$: State<CrowdInfoState>
  crowdInfo$: Computed<string>
  followInfo$: Computed<string>
  constructor(private crowdAPI: CrowdAPI, private titleService: TitleService) {
    super()
    this.state$ = new State({
      crowdInfo: {},
      followInfo: {}
    })
    this.crowdInfo$ = new Computed(this.state$.pipe(pluck('crowdInfo')))
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
  }
  SET_CROWD_INFO(crowdInfo: CrowdInfoState) {
    this.state$.commit(state => {
      state.crowdInfo = crowdInfo
    })
  }
  SET_FOLLOW_INFO(followInfo: CrowdInfoState) {
    this.state$.commit(state => {
      state.followInfo = followInfo
    })
  }
  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdBrandField().pipe(
      tap(res => {
        this.SET_CROWD_INFO(res)
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
  // 编辑
  getCrowdBrandCrowd(id: string, params: any) {
    return this.crowdAPI.getCrowdBrandCrowd(id, params)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    if (to.meta.query.id) {
      this.titleService.SET_TITLE('编辑人群')
    } else {
      this.titleService.SET_TITLE('新增人群')
    }
    this.init().subscribe(() => next())
  }
}
