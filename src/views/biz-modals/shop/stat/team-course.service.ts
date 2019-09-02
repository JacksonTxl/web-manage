import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class TeamCourseService {
  courseList$ = new State([])
  modalCourseList$ = new State([])
  modalCoachList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  courseTypeList$ = this.userService.getOptions$('reserve.reserve_type')
  constructor(private statApi: StatApi, private userService: UserService) {}
  @Effect()
  getCourseList(params: any) {
    return this.statApi.getTeamCourse(params).pipe(
      tap((res: any) => {
        this.courseList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getCourseModalCoachAndCourseList(query: any) {
    return this.statApi.getCourseModalCoachAndCourseList(query).pipe(
      tap(res => {
        this.modalCoachList$.commit(() => [
          { id: -1, name: '全部教练' },
          ...res.info.coach_list
        ])
        this.modalCourseList$.commit(() => [
          { id: -1, name: '全部课程' },
          ...res.info.course_list
        ])
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
