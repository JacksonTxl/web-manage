import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  ShopTeamCourseApi,
  AddInput,
  UpdateInput
} from '@/api/v1/course/team/shop'
@Injectable()
export class SetShopTeamCourseService extends Store<any> {
  constructor(protected courseApi: ShopTeamCourseApi) {
    super()
  }
  private addCourse(params: AddInput) {
    return this.courseApi.add(params)
  }
  private updateCourse(params: UpdateInput) {
    return this.courseApi.update(params)
  }
  @Effect()
  setCourse(params: UpdateInput) {
    const id = params.course_id
    if (id) {
      return this.updateCourse(params)
    } else {
      return this.addCourse(params)
    }
  }
}
