import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, GetCourseListInput } from '@/api/v1/sold/course'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class PackageService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_package_course|export',
    course_range: 'shop:sold:sold_package_course|batch_change_course_range'
  })
  courseStatus$ = this.userService.getOptions$('sold_common.course_status', {
    addAll: true
  })
  packageTypes$ = this.userService.getOptions$('package_course.package_type', {
    addAll: true
  })
  constructor(
    private courseApi: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetCourseListInput) {
    return this.courseApi.getCourseList(params, 'package').pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  unFreeze(id: string) {
    return this.courseApi.unFreezeCourse(id, 'package')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
