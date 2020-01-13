import { AuthService } from '@/services/auth.service'
import {
  TeamScheduleScheduleApi,
  AddScheduleInput,
  UpdateScheduleInput,
  CopyScheduleInput,
  GetScheduleListQuery,
  GetScheduleTableQuery
} from '@/api/v1/schedule/team/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

@Injectable()
export class TeamScheduleScheduleService {
  scheduleTeamCourseList$ = new State([])
  scheduleTable$ = new State([])
  teamTemplateList$ = new State([])
  refresh$ = new State(0)
  loading$ = new State({})
  constructor(
    private scheduleApi: TeamScheduleScheduleApi,
    private authService: AuthService,
    private msg: MessageService
  ) {}
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
        this.scheduleTeamCourseList$.commit(() => res.list)
      })
    )
  }
  SET_SCHEDULE_TABLE(resList: any[]) {
    const _table = [] as any[]
    const dateList = Array.from(
      new Set(resList.map((item: any) => item.start_date))
    )
    dateList.forEach((ele: any) => {
      let temp: any[] = []
      let daySchedule: any = { date: ele, data: [] }
      resList.forEach((item: any) => {
        if (item.start_date === ele) {
          temp.push(item)
        }
      })
      daySchedule.data = temp
      _table.push(daySchedule)
    })
    this.scheduleTable$.commit(() => _table)
  }
  /**
   *
   * @param params
   * 获取团体课排期表格
   */
  getTable(query: GetScheduleTableQuery) {
    return this.scheduleApi.getTable({ size: 999, ...query }).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.SET_SCHEDULE_TABLE(res.list)
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
  /**
   * 获取团课周课表管理列表
   */
  @Effect()
  getTeamTemplate() {
    return this.scheduleApi.getTeamTemplate().pipe(
      tap(res => {
        this.teamTemplateList$.commit(() => res.list)
      })
    )
  }
  /**
   * 删除团课
   */
  delTeamTemplate(params: any) {
    return this.scheduleApi.delTeamTemplate(params)
  }
}
