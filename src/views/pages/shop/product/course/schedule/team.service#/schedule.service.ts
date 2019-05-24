import { AddScheduleInput, UpdateScheduleInput, CopyScheduleInput, GetScheduleListQuery } from '../../../../../../../api/v1/schedule/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'
import { TeamScheduleScheduleApi } from '@/api/v1/schedule/team/schedule'

export interface SetState {
  scheduleTeamCourseList: any[],
}
@Injectable()
export class TeamScheduleScheduleService {
  state$: State<SetState>
  scheduleTeamCourseList$: Computed<any>

  constructor(private teamScheduleScheduleApi: TeamScheduleScheduleApi) {
    this.state$ = new State({
      scheduleTeamCourseList: []
    })
    this.scheduleTeamCourseList$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetScheduleListQuery) {
    return this.teamScheduleScheduleApi.getList(query).pipe(tap(res => {
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
  getScheduleTable(query: GetScheduleListQuery) {
    return this.teamScheduleScheduleApi.getScheduleTable(query)
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  add(params: AddScheduleInput) {
    return this.teamScheduleScheduleApi.add(params)
  }
  addScheduleInBatch(params: AddScheduleInput[]) {
    return this.teamScheduleScheduleApi.addScheduleInBatch(params)
  }
  /**
   *
   * @param params
   * 复制团体课排期
   */
  copy(params: CopyScheduleInput) {
    return this.teamScheduleScheduleApi.copy(params)
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.teamScheduleScheduleApi.update(params)
  }
  /**
   *
   * @param params
   * 编辑课程排期回显
   */
  getUpdateInfo(id: string) {
    return this.teamScheduleScheduleApi.getUpdateInfo(id)
  }
  /**
   *
   * @param params
   * 取消团体课排期
   */
  del(id: string) {
    return this.teamScheduleScheduleApi.del(id)
  }
}
