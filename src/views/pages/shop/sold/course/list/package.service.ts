import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, GetCourseListInput } from '@/api/v1/sold/course'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class PackageService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_package_course|export'
  })
  courseStatus$ = this.userService.getOptions$('sold.course_status').pipe(
    tap(list => {
      list.unshift({ value: -1, label: '全部' })
    })
  )
  constructor(
    private courseApi: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
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
