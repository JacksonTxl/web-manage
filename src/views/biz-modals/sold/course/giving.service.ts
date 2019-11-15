import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { CourseApi } from '@/api/v1/sold/course'
import { tap } from 'rxjs/operators'

@Injectable()
export class GivingService {
  loading$ = new State({})
  list_num$ = new State(0)
  constructor(private courseApi: CourseApi) {}
  fetchCourseNum(params: any) {
    return this.courseApi.fetchSoldCourseValidNum(params).pipe(
      tap((res: any) => {
        this.list_num$.commit(() => res.list_num)
      })
    )
  }
  @Effect()
  taskAddCourseNum(params: any) {
    return this.courseApi.taskAddCourseNum(params)
  }
}
