import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  BrandTeamCourseApi,
  GetCourseEditInput,
  SetCourseInput,
  SetShopInput
} from '@/api/v1/course/team/brand'

interface EditState {
  info: Object
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  info$: Computed<Object>
  constructor(protected courseApi: BrandTeamCourseApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getCourseEdit(query: GetCourseEditInput) {
    return this.courseApi.getCourseEdit(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
        })
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const course_id = to.meta.query.id || to.query.courseId
    this.getCourseEdit({ course_id }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
