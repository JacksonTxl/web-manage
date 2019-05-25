import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import {
  PersonalTeamScheduleScheduleService
} from './personal-team.service#/schedule.service'
import {
  PersonalTeamScheduleCommonService
} from './personal-team.service#/common.service'

@Injectable()
export class PersonalTeamService implements RouteGuard {
  constructor(private commonService: PersonalTeamScheduleCommonService,
    private scheduleService: PersonalTeamScheduleScheduleService) {}

  initOptions() {
    const commonService = this.commonService
    return forkJoin(
      commonService.getCoachList(),
      commonService.getCourseList()
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.scheduleService.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
