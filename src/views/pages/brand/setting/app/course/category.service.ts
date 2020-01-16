import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, DeleteCourseCategoryInput } from '@/api/v1/setting/course'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CategoryService implements Controller {
  resData$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:course:course_type|add'
  })
  constructor(private authService: AuthService, private courseApi: CourseApi) {}
  @Effect()
  getCourseCategoryList() {
    return this.courseApi.getCourseCategoryList().pipe(
      tap(res => {
        this.resData$.commit(() => res)
      })
    )
  }
  deleteCourseCategory(params: DeleteCourseCategoryInput) {
    return this.courseApi.deleteCourseCategory(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getCourseCategoryList()
  }
}
