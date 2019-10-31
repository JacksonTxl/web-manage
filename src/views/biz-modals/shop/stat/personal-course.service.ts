import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class PersonalCourseService {
  courseList$ = new State([])
  modalCourseList$ = new State([])
  modalCoachList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  courseTypeList$ = this.userService.getOptions$('stat.personal_course_type')
  auth$ = this.authService.authMap$({
    export: 'shop:stat:class_reports|export_personal_number'
  })
  constructor(
    private statApi: StatApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
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
        this.modalCoachList$.commit(() => [
          { id: -1, name: `全部${this.userService.c('coach')}` },
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
