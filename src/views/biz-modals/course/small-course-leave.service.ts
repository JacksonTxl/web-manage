import { Injectable } from 'vue-service-app'
import { CourseGroupApi } from '@/api/v1/course/small-course'
import { Effect, State } from 'rx-state'

@Injectable()
export class GroupUserClassLeaveService {
  courseTypeList$ = new State({})
  loading$ = new State({})
  constructor(private courseGroupApi: CourseGroupApi) {}
  @Effect()
  getCourseGroupClassUserInfo(params: any) {
    return this.courseGroupApi.getCourseGroupClassUserInfo(params)
  }
}
