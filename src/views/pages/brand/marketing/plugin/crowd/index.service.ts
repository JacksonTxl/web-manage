import { Injectable, ServiceRoute } from 'vue-service-app'
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
export class IndexService {
  crowdIndexInfo$ = new State({})
  crowdIndexList$ = new State([])
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:crowd|add'
  })
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {}
  // 获取列表
  @Effect()
  getListInfo() {
    return this.crowdAPI.getCrowdIndex().pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.crowdIndexInfo$.commit(() => res.info)
        this.crowdIndexList$.commit(() => res.info.list)
      })
    )
  }
  delCrowdBrandCrowd(id: string) {
    return this.crowdAPI.delCrowdBrandCrowd(id).pipe(tap())
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init()
  }
}
