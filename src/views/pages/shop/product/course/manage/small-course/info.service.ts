import { State } from 'rx-state'
import { ServiceRoute, Injectable } from 'vue-service-app'
import { tap, pluck } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/small_course'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class InfoService {
  groupCourseHeaderInfo$ = new State({})
  constructor(
    private groupApi: CourseGroupApi,
    private authService: AuthService
  ) {}
  auth$ = this.authService.authMap$({
    del: 'shop:product:small_class_course|del',
    finish: 'shop:product:small_class_course|finish',
    edit: 'shop:product:small_class_course|edit',
    refund: 'shop:product:small_class_course|refund',
    publish: 'shop:product:small_class_course|publish'
  })
  getGroupCourseHeaderInfo(courseId: string) {
    return this.groupApi.getGroupCourseHeaderInfo(courseId).pipe(
      tap(res => {
        this.groupCourseHeaderInfo$.commit(() => res.info)
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
