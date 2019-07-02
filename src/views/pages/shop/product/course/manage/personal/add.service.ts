import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import {
  ShopPersonalCourseApi,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/shop'
interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(private courseApi: ShopPersonalCourseApi) {
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
}
