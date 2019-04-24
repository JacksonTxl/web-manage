import { Injectable } from 'vue-service-app'
import { State, Computed } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { CourseApi } from '@/api/v1/setting/course'

interface CourseCategoryState {
  list: Array<Object>
}
@Injectable()
export class SelectCourseCategoryService extends Store<CourseCategoryState> {
  state$: State<CourseCategoryState>
  list$: Computed<Object>
  constructor(private courseApi: CourseApi) {
    super()
    this.state$ = new State({
      list: []
    })
    this.list$ = new Computed(this.state$.pipe(pluck('list')))
  }
  getCourseCategoryList() {
    return this.courseApi.getCourseCategoryList({}).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.list = res.list
        })
      })
    )
  }
}
