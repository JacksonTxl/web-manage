import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourseApi, DeleteCourseTypeInput, GetCourseTypeListInput } from '@/api/v1/setting/course'

interface ListState {
  list: any[],
  page: object
}
@Injectable()
export class ListService extends Store<ListState> {
  state$: State<ListState>
  list$: Computed<any[]>
  page$: Computed<object>
  constructor(protected courseApi: CourseApi) {
    super()
    this.state$ = new State({
      list: [],
      page: {}
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
    this.page$ = new Computed(this.state$.pipe(pluck('page')))
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
      state.list = data.list
      state.page = data.page
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
