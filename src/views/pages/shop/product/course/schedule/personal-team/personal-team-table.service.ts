import { PersonalTeamScheduleScheduleService as ScheduleService } from './service#/schedule.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { PersonalTeamScheduleCommonService as CommonService } from './service#/common.service'

@Injectable()
export class PersonalTeamTableService implements Controller {
  constructor(
    private commonService: CommonService,
    private scheduleService: ScheduleService
  ) {}
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
