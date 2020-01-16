import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements Controller {
  crowdIndexInfo$ = new State({})
  crowdIndexList$ = new State([])
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:member:crowd|add'
  })
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {}
  // 获取列表
  @Effect()
  getListInfo() {
    return this.crowdAPI.getCrowdIndex().pipe(
      tap(res => {
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
