import { State } from 'rx-state'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { tap } from 'rxjs/operators'
import {
  ShopPersonalCourseApi,
  GetInfoInput
} from '@/api/v1/course/personal/shop'
@Injectable()
export class InfoService implements Controller {
  info$ = new State({})
  constructor(private courseApi: ShopPersonalCourseApi) {}
  getInfo(query: GetInfoInput) {
    return this.courseApi.getInfo(query).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute) {
    return this.getInfo(to.meta.query)
  }
}
