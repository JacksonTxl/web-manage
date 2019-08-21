import { State } from 'rx-state/src'
import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import {
  ShopTeamCourseApi,
  AddInput,
  UpdateInput
} from '@/api/v1/course/team/shop'
import { UserService } from '@/services/user.service'
@Injectable()
export class SetShopTeamCourseService {
  loading$ = new State({})
  shopSetting$ = this.userService.getOptions$('team_course.shop_setting')
  constructor(
    protected courseApi: ShopTeamCourseApi,
    private userService: UserService
  ) {}
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
