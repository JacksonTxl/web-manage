import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService implements RouteGuard {
  packageInfo$ = new State({})
  loading$ = new State({})
  auth$ = new State({})
  id = ''
  constructor(private courseApi: CourseApi, private authService: AuthService) {}
  getPackageInfo(id:string, type:string) {
    return this.courseApi.getCourseInfo(id, type).pipe(tap((res:any) => {
      res = this.authService.filter(res, 'auth')
      this.packageInfo$.commit(() => res.info)
      this.auth$.commit(() => res.auth)
    }))
  }
  unFreeze(id:string) {
    return this.courseApi.unFreezeCourse(id, 'package')
  }
  beforeEach(to: ServiceRoute, from:ServiceRoute, next: ()=>{}) {
    this.id = to.meta.query.id
    this.getPackageInfo(to.meta.query.id, 'package').subscribe(() => {
      next()
    })
  }
}
