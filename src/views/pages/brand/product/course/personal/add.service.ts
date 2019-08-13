import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  BrandPersonalCourseApi,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/brand'
import { PersonalCourseApi } from '@/api/v1/course/personal'
import { UserService } from '@/services/user.service'
@Injectable()
export class AddService {
  loading$ = new State({})
  shopSetting$ = this.userService.getOptions$('personal_course.shop_setting')
  sellType$ = this.userService.getOptions$('personal_course.sell_type')
  constructor(
    private courseApi: BrandPersonalCourseApi,
    private personalCourseApi: PersonalCourseApi,
    private userService: UserService
  ) {}
  @Effect()
  addCourse(params: SetCourseInput) {
    return this.courseApi.addCourse(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.courseApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.courseApi.setPrice(params)
  }
  @Effect()
  getSetting() {
    return this.personalCourseApi.getSetting()
  }
}
