import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  BrandPersonalCourseApi,
  GetCourseEditInput,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/brand'
import { forkJoin } from 'rxjs'
import { UserService } from '@/services/user.service'
@Injectable()
export class EditService implements RouteGuard {
  info$ = new State({})
  loading$ = new State({})
  shopSetting$ = this.userService.getOptions$('personal_course.shop_setting')
  constructor(
    protected courseApi: BrandPersonalCourseApi,
    private userService: UserService
  ) {}
  getCourseEdit(query: GetCourseEditInput) {
    return this.courseApi.getCourseEdit(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  updateCourse(params: SetCourseInput) {
    return this.courseApi.updateCourse(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.courseApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.courseApi.setPrice(params)
  }
  init(query: GetCourseEditInput) {
    return forkJoin([this.getCourseEdit(query)])
  }
  beforeRouteEnter(to: ServiceRoute) {
    const course_id = to.meta.query.id || to.query.courseId
    return this.init({ course_id })
  }
}
