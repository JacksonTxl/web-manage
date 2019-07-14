import { PersonalTeamScheduleScheduleService as ScheduleService } from '../personal-team.service#/schedule.service'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { PersonalTeamScheduleCommonService as CommonService } from '../personal-team.service#/common.service'

@Injectable()
export class PersonalTeamTableService implements RouteGuard {
  constructor(private commonService: CommonService,
    private scheduleService: ScheduleService) { }

  initOptions() {
    return forkJoin(this.commonService.getCoachList(), this.commonService.getCourseList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.scheduleService.getTable(to.query)
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
