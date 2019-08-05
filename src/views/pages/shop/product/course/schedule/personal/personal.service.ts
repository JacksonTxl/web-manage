import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { PersonalScheduleCommonService as CommonService } from './service#/common.service'
import { PersonalScheduleReserveService } from './service#/reserve.service'
import { AuthService } from '@/services/auth.service'
import { State, Computed } from 'rx-state'
@Injectable()
export class PersonalService implements RouteGuard {
  state$: State<any>
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:personal_course_schedule|add',
    addBatch: 'shop:schedule:personal_course_schedule|batch_add',
    copy: 'shop:schedule:personal_course_schedule|copy'
  })
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private reserveService: PersonalScheduleReserveService
  ) {
    this.state$ = new State({})
  }

  initOptions() {
    return forkJoin(
      this.commonService.getCoachListInBatch(),
      this.commonService.getCoachList()
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return forkJoin(this.initOptions(), this.reserveService.getList(to.query))
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute) {
    return this.initOptions()
  }
}
