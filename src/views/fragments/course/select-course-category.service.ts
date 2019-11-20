import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { CourseApi } from '@/api/v1/special/course'

@Injectable()
export class SelectCourseCategoryService extends Store<any> {
  constructor(private courseApi: CourseApi) {
    super()
  }
  @Effect()
  getCourseCategoryList() {
    return this.courseApi.getCourseCategoryList()
  }
}
