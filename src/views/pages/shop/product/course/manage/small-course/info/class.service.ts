import { State, Computed } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/small_course'
@Injectable()
export class ClassService {
  groupClassList$ = new State({})
  constructor(private groupApi: CourseGroupApi) {}
  getGroupClassInfo(courseId: string) {
    return this.groupApi.getGroupClassInfo(courseId).pipe(
      tap(res => {
        this.groupClassList$.commit(() => res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    const courseId = to.query.courseId as string
    return this.getGroupClassInfo(courseId)
  }
}
