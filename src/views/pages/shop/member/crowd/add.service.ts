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
  constructor(private crowdAPI: CrowdAPI) {
    super()
    this.state$ = new State({
      crowdInfo: {},
      followInfo: {}
    })
    this.crowdInfo$ = new Computed(this.state$.pipe(pluck('crowdInfo')))
    this.followInfo$ = new Computed(this.state$.pipe(pluck('followInfo')))
  }
  SET_CROWD_INFO(crowdInfo: CrowdInfoState) {
    console.log(crowdInfo)
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
    return this.crowdAPI.getCrowdShopField().pipe(
      tap(res => {
        console.log(res, '获取数据')

        this.SET_CROWD_INFO(res)
      })
    )
  }
  // 新增
  setCrowdBrandField(params: any) {
    return this.crowdAPI.setCrowdShopField(params)
  }
  // 详情
  getCrowdBrand(params: string) {
    return this.crowdAPI.getCrowdShop(params)
  }
  // 编辑
  getCrowdBrandCrowd(id: string, params: any) {
    return this.crowdAPI.getCrowdShopCrowd(id, params)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(() => next())
  }
}
