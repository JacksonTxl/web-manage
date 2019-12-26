import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  ShopPersonalCourseApi,
  SetCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/shop'

@Injectable()
export class EditService {
  loading$ = new State({})
  info$ = new State({})
  constructor(protected courseApi: ShopPersonalCourseApi) {}
  getCourseEdit(id: number) {
    return this.courseApi.getCourseEdit(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  updateCourse(params: SetCourseInput) {
    return this.courseApi.updateCourse(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.courseApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.courseApi.setPrice(params)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const id = to.meta.query.id
    return this.getCourseEdit(id)
  }
}
