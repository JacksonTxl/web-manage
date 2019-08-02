import { AuthService } from './../../../../../../../services/auth.service'
import {
  AddScheduleInput,
  UpdateScheduleInput,
  CopyScheduleInput,
  GetScheduleListQuery,
  GetScheduleTableQuery
} from '../../../../../../../api/v1/schedule/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck, switchMap } from 'rxjs/operators'
import { TeamScheduleScheduleApi } from '@/api/v1/schedule/team/schedule'
import moment from 'moment'
import { MessageService } from '@/services/message.service'

export interface SetState {
  scheduleTeamCourseList: any[]
  scheduleTable: any[]
}
@Injectable()
export class TeamScheduleScheduleService {
  state$: State<SetState>
  scheduleTeamCourseList$: Computed<any>
  scheduleTable$: Computed<any>
  refresh$: Computed<any>
  loading$ = new State({})
  constructor(
    private scheduleApi: TeamScheduleScheduleApi,
    private authService: AuthService,
    private msg: MessageService
  ) {
    this.state$ = new State({
      scheduleTeamCourseList: [],
      scheduleTable: [],
      refresh: 0
    })
    this.scheduleTeamCourseList$ = new Computed(
      this.state$.pipe(pluck('scheduleTeamCourseList'))
    )
    this.scheduleTable$ = new Computed(this.state$.pipe(pluck('scheduleTable')))
    this.refresh$ = new Computed(
      this.state$.pipe(pluck('scheduleTeamCourseList'))
    )
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetScheduleListQuery) {
    return this.scheduleApi.getList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.scheduleTeamCourseList = res.list
          // .map((item: any) => {
          //   let end_date = ''
          //   if (moment(`${item.start_date} ${item.start_time}`).valueOf() >= moment(`${item.start_date} ${item.end_time}`).valueOf()) {
          //     item.plusOne = '+1'
          //     end_date = moment(moment(`${item.start_date} ${item.start_time}`).valueOf() + 24 * 60 * 60 * 1000).format('YYYY-MM-DD').valueOf()
          //   } else {
          //     end_date = item.start_date
          //   }
          //   return { // add new event data
          //     title: item.course_name,
          //     groupId: JSON.stringify(item),
          //     id: item.id,
          //     auth: item.auth,
          //     start: `${item.start_date} ${item.start_time}`,
          //     end: `${end_date} ${item.end_time}`
          //   }
          // })
        })
      })
    )
  }
  /**
   *
   * @param params
   * 获取团体课排期表格
   */
  getTable(query: GetScheduleTableQuery) {
    return this.scheduleApi.getTable(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.scheduleTable = []
          const dateList = Array.from(
            new Set(res.list.map((item: any) => item.start_date))
          )
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
      })
    )
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  @Effect()
  add(params: AddScheduleInput) {
    return this.scheduleApi.add(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加成功' })
      })
    )
  }
  @Effect()
  addScheduleInBatch(params: AddScheduleInput[]) {
    return this.scheduleApi.addScheduleInBatch(params).pipe(
      tap(res => {
        this.msg.success({ content: '批量添加成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 复制团体课排期
   */
  @Effect()
  copy(params: CopyScheduleInput) {
    return this.scheduleApi.copy(params).pipe(
      tap(res => {
        this.msg.success({ content: '复制成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  @Effect()
  update(params: UpdateScheduleInput) {
    return this.scheduleApi.update(params).pipe(
      tap(res => {
        this.msg.success({ content: '编辑成功' })
      })
    )
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
    return this.scheduleApi.del(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消成功' })
      })
    )
  }
}
