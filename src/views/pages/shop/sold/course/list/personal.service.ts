import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, GetCourseListInput } from '@/api/v1/sold/course'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class PersonalService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  total$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_personal_course|export',
    batch_extension: 'shop:sold:sold_personal_course|batch_extension',
    batch_gift_number: 'shop:sold:sold_personal_course|batch_gift_number'
  })
  courseStatus$ = this.userService.getOptions$('sold_common.course_status', {
    addAll: true
  })
  constructor(
    private courseApi: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: GetCourseListInput) {
    return this.courseApi.getCourseList(params, 'personal').pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  unFreeze(id: string) {
    return this.courseApi.unFreezeCourse(id, 'personal')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
