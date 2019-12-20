import { AuthService } from '@/services/auth.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { forkJoin } from 'rxjs'
import { MiniTeamScheduleCommonService } from '@/views/pages/shop/product/course/schedule/mini-team/service#/common.service'

@Injectable()
export class InbatchAddService implements Controller {
  auth$ = this.authService.authMap$({
    add: 'shop:schedule:team_course_schedule|add'
  })

  constructor(
    private miniTeamScheduleCommonService: MiniTeamScheduleCommonService,
    private authService: AuthService
  ) {}

  init() {
    return forkJoin(
      this.miniTeamScheduleCommonService.getCoachList(),
      this.miniTeamScheduleCommonService.getCourseList(),
      this.miniTeamScheduleCommonService.getCourtList()
    )
  }
  beforeRouteEnter() {
    console.log('beforeRouteEnter')
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    console.log(123)
    return this.init()
  }
}
