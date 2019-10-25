import { anyAll } from '@/operators/any-all'
import { UserService } from '@/services/user.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { AuthService } from '@/services/auth.service'
@Injectable()
export class PersonalConsumeService {
  consumeList$ = new State([])
  modalCourseList$ = new State([])
  modalCoachList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:stat:class_reports|export_personal_price'
  })
  courseTypeList$ = this.userService.getOptions$('stat.personal_course_type')
  constructor(
    private statApi: StatApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getConsumeList(params: any) {
    return this.statApi.getPersonalConsume(params).pipe(
      tap((res: any) => {
        this.consumeList$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  getCheckinModalCoachAndCourseList(query: any) {
    return this.statApi.getCheckinModalCoachAndCourseList(query).pipe(
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
    return anyAll(
      this.getCheckinModalCoachAndCourseList(querySelect),
      this.getConsumeList(queryTable)
    )
  }
}
