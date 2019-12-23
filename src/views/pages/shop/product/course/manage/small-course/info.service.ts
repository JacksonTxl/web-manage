import { State, Computed } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/small_course'
@Injectable()
export class InfoService {
  groupCourseHeaderInfo$ = new State({})
  constructor(private groupApi: CourseGroupApi) {}
  getGroupCourseHeaderInfo(courseId: string) {
    return this.groupApi.getGroupCourseHeaderInfo(courseId).pipe(
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
  publish(params: any) {
    return this.groupApi.publish(params)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const courseId = to.query.courseId as string
    this.getGroupCourseHeaderInfo(courseId).subscribe(() => next())
  }
}
