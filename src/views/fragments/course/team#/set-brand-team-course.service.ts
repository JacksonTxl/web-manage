import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  BrandTeamCourseApi,
  AddInput,
  UpdateInput,
  SetShopInput
} from '@/api/v1/course/team/brand'
import { UserService } from '@/services/user.service'
@Injectable()
export class SetBrandTeamCourseService {
  loading$ = new State({})
  shopSetting$ = this.userService.getOptions$('team_course.shop_setting')
  constructor(
    protected courseApi: BrandTeamCourseApi,
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
  @Effect()
  setShop(params: SetShopInput) {
    return this.courseApi.setShop(params)
  }
}
