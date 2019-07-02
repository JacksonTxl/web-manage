import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { ShopPersonalCourseApi, GetPersonalBrandCourseListInput } from '@/api/v1/course/personal/shop'
import { tap, pluck } from 'rxjs/operators'
import { State, Computed } from 'rx-state'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ShopService implements RouteGuard {
  state$: State<any>
  personalCourseList$: Computed<any>
  auth$: Computed<object>
  constructor(
    private shopPersonalCourseApi: ShopPersonalCourseApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      personalCourseList: [],
      auth: {
        transfer: this.authService.can('brand_shop:product:personal_course|transfer')
      }
    })
    this.personalCourseList$ = new Computed(this.state$.pipe(pluck('personalCourseList')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  SET_PERSONAL_COURSE_LIST(data: any) {
    this.state$.commit(state => {
      state.personalCourseList = data.list
    })
  }
  upgradePersonalCourseInBrand(res: any) {
    return this.shopPersonalCourseApi.upgradePersonalCourseInBrand(res)
  }
  getCourseListInShop(params: any) {
    return this.shopPersonalCourseApi.getCourseListInBrand(params).pipe(
      tap(state => {
        state = this.authService.filter(state)
        this.SET_PERSONAL_COURSE_LIST(state)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseListInShop({ size: 99, ...to.query }).subscribe(() => next())
  }
}
