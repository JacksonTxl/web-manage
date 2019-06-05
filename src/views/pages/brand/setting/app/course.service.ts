import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'

@Injectable()
export class CourseService implements RouteGuard {
  constructor() {}
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    console.log('before route enter, course', to.matched, to.meta.name)
    if (to.name === 'brand-setting-app-course') {
      next({
        name: 'brand-setting-app-course-category'
      })
    } else {
      next()
    }
  }
}
