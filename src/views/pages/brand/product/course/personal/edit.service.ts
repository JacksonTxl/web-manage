import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  BrandPersonalCourseApi,
  GetPersonalCourseEditInput,
  SetPersonalCourseInput,
  SetShopInput,
  SetPriceInput
} from '@/api/v1/course/personal/brand'

interface EditState {
  info: Object
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  info$: Computed<Object>
  constructor(protected personalApi: BrandPersonalCourseApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getPersonalCourseEdit(query: GetPersonalCourseEditInput) {
    return this.personalApi.getPersonalCourseEdit(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
        })
      })
    )
  }
  @Effect()
  updatePersonalCourse(params: SetPersonalCourseInput) {
    return this.personalApi.updatePersonalCourse(params)
  }
  @Effect()
  setShop(params: SetShopInput) {
    return this.personalApi.setShop(params)
  }
  @Effect()
  setPrice(params: SetPriceInput) {
    return this.personalApi.setPrice(params)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const course_id = to.meta.query.id || to.query.courseId
    this.getPersonalCourseEdit({ course_id }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
