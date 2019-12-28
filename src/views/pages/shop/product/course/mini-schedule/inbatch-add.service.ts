import { AuthService } from '@/services/auth.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin } from 'rxjs'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'

@Injectable()
export class InbatchAddService implements Controller {
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:team_course_schedule|add'
  })

  constructor(
    private smallCourseScheduleCommonService: SmallCourseScheduleCommonService,
    private authService: AuthService
  ) {}

  init() {
    return forkJoin(
      this.smallCourseScheduleCommonService.getCoachList(),
      this.smallCourseScheduleCommonService.getCourseList({
        schedule_status: 1
      }),
      this.smallCourseScheduleCommonService.getCourtList()
    )
  }
  beforeRouteEnter() {
    console.log('beforeRouteEnter')
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    console.log(123)
    return this.init()
  }
}
