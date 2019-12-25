import { TitleService } from '@/services/title.service'
import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CrowdAPI } from '@/api/v1/crowd'
import { forkJoin } from 'rxjs'

@Injectable()
export class AddService implements Controller {
  loading$ = new State({})
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
  @Effect()
  // 新增
  setCrowdBrandField(params: any) {
    return this.crowdAPI.setCrowdBrandField(params)
  }
  // 详情
  getCrowdBrand(params: string) {
    return this.crowdAPI.getCrowdBrand(params)
  }
  @Effect()
  // 编辑
  updateCrowdBrandCrowd(id: string, params: any) {
    return this.crowdAPI.updateCrowdBrandCrowd(id, params)
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
