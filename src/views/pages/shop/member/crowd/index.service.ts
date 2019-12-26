import { Injectable, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements Controller {
  loading$ = new State({})
  crowdIndexInfo$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:crowd|add'
  })
  constructor(private crowdAPI: CrowdAPI, private authService: AuthService) {}

  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdShopIndex().pipe(
      tap(res => {
        res = this.authService.filter(res, 'info.list')
        this.crowdIndexInfo$.commit(() => res)
      })
    )
  }
  delCrowdBrandCrowd(id: string) {
    return this.crowdAPI.delCrowdBrandCrowd(id)
  }
  init() {
    return forkJoin(this.getListInfo())
  }
  beforeEach() {
    return this.init()
  }
}
