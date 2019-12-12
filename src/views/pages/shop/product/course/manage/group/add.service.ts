import { Effect, State } from 'rx-state'
import { Store } from '@/services/store'
import { tap, map } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/group'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'

@Injectable()
export class AddService {
  loading$ = new State({})
  rangeList$ = new State({})
  list$ = new State({})
  page$ = new State({})
  isAllowLeave$ = this.userService.getOptions$('small_course.is_allow_leave')
  constructor(
    private courseApi: CourseGroupApi,
    private userService: UserService
  ) {}
  @Effect()
  addGroup(params: any) {
    return this.courseApi.addGroup(params)
  }
  @Effect()
  setCoach(params: any) {
    return this.courseApi.setCoach(params)
  }
  @Effect()
  setPrice(params: any) {
    return this.courseApi.setPrice(params)
  }
  getCourseGroupRangeList(params: any) {
    params.size = 30
    return this.courseApi.getCourseGroupRangeList(params).pipe(
      tap(res => {
        this.rangeList$.commit(() => res.list)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.getCourseGroupRangeList(to.meta.query)
  }
}
