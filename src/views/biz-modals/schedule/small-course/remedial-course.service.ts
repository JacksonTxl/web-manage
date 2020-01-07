import { AuthService } from '@/services/auth.service'
import { Controller, Injectable, ServiceRoute } from 'vue-service-app'
import { SmallCourseScheduleCommonService } from '@/views/pages/shop/product/course/schedule/small-course/service#/common.service'

@Injectable()
export class RemedialCourseService implements Controller {
  constructor(
    private smallCourseScheduleCommonService: SmallCourseScheduleCommonService,
    private authService: AuthService
  ) {}

  init() {
    return this.smallCourseScheduleCommonService.getCourseList({
      schedule_status: 1
    })
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute) {
    return this.init()
  }
}
