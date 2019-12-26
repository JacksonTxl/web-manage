import { forkJoin } from 'rxjs'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { PersonalScheduleCommonService as CommonService } from './service#/common.service'
import { PersonalScheduleReserveService } from './service#/reserve.service'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class PersonalReserveTableService implements Controller {
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:personal_course_schedule|add',
    addBatch: 'shop:schedule:personal_course_schedule|batch_add',
    copy: 'shop:schedule:personal_course_schedule|copy',
    get: 'shop:schedule:personal_course_schedule|get'
  })
  constructor(
    private commonService: CommonService,
    private authService: AuthService,
    private reserveService: PersonalScheduleReserveService
  ) {}
  initOptions() {
    return forkJoin(this.commonService.getCoachListInBatch())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return forkJoin(this.initOptions(), this.reserveService.getList(to.query))
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute) {
    return this.initOptions()
  }
}
