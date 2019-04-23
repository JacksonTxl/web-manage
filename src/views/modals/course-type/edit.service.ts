import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourseApi, UpdateCourseTypeInput } from '@/api/v1/setting/course'

interface EditState {
}
@Injectable()
export class EditService extends Store<EditState> {
  constructor(protected courseApi: CourseApi) {
    super()
  }
  @Effect()
  updateCourseType(params: UpdateCourseTypeInput) {
    return this.courseApi.updateCourseType(params)
  }
}
