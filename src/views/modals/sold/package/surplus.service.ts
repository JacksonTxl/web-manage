import { Injectable } from 'vue-service-app'
import { CourseApi, EditCoursePackageInput } from '@/api/v1/sold/course'
import { State, Effect } from 'rx-state/src'

@Injectable()
export class SurplusService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  edit(params: EditCoursePackageInput, id:string) {
    return this.courseApi.EditCoursePackage(params, id)
  }
}
