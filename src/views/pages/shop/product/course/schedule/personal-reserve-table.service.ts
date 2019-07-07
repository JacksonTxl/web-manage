import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { PersonalScheduleCommonService as CommonService } from './personal.service#/common.service'
import { PersonalScheduleReserveService } from './personal.service#/reserve.service'
import { AuthService } from '@/services/auth.service'
import { State, Computed } from 'rx-state'
import { pluck } from 'rxjs/operators'
@Injectable()
export class PersonalReserveTableService implements RouteGuard {
  state$: State<any>
  auth$: Computed<object>
  constructor(private commonService: CommonService,
    private authService: AuthService,
    private reserveService: PersonalScheduleReserveService) {
    this.state$ = new State({
      auth: {
        add: this.authService.can('shop:schedule:personal_course_schedule|add'),
        addBatch: this.authService.can('shop:schedule:personal_course_schedule|batch_add'),
        copy: this.authService.can('shop:schedule:personal_course_schedule|copy')
      }
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }

  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.reserveService.getList(to.query)
  }
}
