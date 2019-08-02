import { AuthService } from '@/services/auth.service'
import { TeamScheduleScheduleService as ScheduleService } from '@/views/pages/shop/product/course/schedule/team.service#/schedule.service.ts'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { TeamScheduleCommonService as CommonService } from '@/views/pages/shop/product/course/schedule/team.service#/common.service.ts'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'

@Injectable()
export class ZlxService implements RouteGuard {
  state$: State<any>
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:team_course_schedule|add',
    addBatch: 'shop:schedule:team_course_schedule|batch_add',
    copy: 'shop:schedule:team_course_schedule|copy'
  })

  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private scheduleService: ScheduleService
  ) {
    this.state$ = new State({})
  }

  init(query: any) {
    return forkJoin(
      this.commonService.getCoachList(),
      this.commonService.getCourseList(),
      this.commonService.getCourtList(),
      this.scheduleService.getList(query)
    )
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init(to.query)
  }
}
