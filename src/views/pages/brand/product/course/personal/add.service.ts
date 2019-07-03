import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  BrandPersonalCourseApi,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/brand'
import {
  PersonalCourseApi
} from '@/api/v1/course/personal'
interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(
    private courseApi: BrandPersonalCourseApi,
    private personalCourseApi: PersonalCourseApi
  ) {
    super()
  }
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
