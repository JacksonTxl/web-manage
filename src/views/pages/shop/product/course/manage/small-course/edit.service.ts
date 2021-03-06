import { Effect, State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { CourseGroupApi } from '@/api/v1/course/small-course'
import { ServiceRoute, Injectable } from 'vue-service-app'
import { UserService } from '@/services/user.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class EditService {
  loading$ = new State({})
  rangeList$ = new State({})
  list$ = new State({})
  staffList$ = new State({})
  page$ = new State({})
  info$ = new State({})
  isAllowLeave$ = this.userService.getOptions$('small_course.is_allow_leave')
  unitList$ = this.userService.getOptions$('deposit_card.transfer_unit')
  sellType$ = this.userService.getOptions$('setting.sell_type')

  constructor(
    private courseApi: CourseGroupApi,
    private userService: UserService
  ) {}
  @Effect()
  getCourseEditInfo(params: any) {
    return this.courseApi.getCourseEditInfo(params).pipe(
      tap(res => {
        this.info$.commit(() => res)
      })
    )
  }
  @Effect()
  editGroup(params: any) {
    return this.courseApi.editGroup(params)
  }
  @Effect()
  setCoach(params: any) {
    return this.courseApi.setCoach(params)
  }
  @Effect()
  setPrice(params: any) {
    return this.courseApi.setPrice(params)
  }
  getCourseGroupRangeList() {
    return this.courseApi.getCourseGroupRangeList().pipe(
      tap(res => {
        this.rangeList$.commit(() => res.list)
      })
    )
  }
  getCourseStaffList(params: any) {
    return this.courseApi.getCourseStaffList(params).pipe(
      tap(res => {
        this.staffList$.commit(() => res.list)
      })
    )
  }
  init(params: any) {
    return forkJoin(
      this.getCourseGroupRangeList(),
      this.getCourseStaffList(params),
      this.getCourseEditInfo(params)
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
