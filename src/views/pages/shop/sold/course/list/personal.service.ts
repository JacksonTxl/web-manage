import { Injectable, ServiceRoute, RouteGuard } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseApi, GetCourseListInput } from '@/api/v1/sold/course'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class PersonalService implements RouteGuard {
  list$ = new State([])
  page$ = new State({})
  loading$ = new State({})
  auth$ = new State({
    export: this.authService.can('shop:sold:sold_personal_course|export')
  })
  constructor(private courseApi: CourseApi, private authService: AuthService) {}
  getList(params: GetCourseListInput) {
    return this.courseApi.getCourseList(params, 'personal').pipe(tap((res:any) => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  unFreeze(id:string) {
    return this.courseApi.unFreezeCourse(id, 'personal')
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getList(to.meta.query).subscribe(() => {
      next()
    })
  }
}
