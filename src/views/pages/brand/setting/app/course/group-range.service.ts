import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, DeleteCourseCategoryInput } from '@/api/v1/setting/course'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class GroupRangeService implements Controller {
  resData$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:course:course_scope|add'
  })
  constructor(private authService: AuthService, private courseApi: CourseApi) {}
  @Effect()
  getCourseGroupRangeList(params: any) {
    return this.courseApi.getCourseGroupRangeList(params).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.resData$.commit(() => res)
      })
    )
  }
  deleteCourseRange(params: DeleteCourseCategoryInput) {
    return this.courseApi.deleteCourseRange(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getCourseGroupRangeList(to.meta.query)
  }
}
