import { State, Computed } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/group'
@Injectable()
export class InfoService {
  groupCourseHeaderInfo$ = new State({})
  constructor(private groupApi: CourseGroupApi) {}
  getGroupCourseHeaderInfo(courseId: string) {
    // TODO： 换接口
    return this.groupApi.getGroupCourseInfo(courseId).pipe(
      tap(res => {
        this.groupCourseHeaderInfo$.commit(() => res)
      })
    )
  }
  deleteGroup(params: any) {
    return this.groupApi.deleteGroup(params)
  }
  beGroup(params: any) {
    return this.groupApi.beGroup(params)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const courseId = to.query.courseId as string
    this.getGroupCourseHeaderInfo(courseId).subscribe(() => next())
  }
}
