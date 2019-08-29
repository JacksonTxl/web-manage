import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class PersonalCourseService {
  courseList$ = new State([])
  modalCourseList$ = new State([])
  modalCoachList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  constructor(private statApi: StatApi) {}
  @Effect()
  getCourseList(params: any) {
    return this.statApi.getPersonalCourse(params).pipe(
      tap((res: any) => {
        this.courseList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getCourseModalCoachAndCourseList(query: any) {
    return this.statApi.getCourseModalCoachAndCourseList(query).pipe(
      tap(res => {
        this.modalCoachList$.commit(() => res.info.coach_list)
        this.modalCourseList$.commit(() => res.info.course_list)
      })
    )
  }
  init(querySelect: any, queryTable: any) {
    return forkJoin(
      this.getCourseModalCoachAndCourseList(querySelect),
      this.getCourseList(queryTable)
    )
  }
}
