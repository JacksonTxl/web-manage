import { UserService } from '@/services/user.service'
import { AuthService } from '@/services/auth.service'
import { StatApi } from '@/api/v1/stat/shop'
import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { forkJoin } from 'rxjs'

@Injectable()
export class TeamConsumeService {
  consumeList$ = new State([])
  modalCourseList$ = new State([])
  modalCoachList$ = new State([])
  loading$ = new State({})
  page$ = new State({})
  auth$ = this.authService.authMap$({
    export: 'shop:stat:class_reports|export_team_price'
  })
  courseTypeList$ = this.userService.getOptions$('reserve.reserve_type')
  constructor(
    private statApi: StatApi,
    private userService: UserService,
    private authService: AuthService
  ) {}
  @Effect()
  getConsumeList(params: any) {
    return this.statApi.getSmallConsume(params).pipe(
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
    return forkJoin(
      this.getCheckinModalCoachAndCourseList(querySelect),
      this.getConsumeList(queryTable)
    )
  }
}
