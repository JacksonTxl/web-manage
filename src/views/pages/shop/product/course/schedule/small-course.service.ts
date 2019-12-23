import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import moment from 'moment'
@Injectable()
export class SmallCourseService implements Controller {
  constructor(private redirectService: RedirectService) {}
  beforeEach() {
    let weekOfday: any = moment().format('E')
    let start_date: string = moment()
      .subtract(weekOfday - 1, 'days')
      .format('YYYY-MM-DD')
    let end_date: string = moment()
      .add(7 - weekOfday, 'days')
      .format('YYYY-MM-DD')
    return this.redirectService.redirect({
      locateRouteName: 'shop-product-course-schedule-small-course',
      redirectRoute: {
        name: 'shop-product-course-schedule-small-course-small-course',
        query: { start_date, end_date }
      }
    })
  }
}
