import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourseApi, AddCourseCategoryInput } from '@/api/v1/setting/course'

@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(protected courseApi: CourseApi) {}
  @Effect()
  addCourseCategory(params: AddCourseCategoryInput) {
    return this.courseApi.addCourseCategory(params)
  }
}
