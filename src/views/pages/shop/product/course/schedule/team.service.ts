import { AuthService } from '@/services/auth.service'
import { TeamScheduleScheduleService as ScheduleService } from './team.service#/schedule.service'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { TeamScheduleCommonService as CommonService } from './team.service#/common.service'
import { State, Computed } from 'rx-state/src'
import { pluck } from 'rxjs/operators'

@Injectable()
export class TeamService implements RouteGuard {
  state$: State<any>
  auth$: Computed<object>
  constructor(private commonService: CommonService,
    private authService: AuthService,
    private scheduleService: ScheduleService) {
    this.state$ = new State({
      auth: {
        add: this.authService.can('shop:schedule:team_course_schedule|add'),
        addBatch: this.authService.can('brand:setting:coach_level|batch_add'),
        copy: this.authService.can('brand:setting:coach_level|copy')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }

  initOptions() {
    return forkJoin(this.commonService.getCoachList(), this.commonService.getCourseList(), this.commonService.getCourtList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.scheduleService.getList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
