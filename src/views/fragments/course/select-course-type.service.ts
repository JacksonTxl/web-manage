import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourseApi } from '@/api/v1/setting/course'

interface CourseTypeState {
  list: Array<Object>
}
@Injectable()
export class SelectCourseTypeService extends Store<CourseTypeState> {
  state$: State<CourseTypeState>
  list$: Computed<Object>
  constructor(private courseApi: CourseApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  getCourseTypeList() {
    return this.courseApi.getCourseTypeList({}).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
