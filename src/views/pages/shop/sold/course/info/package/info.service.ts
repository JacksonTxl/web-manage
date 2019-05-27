import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class InfoService implements RouteGuard {
  packageInfo$ = new State({})
  id = ''
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  getPackageInfo(id:string, type:string) {
    return this.courseApi.getCourseInfo(id, type).pipe(tap((res:any) => {
      this.packageInfo$.commit(() => res.info)
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
