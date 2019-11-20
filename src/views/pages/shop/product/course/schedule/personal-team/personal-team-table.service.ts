import { PersonalTeamScheduleScheduleService as ScheduleService } from './service#/schedule.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { PersonalTeamScheduleCommonService as CommonService } from './service#/common.service'

@Injectable()
export class PersonalTeamTableService implements Controller {
  constructor(
    private commonService: CommonService,
    private scheduleService: ScheduleService,
    private authService: AuthService
  ) {}
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:personal_team_course_schedule|add',
    addBatch: 'shop:schedule:personal_team_course_schedule|batch_add',
    copy: 'shop:schedule:personal_team_course_schedule|copy'
  })
  initOptions() {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCourseList()
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.scheduleService.getTable(to.query)
  }
  beforeRouteEnter() {
    return this.initOptions()
  }
}
