import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

interface CrowdIndexState {
  crowdIndexInfo: any
}
@Injectable()
export class IndexService extends Store<CrowdIndexState> implements RouteGuard {
  state$: State<CrowdIndexState>
  crowdIndexInfo$: Computed<string>
  auth$: Computed<any>
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {
    super()
    this.state$ = new State({
      crowdIndexInfo: {},
      auth: {
        add: this.authService.can('shop:member:crowd|add')
      }
    })
    this.crowdIndexInfo$ = new Computed(this.state$.pipe(pluck('crowdIndexInfo')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }

  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdShopIndex().pipe(
      tap(res => {
        res = this.authService.filter(res, 'info.list')
        this.state$.commit(state => {
          state.crowdIndexInfo = res
        })
      })
    )
  }
  delCrowdBrandCrowd(id: string) {
    return this.crowdAPI.delCrowdBrandCrowd(id)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
