import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  BrandTeamCourseApi,
  AddInput,
  UpdateInput,
  SetShopInput
} from '@/api/v1/course/team/brand'
@Injectable()
export class SetBrandTeamCourseService extends Store<any> {
  constructor(protected courseApi: BrandTeamCourseApi) {
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
  @Effect()
  setShop(params: SetShopInput) {
    return this.courseApi.setShop(params)
  }
}
