import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourseApi } from '@/api/v1/special/course'

@Injectable()
export class SelectCourseCategoryService {
  loading$ = new State({})
  constructor(private courseApi: CourseApi) {}
  @Effect()
  getCourseCategoryList() {
    return this.courseApi.getCourseCategoryList()
  }
}
