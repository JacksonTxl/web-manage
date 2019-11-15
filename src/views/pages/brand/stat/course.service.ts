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
  loading$ = new State({})

  auth$ = this.authService.authMap$({
    export: 'brand_shop:stat:order_reports|batch_export'
  })
  constructor(
    private api: CourseApi,
    private authService: AuthService,
    private userService: UserService
  ) {}
  // 获取营收统计图信息
  getChart(query: CourseChartParams) {
    return this.api.getChart(query).pipe(
      tap(res => {
        const data = res.info
        const saleCourse = data.sale_course
        const checkInCourse = data.checkin_course
        const notCheckInCourse = data.not_checkin_course
        let soldChartData: any = []
        let checkInChartData: any = []
        let notCheckInChartData: any = []
        soldChartData = [
          {
            name: '私教课售课',
            value: saleCourse.sale_personal_num,
            percent: saleCourse.personal_checkin_percentage
          },
          {
            name: '团体课售课',
            value: saleCourse.sale_team_num,
            percent: saleCourse.team_checkin_percentage
          }
        ]
        checkInChartData = [
          { name: '私教课消课', value: checkInCourse.personal_checkin_num },
          {
            name: '团体课消课',
            value: checkInCourse.team_checkin_num,
            percent: '10%'
          }
        ]
        notCheckInChartData = [
          {
            name: '未私教课消课',
            value: notCheckInCourse.personal_not_checkin_num
          },
          { name: '未团体课消课', value: notCheckInCourse.team_not_checkin_num }
        ]
        this.soldChartData$.commit(() => soldChartData)
        this.checkInChartData$.commit(() => checkInChartData)
        this.notCheckInChartData$.commit(() => notCheckInChartData)
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
      })
    )
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getList(to.meta.query)
  }
}
