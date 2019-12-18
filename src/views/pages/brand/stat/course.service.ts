import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state/src'
import { pluck, tap } from 'rxjs/operators'
import {
  CourseApi,
  CourseChartParams,
  CourseDataParams
} from '@/api/v1/stat/course'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { UserService } from '@/services/user.service'
@Injectable()
export class CourseService {
  soldChartData$ = new State<object[]>([])
  checkInChartData$ = new State<object[]>([])
  notCheckInChartData$ = new State<object[]>([])
  list$ = new State([])
  page$ = new State({})
  total$ = new State({})
  loading$ = new State({})
  soldChartTotal$ = new State(0)
  checkInCourseTotal$ = new State(0)
  notCheckInCourseTotal$ = new State(0)

  auth$ = this.authService.authMap$({
    export: 'brand:stat:order_reports|batch_export'
  })
  constructor(
    private api: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  SET_SOLD_CHART_DATA(saleCourse: any) {
    this.soldChartData$.commit(() => {
      return [
        {
          name: '私教课售课',
          value: saleCourse.sale_personal_num,
          percent: saleCourse.sale_personal_percentage
        },
        {
          name: '团体课售课',
          value: saleCourse.sale_team_num,
          percent: saleCourse.sale_team_percentage
        }
      ]
    })
    this.soldChartTotal$.commit(() => saleCourse.sale_total_num)
  }
  SET_CHECK_IN_CHART_DATA(checkInCourse: any) {
    this.checkInChartData$.commit(() => [
      {
        name: '私教课消课',
        value: checkInCourse.personal_checkin_num,
        percent: checkInCourse.personal_checkin_percentage
      },
      {
        name: '团体课消课',
        value: checkInCourse.team_checkin_num,
        percent: checkInCourse.team_checkin_percentage
      }
    ])
    this.checkInCourseTotal$.commit(() => checkInCourse.total_checkin_num)
  }
  SET_NOT_CHECK_IN_CHART_DATA(notCheckInCourse: any) {
    this.notCheckInChartData$.commit(() => [
      {
        name: '私教课未消课',
        value: notCheckInCourse.personal_not_checkin_num,
        percent: notCheckInCourse.personal_not_checkin_percentage
      },
      {
        name: '团体课未消课',
        value: notCheckInCourse.team_not_checkin_num,
        percent: notCheckInCourse.team_not_checkin_percentage
      }
    ])
    this.notCheckInCourseTotal$.commit(
      () => notCheckInCourse.total_not_checkin_num
    )
  }
  // 获取营收统计图信息
  getChart(query: CourseChartParams) {
    return this.api.getChart(query).pipe(
      tap(res => {
        const data = res.info
        this.SET_SOLD_CHART_DATA(data.sale_course)
        this.SET_CHECK_IN_CHART_DATA(data.checkin_course)
        this.SET_NOT_CHECK_IN_CHART_DATA(data.not_checkin_course)
      })
    )
  }
  // 列表
  @Effect()
  getList(query: CourseDataParams) {
    return this.api.getData(query).pipe(
      tap(res => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
        this.total$.commit(() => res.total)
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
