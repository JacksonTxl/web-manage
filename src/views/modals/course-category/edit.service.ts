import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourseApi, UpdateCourseCategoryInput } from '@/api/v1/setting/course'

interface EditState {
}
@Injectable()
export class EditService extends Store<EditState> {
  constructor(protected courseApi: CourseApi) {
    super()
  }
  @Effect()
  updateCourseCategory(params: UpdateCourseCategoryInput) {
    return this.courseApi.updateCourseCategory(params)
  }
}
