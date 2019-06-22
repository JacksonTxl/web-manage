import { AuthService } from './../../../../../../../services/auth.service'
import { AddScheduleInput, UpdateScheduleInput, CopyScheduleInput, GetScheduleListQuery, GetScheduleTableQuery } from '../../../../../../../api/v1/schedule/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap } from 'rxjs/operators'
import { TeamScheduleScheduleApi } from '@/api/v1/schedule/team/schedule'
import { bindCallback } from 'rxjs'

export interface SetState {
  scheduleTeamCourseList: any[],
  scheduleTable: any[]
}
@Injectable()
export class TeamScheduleScheduleService {
  state$: State<SetState>
  scheduleTeamCourseList$: Computed<any>
  scheduleTable$: Computed<any>
  refresh$: Computed<any>

  constructor(private scheduleApi: TeamScheduleScheduleApi, private authService: AuthService) {
    this.state$ = new State({
      scheduleTeamCourseList: [],
      scheduleTable: [],
      refresh: 0
    })
    this.scheduleTeamCourseList$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
    this.scheduleTable$ = new Computed(this.state$.pipe(pluck('scheduleTable')))
    this.refresh$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetScheduleListQuery) {
    return this.scheduleApi.getList(query).pipe(tap(res => {
      res = this.authService.filter(res)
      this.state$.commit(state => {
        state.scheduleTeamCourseList = res.list.map((item: any) => {
          return { // add new event data
            title: item.course_name,
            groupId: JSON.stringify(item),
            id: item.id,
            auth: item.auth,
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
  getTable(query: GetScheduleTableQuery) {
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
    return this.scheduleApi.addScheduleInBatch(params).pipe(switchMap(state => {
      return this.getList({})
    }))
  }
  /**
   *
   * @param params
   * 复制团体课排期
   */
  copy(params: CopyScheduleInput) {
    return this.scheduleApi.copy(params).pipe(switchMap(state => {
      return this.getList({})
    }))
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.scheduleApi.update(params).pipe(switchMap(state => {
      return this.getList({})
    }))
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
    return this.scheduleApi.del(id).pipe(switchMap(state => {
      return this.getList({})
    }))
  }
  curd(fun: string, payload: any, callback: any) {
    const that = this as any
    return that[fun](payload).pipe(switchMap(state => {
      return this.getList({})
    })).subscribe(() => {
      callback()
    })
  }
}
