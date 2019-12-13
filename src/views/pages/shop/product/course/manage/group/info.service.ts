import { State, Computed } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/group'
@Injectable()
export class InfoService {
  groupCourseInfo$ = new State({})
  constructor(private groupApi: CourseGroupApi) {}
  getGroupCourseInfo(courseId: string) {
    return this.groupApi.getGroupCourseInfo(courseId).pipe(
      tap(res => {
        this.groupCourseInfo$.commit(() => res)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const courseId = to.query.courseId as string
    this.getGroupCourseInfo(courseId).subscribe(() => next())
  }
}
