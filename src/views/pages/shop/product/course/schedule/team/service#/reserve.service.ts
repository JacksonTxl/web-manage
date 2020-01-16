import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  TeamScheduleReserveApi,
  AddReserveInput,
  CheckInput
} from '@/api/v1/schedule/team/reserve'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'

@Injectable()
export class TeamScheduleReserveService {
  infoAuth$ = new State([])
  reserveInfo$ = new State({})
  reserveList$ = new State([])
  auth$ = this.authService.authMap$({
    add: 'shop:reserve:team_course_reserve|add',
    cancel: 'shop:reserve:team_course_reserve|del',
    checkIn: 'shop:reserve:team_course_reserve|checkin'
  })
  constructor(
    private reserveApi: TeamScheduleReserveApi,
    private authService: AuthService,
    private msg: MessageService
  ) {}
  /**
   *
   * @param params
   * 添加预约
   */
  add(params: AddReserveInput) {
    return this.reserveApi.add(params).pipe(
      tap(res => {
        this.msg.success({
          content: '添加预约成功！！！'
        })
      })
    )
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(params: CheckInput) {
    return this.reserveApi.check(params).pipe(
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
        this.infoAuth$.commit(() => res.auth)
        this.reserveInfo$.commit(() => res.info)
        this.reserveList$.commit(() => res.list)
      })
    )
  }
  /**
   * 取消预约
   */
  del(id: string) {
    return this.reserveApi.del(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消预约成功' })
      })
    )
  }
}
