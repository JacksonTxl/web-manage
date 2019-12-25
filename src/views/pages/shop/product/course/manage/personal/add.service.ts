import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import {
  ShopPersonalCourseApi,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/shop'
interface AddState {}
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(private courseApi: ShopPersonalCourseApi) {}
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
}
