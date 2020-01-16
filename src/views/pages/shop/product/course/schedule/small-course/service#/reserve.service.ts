import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  SmallCourseScheduleReserveApi,
  AddReserveInput
} from '@/api/v1/schedule/small-course/reserve'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'
export interface SetState {
  reserveInfo: any
  reserveList: any[]
  infoAuth: any
}
@Injectable()
export class SmallCourseScheduleReserveService {
  state$ = new State({})
  reserveInfo$ = new State({})
  reserveList$ = new State([])
  infoAuth$ = new State({})
  loading$ = new State({})
  auth$ = this.authService.authMap$({
    leave: 'shop:reserve:small_class_course_reserve|leave',
    remedial: 'shop:reserve:small_class_course_reserve|supplement',
    getInfo: 'shop:reserve:small_class_course_reserve|get_supplement',
    checkIn: 'shop:reserve:small_class_course_reserve|checkin',
    againCheckIn: 'shop:reserve:small_class_course_reserve|supplement_checkin',
    add: 'shop:reserve:small_class_course_reserve|add'
  })
  constructor(
    private reserveApi: SmallCourseScheduleReserveApi,
    private authService: AuthService,
    private msg: MessageService
  ) {}
  /**
   *
   * @param params
   * 添加预约
   */
  addAtion(params: AddReserveInput) {
    return this.reserveApi.addAtion(params).pipe(
      tap(res => {
        this.msg.success({
          content: '添加预约成功'
        })
      })
    )
  }
  /**
   *
   * @param params
   * 取消预约
   */
  cancellAtion(id: any) {
    return this.reserveApi.cancellAtion(id).pipe(
      tap(res => {
        this.msg.success({
          content: '取消预约成功'
        })
      })
    )
  }
  /**
   *
   * @param params
   * 小班课签到
   */
  check(id: any) {
    return this.reserveApi.check(id).pipe(
      tap(res => {
        this.msg.success({ content: '签到消费成功' })
      })
    )
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  @Effect()
  getInfo(id: string) {
    return this.reserveApi.getInfo(id).pipe(
      tap(res => {
        console.log(res)
        res = this.authService.filter(res, 'list')
        res = this.authService.filter(res, 'auth')
        this.infoAuth$.commit(() => res.auth)
        this.reserveInfo$.commit(() => res.info)
        this.reserveList$.commit(() => res.list)
      })
    )
  }
  /**
   * 取消排期
   */
  cancel(id: string) {
    return this.reserveApi.cancel(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消排课成功' })
      })
    )
  }
  /**
   * 添加补课
   */
  remedial(params: any) {
    return this.reserveApi.remedial(params).pipe(
      tap(res => {
        this.msg.success({ content: '添加成功' })
      })
    )
  }
  /**
   * 补签到
   */
  checkSign(id: any) {
    return this.reserveApi.checkSign(id).pipe(
      tap(res => {
        this.msg.success({ content: '补签到成功' })
      })
    )
  }
  /**
   * 请假
   */
  leave(id: any) {
    return this.reserveApi.leave(id).pipe(
      tap(res => {
        this.msg.success({ content: '请假成功' })
      })
    )
  }
  /**
   * 查看补课
   */
  getMessage(id: string) {
    return this.reserveApi.getMessage(id)
  }
  /**
   * 补课回显
   */
  courseInfo(id: string) {
    return this.reserveApi.courseInfo(id)
  }
  // 排期列表
  sheduleList(params: any) {
    return this.reserveApi.sheduleList(params)
  }
  // 补课列表
  courseList(id: string) {
    return this.reserveApi.courseList(id)
  }
}
