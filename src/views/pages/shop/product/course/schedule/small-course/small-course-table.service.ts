import { SmallCourseScheduleService as ScheduleService } from './service#/schedule.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin } from 'rxjs'
import { SmallCourseScheduleCommonService as CommonService } from './service#/common.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SmallCourseTableService implements Controller {
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

  initOptions() {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCourseList('')
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return forkJoin(this.initOptions(), this.scheduleService.getTable(to.query))
  }
  beforeRouteEnter() {
    return this.initOptions()
  }
}
