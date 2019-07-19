import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { RedirectService } from '@/services/redirect.service'
import moment from 'moment'
@Injectable()
export class TeamService implements RouteGuard {
  constructor(private redirectService: RedirectService) {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    let weekOfday: any = moment().format('E')
    let start_date: string = moment().subtract(weekOfday - 1, 'days').format('YYYY-MM-DD')
    let end_date: string = moment().add(7 - weekOfday, 'days').format('YYYY-MM-DD')

    const redirectRouteQuery: any = { start_date, end_date }
    this.redirectService.redirect({
      locateRouteName: 'shop-product-course-schedule-team',
      redirectRouteName: 'shop-product-course-schedule-team-team',
      redirectRouteQuery,
      next,
      to
    })
  }
}
