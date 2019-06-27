import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import {
  PersonalTeamScheduleScheduleApi,
  AddScheduleInput,
  UpdateScheduleInput,
  CopyScheduleInput,
  GetScheduleListQuery
} from '@/api/v1/schedule/personal-team/schedule'
import { AuthService } from '@/services/auth.service'

export interface SetState {
  courseList: any[],
  scheduleTable: any[],
  auth$: object
}
@Injectable()
export class PersonalTeamScheduleScheduleService {
  state$: State<SetState>
  courseList$: Computed<any>
  scheduleTable$: Computed<any>
  auth$: Computed<object>
  constructor(
    private scheduleApi: PersonalTeamScheduleScheduleApi,
    private authService: AuthService
  ) {
    this.state$ = new State({
      courseList: [],
      scheduleTable: [],
      auth: {
        add: this.authService.can('shop:schedule:personal_team_course_schedule|add'),
        addBatch: this.authService.can('shop:schedule:personal_team_course_schedule|batch_add'),
        copy: this.authService.can('shop:schedule:personal_team_course_schedule|copy')
      }
    })
    this.courseList$ = new Computed(this.state$.pipe(pluck('courseList')))
    this.scheduleTable$ = new Computed(this.state$.pipe(pluck('scheduleTable')))
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetScheduleListQuery) {
    return this.scheduleApi.getList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.courseList = res.list.map((item: any) => {
          return { // add new event data
            title: item.course_name,
            groupId: JSON.stringify(item),
            id: item.id,
            start: `${item.start_date} ${item.start_time}`,
            end: `${item.start_date} ${item.end_time}`
          }
        })
      })
    }))
  }
  /**
   *
   * @param params
   * 获取团体课排期表格
   */
  getTable(query: GetScheduleListQuery) {
    return this.scheduleApi.getTable(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.scheduleTable = []
        const dateList = Array.from(new Set(res.list.map((item: any) => item.start_date)))
        dateList.forEach((ele: any) => {
          let temp: any[] = []
          let daySchedule: any = { date: ele, data: [] }
          res.list.forEach((item: any) => {
            if (item.start_date === ele) {
              temp.push(item)
            }
          })
          daySchedule.data = temp
          state.scheduleTable.push(daySchedule)
        })
      })
    }))
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  add(params: AddScheduleInput) {
    return this.scheduleApi.add(params)
  }
  addScheduleInBatch(params: AddScheduleInput[]) {
    return this.scheduleApi.addScheduleInBatch(params)
  }
  /**
   *
   * @param params
   * 复制团体课排期
   */
  copy(params: CopyScheduleInput) {
    return this.scheduleApi.copy(params)
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.scheduleApi.update(params)
  }
  /**
   *
   * @param params
   * 编辑课程排期回显
   */
  getUpdateInfo(id: string) {
    return this.scheduleApi.getUpdateInfo(id)
  }
  /**
   *
   * @param params
   * 取消团体课排期
   */
  del(id: string) {
    return this.scheduleApi.del(id)
  }
}
