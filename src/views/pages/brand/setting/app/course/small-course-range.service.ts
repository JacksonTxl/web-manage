import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, DeleteCourseCategoryInput } from '@/api/v1/setting/course'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SmallCourseRangeService implements Controller {
  resData$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:course:course_scope|add',
    edit: 'brand:course:course_scope|edit',
    del: 'brand:course:course_scope|del'
  })
  constructor(private authService: AuthService, private courseApi: CourseApi) {}
  @Effect()
  getCourseGroupRangeList(params: any) {
    return this.courseApi.getCourseGroupRangeList(params).pipe(
      tap(res => {
        this.resData$.commit(() => res)
      })
    )
  }
  deleteCourseRange(id: string) {
    return this.courseApi.deleteCourseRange(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getCourseGroupRangeList(to.meta.query)
  }
}
