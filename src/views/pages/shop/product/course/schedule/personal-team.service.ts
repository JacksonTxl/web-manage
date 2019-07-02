import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import {
  PersonalTeamScheduleScheduleService
} from './personal-team.service#/schedule.service'
import {
  PersonalTeamScheduleCommonService
} from './personal-team.service#/common.service'
import { AuthService } from '@/services/auth.service'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'

@Injectable()
export class PersonalTeamService implements RouteGuard {
  state$: State<any>
  auth$: Computed<object>
  constructor(private commonService: PersonalTeamScheduleCommonService,
    private authService: AuthService,
    private scheduleService: PersonalTeamScheduleScheduleService) {
    this.state$ = new State({
      auth: {
        add: this.authService.can('shop:shedule:personal_team_course_shedule|add'),
        addBatch: this.authService.can('shop:shedule:personal_team_course_shedule|batch_add'),
        copy: this.authService.can('shop:shedule:personal_team_course_shedule|copy')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }

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
