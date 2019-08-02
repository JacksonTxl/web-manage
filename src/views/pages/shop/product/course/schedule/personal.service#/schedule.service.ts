import {
  PersonalScheduleListQuery,
  GetScheduleListInput,
  UpdateScheduleInput,
  AddScheduleInBatchInput,
  AddScheduleInput,
  CopyInput
} from './../../../../../../../api/v1/schedule/personal/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck, switchMap } from 'rxjs/operators'
import { PersonalScheduleApi } from '@/api/v1/schedule/personal/schedule'
import { MessageService } from '@/services/message.service'
import moment from 'moment'
export interface SetState {
  scheduleTeamCourseList: any[]
  scheduleTable: any[]
}
@Injectable()
export class PersonalScheduleScheduleService {
  state$: State<SetState>
  scheduleTeamCourseList$: Computed<any>
  scheduleTable$: Computed<any>
  refresh$: Computed<any>

  constructor(
    private scheduleApi: PersonalScheduleApi,
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
  getList(query: PersonalScheduleListQuery) {
    return this.scheduleApi.getList(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.scheduleTeamCourseList = res.list.map((item: any) => {
            let end_date = ''
            if (
              moment(`${item.start_date} ${item.start_time}`).valueOf() >=
              moment(`${item.start_date} ${item.end_time}`).valueOf()
            ) {
              item.plusOne = '+1'
              end_date = moment(
                moment(`${item.start_date} ${item.start_time}`).valueOf() +
                  24 * 60 * 60 * 1000
              )
                .format('YYYY-MM-DD')
                .valueOf()
            } else {
              end_date = item.start_date
            }
            return {
              // add new event data
              title: item.course_name,
              groupId: JSON.stringify(item),
              id: item.id,
              start: `${item.start_date} ${item.start_time}`,
              end: `${end_date} ${item.end_time}`
            }
          })
        })
      })
    )
  }
  /**
   *
   * @param params
   * 获取团体课排期表格
   */
  getTable(query: PersonalScheduleListQuery) {
    return this.scheduleApi.getTable(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.scheduleTable = res.list
        })
      })
    )
  }
  /**
   *
   * @param params
   * 新增团体课排期
   */
  add(params: AddScheduleInput) {
    return this.scheduleApi.add(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加成功' })
      })
    )
  }
  addScheduleInBatch(params: AddScheduleInBatchInput) {
    return this.scheduleApi.addScheduleInBatch(params).pipe(
      switchMap(state => {
        return this.getList({})
      }),
      tap(res => {
        this.msg.success({ content: '批量添加成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 编辑课程排期
   */
  update(params: UpdateScheduleInput) {
    return this.scheduleApi.update(params).pipe(
      tap(res => {
        this.msg.success({ content: '编辑成功' })
      })
    )
  }
  delInBatch(ids: any) {
    return this.scheduleApi.delInBatch({ schedule_ids: ids }).pipe(
      tap(res => {
        this.msg.success({ content: '删除成功' })
      })
    )
  }
  copy(params: CopyInput) {
    return this.scheduleApi.copy(params).pipe(
      tap(res => {
        this.msg.success({ content: '复制成功' })
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
}
