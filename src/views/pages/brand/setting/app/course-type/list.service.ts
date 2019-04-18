import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourseApi, DeleteCourseTypeInput } from '@/api/v1/setting/course'

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
  getCourseTypeList() {
    return this.courseApi.getCourseTypeList({}).pipe(
      tap(res => {
        this.SET_STATE(res)
      })
    )
  }
  refreshCourseTypeList() {
    this.getCourseTypeList().subscribe()
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
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getCourseTypeList().subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
