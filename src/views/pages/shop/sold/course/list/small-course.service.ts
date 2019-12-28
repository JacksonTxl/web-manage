import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import { SmallCourseApi } from '@/api/v1/sold/small-course'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'

@Injectable()
export class SmallCourseService implements Controller {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:sold:sold_personal_course|export',
    batch_extension: 'shop:sold:sold_personal_course|batch_extension',
    batch_gift_number: 'shop:sold:sold_personal_course|batch_gift_number'
  })
  courseStatus$ = this.userService.getOptions$('sold_common.course_status', {
    addAll: true
  })
  constructor(
    private smallCourseApi: SmallCourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  @Effect()
  getList(params: any) {
    return this.smallCourseApi.getSmallCourseList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
