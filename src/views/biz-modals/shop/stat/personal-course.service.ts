import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class PersonalCourseService {
  courseList$ = new State({})
  loading$ = new State({})
  constructor(private statApi: StatApi) {}
  @Effect()
  getCourseList(params: any) {
    return this.statApi.getPersonalCourse(params).pipe(
      tap((res: any) => {
        this.courseList$.commit(() => res.list)
      })
    )
  }
}
