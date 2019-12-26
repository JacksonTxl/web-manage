import {
  PersonalScheduleListQuery,
  UpdateScheduleInput,
  AddScheduleInBatchInput,
  AddScheduleInput,
  CopyInput
} from '@/api/v1/schedule/personal/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, switchMap } from 'rxjs/operators'
import { PersonalScheduleApi } from '@/api/v1/schedule/personal/schedule'
import { MessageService } from '@/services/message.service'
import moment from 'moment'

@Injectable()
export class PersonalScheduleScheduleService {
  scheduleTeamCourseList$ = new State([])
  scheduleTable$ = new State([])
  refresh$ = new State(0)
  loading$ = new State({})

  constructor(
    private scheduleApi: PersonalScheduleApi,
    private msg: MessageService
  ) {}
  SET_SCHEDULE_TEAM_COURSE_LIST(resList: any[] = []) {
    const _list = resList.map((item: any) => {
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

    this.scheduleTeamCourseList$.commit(() => _list)
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
        this.SET_SCHEDULE_TEAM_COURSE_LIST(res.list)
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
        this.scheduleTable$.commit(() => res.list)
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
  @Effect()
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
