import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import {
  ShopTeamCourseApi,
  SetCourseInput,
  SetShopInput
} from '@/api/v1/course/team/shop'
interface AddState {}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(private courseApi: ShopTeamCourseApi) {
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
}
