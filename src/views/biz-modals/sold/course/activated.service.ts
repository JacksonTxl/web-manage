import { MessageService } from '@/services/message.service'
import { CourseApi } from '@/api/v1/sold/course'
import { State, Effect } from 'rx-state/src'
import { Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'

@Injectable()
export class ActivatedService {
  loading$ = new State({})
  info$ = new State({})
  constructor(private courseApi: CourseApi, private msg: MessageService) {}
  getActivatedCourseInfo(id: string) {
    return this.courseApi.getActivatedCourseInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  setActivatedCourse(params: any) {
    return this.courseApi.setActivatedCourse(params).pipe(
      tap(res => {
        this.msg.success({ content: '提交成功' })
      })
    )
  }
}
