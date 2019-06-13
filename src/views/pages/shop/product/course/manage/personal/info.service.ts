import { State, Computed } from 'rx-state/src'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { ShopPersonalCourseApi, GetInfoInput } from '@/api/v1/course/personal/shop'
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'
export interface SetState {
  info: any
}
@Injectable()
export class InfoService implements RouteGuard {
  state$: State<SetState>
  info$: Computed<any>
  constructor(
    private courseApi: ShopPersonalCourseApi,
    private layoutBrand: LayoutBrandService
  ) {
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  SET_TEAM_COURSE_INFO(data: any) {
    this.state$.commit(state => {
      state.info = data.info
    })
  }
  getInfo(query: GetInfoInput) {
    return this.courseApi.getInfo(query).pipe(tap(res => {
      this.SET_TEAM_COURSE_INFO(res)
    }))
  }
  initPageBreadcrumbs() {
    this.layoutBrand.SET_BREADCRUMBS([
      {
        label: '私教课列表',
        route: { name: 'shop-product-course-manage-personal-list' }
      }
    ])
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    this.initPageBreadcrumbs()
    return this.getInfo(to.meta.query)
  }
}
