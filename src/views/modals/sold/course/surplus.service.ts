import { Injectable } from 'vue-service-app'
import { CourseApi, EditCoursePackageInput } from '@/api/v1/sold/course'
import { State, Effect } from 'rx-state'

@Injectable()
export class SurplusService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  getPackageEditInfo(id:string) {
    return this.courseApi.getCoursePackageEditInfo(id)
  }
  @Effect()
  edit(params: EditCoursePackageInput, id:string) {
    return this.courseApi.editCoursePackage(params, id)
  }
}
