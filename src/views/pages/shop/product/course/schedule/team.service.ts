import { TeamScheduleScheduleService } from './team.service#/schedule.service'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { TeamScheduleCommonService } from './team.service#/common.service'

@Injectable()
export class TeamService implements RouteGuard {
  constructor(private teamScheduleCommonService: TeamScheduleCommonService,
    private teamScheduleScheduleService: TeamScheduleScheduleService) {}

  initOptions() {
    return forkJoin(this.teamScheduleCommonService.getCoachList(), this.teamScheduleCommonService.getCourseList(), this.teamScheduleCommonService.getCourtList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.teamScheduleScheduleService.getList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
