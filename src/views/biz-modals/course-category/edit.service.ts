import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { CourseApi, UpdateCourseCategoryInput } from '@/api/v1/setting/course'

@Injectable()
export class EditService {
  loading$ = new State({})
  constructor(protected courseApi: CourseApi) {}
  @Effect()
  updateCourseCategory(params: UpdateCourseCategoryInput) {
    return this.courseApi.updateCourseCategory(params)
  }
}
