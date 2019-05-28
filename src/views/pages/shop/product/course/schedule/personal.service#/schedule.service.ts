import { AddInput, GetScheduleListInput } from './../../../../../../../api/v1/schedule/personal/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap } from 'rxjs/operators'
import { TeamScheduleScheduleApi } from '@/api/v1/schedule/team/schedule'
import { bindCallback } from 'rxjs'
import { PersonalScheduleApi } from '@/api/v1/schedule/personal/schedule'
import { GetListQuery } from '@/api/v1/schedule/personal/reserve'

export interface SetState {
  scheduleTeamCourseList: any[],
}
@Injectable()
export class PersonalScheduleScheduleService {
  state$: State<SetState>
  scheduleTeamCourseList$: Computed<any>
  refresh$: Computed<any>

  constructor(private scheduleApi: PersonalScheduleApi) {
    this.state$ = new State({
      scheduleTeamCourseList: [],
      refresh: 0
    })
    this.scheduleTeamCourseList$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
    this.refresh$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetListQuery) {
    return this.scheduleApi.getList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.scheduleTeamCourseList = res.list.map((item: any) => {
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
  getScheduleTable(query: GetScheduleListInput) {
    return this.scheduleApi.getScheduleTable(query)
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  add(params: AddInput) {
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
  //
  curd(fun: string, payload: any, callback: any) {
    const that = this as any
    return that[fun](payload).pipe(switchMap(state => {
      return this.getList({})
    })).subscribe(() => {
      callback()
    })
  }
}
