import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import {
  BrandPersonalCourseApi,
  SetPersonalCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/brand'
interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(private personalApi: BrandPersonalCourseApi) {
    super()
  }
  @Effect()
  addPersonalCourse(params: SetPersonalCourseInput) {
    return this.personalApi.addPersonalCourse(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.personalApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.personalApi.setPrice(params)
  }
}
