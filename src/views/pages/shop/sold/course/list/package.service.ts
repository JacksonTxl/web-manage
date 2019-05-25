import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, GetCourseListInput } from '@/api/v1/sold/course'

@Injectable()
export class PackageService implements RouteGuard {
  list$ = new State({})
  page$ = new State({})
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  getList(params: GetCourseListInput) {
    return this.courseApi.getCourseList(params, 'package').pipe(tap((res:any) => {
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  unFreeze(id:string) {
    return this.courseApi.unFreezeCoursePackage(id)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
