import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourseApi, DeleteCourseTypeInput, GetCourseTypeListInput } from '@/api/v1/setting/course'

interface ListState {
  resData: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  constructor(protected courseApi: CourseApi) {
    super()
    this.state$ = new State({
      resData: {}
    })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getCourseTypeList(query: GetCourseTypeListInput) {
    return this.courseApi.getCourseTypeList(query).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  refreshCourseTypeList(query: GetCourseTypeListInput) {
    this.getCourseTypeList(query).subscribe()
  }
  deleteCourseType(params: DeleteCourseTypeInput) {
    return this.courseApi.deleteCourseType(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseTypeList({ page: to.meta.query.page, size: 20 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
