
import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { SetBrandTeamCourseService } from '@/views/fragments/course/team#/set-brand-team-course.service'
@Injectable()
export class AddService implements RouteGuard {
  constructor(private setCourseService: SetBrandTeamCourseService) {
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    // console.log(1111111111)
    // return this.setCourseService.getUpdateInfo()
  }
}
