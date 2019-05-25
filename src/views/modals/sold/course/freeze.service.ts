import { Injectable } from 'vue-service-app'
import { State } from 'rx-state/src'
import { CourseApi, FreezeCoursePackageInput } from '@/api/v1/sold/course'

@Injectable()
export class FreezeService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  freeze(params: FreezeCoursePackageInput, id:string) {
    return this.courseApi.freezeCoursePackage(params, id)
  }
}
