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

export interface SetState {
  courseList: any[],
}
@Injectable()
export class PersonalTeamScheduleScheduleService {
  state$: State<SetState>
  courseList$: Computed<any>

  constructor(private scheduleApi: PersonalTeamScheduleScheduleApi) {
    this.state$ = new State({
      courseList: []
    })
    this.courseList$ = new Computed(this.state$.pipe(pluck('courseList')))
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
  getScheduleTable(query: GetScheduleListQuery) {
    return this.scheduleApi.getScheduleTable(query)
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
