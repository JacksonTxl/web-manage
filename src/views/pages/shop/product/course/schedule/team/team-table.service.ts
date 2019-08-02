import { TeamScheduleScheduleService as ScheduleService } from '../team.service#/schedule.service'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { TeamScheduleCommonService as CommonService } from '../team.service#/common.service'

@Injectable()
export class TeamTableService implements RouteGuard {
  constructor(
    private commonService: CommonService,
    private scheduleService: ScheduleService
  ) {}

  initOptions() {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCourseList(),
      this.commonService.getCourtList()
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return forkJoin(this.initOptions(), this.scheduleService.getTable(to.query))
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
