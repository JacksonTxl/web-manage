import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourseApi, AddCourseCategoryInput } from '@/api/v1/setting/course'

interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(protected courseApi: CourseApi) {
    super()
  }
  @Effect()
  addCourseCategory(params: AddCourseCategoryInput) {
    return this.courseApi.addCourseCategory(params)
  }
}
