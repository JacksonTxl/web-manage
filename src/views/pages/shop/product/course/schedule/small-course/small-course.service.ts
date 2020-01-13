import { AuthService } from '@/services/auth.service'
import { SmallCourseScheduleService as ScheduleService } from './service#/schedule.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin } from 'rxjs'
import { SmallCourseScheduleCommonService as CommonService } from './service#/common.service'

@Injectable()
export class SmallCourseService implements Controller {
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:small_class_course_schedule|add',
    eidt: 'shop:schedule:small_class_course_schedule|batch_edit',
    getInfo: 'shop:schedule:small_class_course_schedule|get'
  })

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {}

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.scheduleService.getList(to.meta.query)
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute) {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCourseList(''),
      this.commonService.getCourtList()
    )
  }
}
