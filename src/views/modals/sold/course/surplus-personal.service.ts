import { Injectable } from 'vue-service-app'
import { CourseApi, EditCoursePersonalRemainInput } from '@/api/v1/sold/course'
import { State, Effect } from 'rx-state'

@Injectable()
export class SurplusService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  edit(params: EditCoursePersonalRemainInput, id:string) {
    return this.courseApi.editCoursePersonalRemain(params, id)
  }
}
