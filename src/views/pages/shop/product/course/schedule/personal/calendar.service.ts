import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin, timer } from 'rxjs'
import { PersonalScheduleCommonService as CommonService } from '../personal.service#/common.service'
import { PersonalScheduleReserveService as ReserveService } from '../personal.service#/reserve.service'

@Injectable()
export class CalendarService implements RouteGuard {
  constructor(private commonService: CommonService,
    private reserveService: ReserveService) { }

  initOptions() {
    return forkJoin(this.commonService.getCourseList(), this.commonService.getCourseCoachList())
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.reserveService.getList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
