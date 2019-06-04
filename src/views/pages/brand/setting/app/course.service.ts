import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class CourseService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('before route enter, course')
    next()
  }
}
