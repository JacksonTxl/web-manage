import { TitleService } from '@/services/title.service'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddService {
  crowdInfo$ = new State({})
  constructor(private crowdAPI: CrowdAPI, private titleService: TitleService) {}
  // 获取列表
  getListInfo() {
    return this.crowdAPI.getCrowdBrandField().pipe(
      tap(res => {
        this.crowdInfo$.commit(() => res)
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
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    if (to.meta.query.id) {
      this.titleService.SET_TITLE('编辑人群')
    } else {
      this.titleService.SET_TITLE('新增人群')
    }
    return this.init()
  }
}
