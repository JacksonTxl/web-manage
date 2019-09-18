import { Injectable } from 'vue-service-app'
import { MessageService } from '@/services/message.service'
import { CourseApi } from '@/api/v1/sold/course'
import { State } from 'rx-state/src'

import { tap } from 'rxjs/operators'

@Injectable()
export class LeaseService {
  info$ = new State({})
  constructor(private courseApi: CourseApi, private msg: MessageService) {}
  getLeaseAndactivatedCourseInfo(id: string) {
    return this.courseApi.getLeaseAndactivatedCourseInfo(id).pipe(
      tap((res: any) => {
        this.info$.commit(() => res.info)
      })
    )
  }
  setLeaseCourse(params: any) {
    return this.courseApi.setLeaseCourse(params).pipe(
      tap(res => {
        this.msg.success({ content: '提交成功' })
      })
    )
  }
}
