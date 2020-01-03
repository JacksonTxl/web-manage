import { AuthService } from '@/services/auth.service'
import {
  SmallCourseScheduleApi,
  AddScheduleInput,
  UpdateScheduleInput,
  GetScheduleListQuery,
  GetScheduleTableQuery
} from '@/api/v1/schedule/small-course/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck } from 'rxjs/operators'
import { MessageService } from '@/services/message.service'

export interface SetState {
  scheduleSmallCourseList: any[]
  scheduleTable: any[]
}
@Injectable()
export class SmallCourseScheduleService {
  state$: State<SetState>
  scheduleSmallCourseList$: Computed<any>
  scheduleTable$: Computed<any>
  refresh$: Computed<any>
  loading$ = new State({})
  constructor(
    private scheduleApi: SmallCourseScheduleApi,
    private authService: AuthService,
    private msg: MessageService
  ) {
    this.state$ = new State({
      scheduleSmallCourseList: [],
      scheduleTable: [],
      refresh: 0
    })
    this.scheduleSmallCourseList$ = new Computed(
      this.state$.pipe(pluck('scheduleSmallCourseList'))
    )
    this.scheduleTable$ = new Computed(this.state$.pipe(pluck('scheduleTable')))
    this.refresh$ = new Computed(
      this.state$.pipe(pluck('scheduleSmallCourseList'))
    )
  }
  /**
   *
   * @param params
   * 获取小班课排期列表
   */
  @Effect()
  getList(query: GetScheduleListQuery) {
    return this.scheduleApi.getList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.state$.commit(state => {
          state.scheduleSmallCourseList = res.list
        })
      })
    )
  }
  /**
   *
   * @param params
   * 获取小班课排期表格
   */
  getTable(query: GetScheduleTableQuery) {
    console.log('getTable')
    return this.scheduleApi.getList({ size: 999, ...query }).pipe(
      tap(res => {
        //res = this.authService.filter(res)
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
   * 新增小班课排期
   */
  @Effect()
  add(params: any) {
    return this.scheduleApi.add(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 批量新增周期小班课排期
   */
  @Effect()
  addScheduleInBatch(params: any) {
    return this.scheduleApi.addScheduleInBatch(params).pipe(
      tap(res => {
        console.log(res)
        if (!res.conflict) {
          this.msg.success({ content: '批量添加成功' })
        }
      })
    )
  }
  /**
   *
   * @param params
   * 批量编辑增加周期小班课排期
   */
  @Effect()
  editScheduleInBatchs(params: any) {
    return this.scheduleApi.editScheduleInBatchs(params).pipe(
      tap(res => {
        if (!res.conflict) {
          this.msg.success({ content: '批量添加成功' })
        }
      })
    )
  }
  /**
   *
   * @param params
   * 批量新增自定义小班课排期
   */
  @Effect()
  addScheduleInBatchCustom(params: any) {
    return this.scheduleApi.addScheduleInBatchCustom(params).pipe(
      tap(res => {
        if (!res.conflict) {
          this.msg.success({ content: '批量添加成功' })
        }
      })
    )
  }
  /**
   *
   * @param params
   * 批量编辑新增自定义小班课排期
   */
  @Effect()
  editScheduleInBatchCustoms(params: any) {
    return this.scheduleApi.editScheduleInBatchCustoms(params).pipe(
      tap(res => {
        this.msg.success({ content: '批量添加成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 批量编辑回显
   */
  @Effect()
  getScheduleInBatch(params: any) {
    return this.scheduleApi.getScheduleInBatch(params)
  }
  /**
   *
   * @param params
   * 编辑单个课程排期
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
   * 取消小课排期
   */
  del(id: string) {
    return this.scheduleApi.del(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 周期保存发布
   */
  save(id: string) {
    return this.scheduleApi.save(id).pipe(
      tap(res => {
        this.msg.success({ content: '发布成功' })
      })
    )
  }
  /**
   *
   * @param params
   * 自定义保存发布
   */
  saveCustom(params: any) {
    return this.scheduleApi.saveCustom(params).pipe(
      tap(res => {
        this.msg.success({ content: '发布成功' })
      })
    )
  }
  /**
   * 取消周期排期
   */
  cancelCycle(params: any) {
    return this.scheduleApi.cancelCycle(params).pipe(
      tap(res => {
        this.msg.success({ content: '取消排课成功' })
      })
    )
  }
  /**
   * 取消自主单个排期
   */
  cancelCustom(id: string) {
    return this.scheduleApi.cancelCustom(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消排课成功' })
      })
    )
  }
  /**
   * 取消自主所有排期
   */
  cancelCustomAll(params: string) {
    return this.scheduleApi.cancelCustomAll(params).pipe(
      tap(res => {
        this.msg.success({ content: '取消排课成功' })
      })
    )
  }
}
