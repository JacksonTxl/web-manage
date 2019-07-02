import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { CourseApi, FreezeCoursePackageInput } from '@/api/v1/sold/course'

@Injectable()
export class FreezeService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  freeze(params: FreezeCoursePackageInput, id:string, type:string) {
    console.log(1)
    return this.courseApi.freezeCourse(params, id, type)
  }
}
