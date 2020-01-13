import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourseApi, AddCourseCategoryInput } from '@/api/v1/setting/course'

@Injectable()
export class EditService {
  loading$ = new State({})
  constructor(protected courseApi: CourseApi) {}
  @Effect()
  editCourseRange(params: AddCourseCategoryInput) {
    return this.courseApi.editCourseRange(params)
  }
}
