import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import { MemberApi } from '@/api/v1/member'
import { forkJoin } from 'rxjs'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'

@Injectable()
export class SoldService implements Controller {
  soldListInfo$ = new State([])
  soldPage$ = new State({})
  entranceList$ = new State([])
  entrancePage$ = new State({})
  auth$ = new State([])
  constructor(
    private memberApi: MemberApi,
    private authService: AuthService,
    private msg: MessageService
  ) {}
  getMemberReserve(id: string, params: any) {
    return this.memberApi.getMemberReserve(id, params).pipe(
      tap(res => {
        this.soldListInfo$.commit(() => res.list)
        this.soldPage$.commit(() => res.page)
      })
    )
  }
  getMemberEntrance(id: string, params: any) {
    return this.memberApi.getMemberEntrance(id, params).pipe(
      tap(res => {
        this.entranceList$.commit(() => res.list)
        this.entrancePage$.commit(() => res.page)
      })
    )
  }
  getMemberCancel(params: any) {
    return this.memberApi.getMemberCancel(params)
  }
  getMemberSign(params: any) {
    return this.memberApi.getMemberSign(params)
  }
  del(id: any) {
    return this.memberApi.del(id).pipe(
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
    return this.memberApi.check(id).pipe(
      tap(res => {
        this.msg.success({ content: '签到消费成功' })
      })
    )
  }
  /**
   * 补签到
   */
  checkSign(id: any) {
    return this.memberApi.checkSign(id).pipe(
      tap(res => {
        this.msg.success({ content: '补签到成功' })
      })
    )
  }
  /**
   * 请假
   */
  leave(id: any) {
    return this.memberApi.leave(id).pipe(
      tap(res => {
        this.msg.success({ content: '请假成功' })
      })
    )
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  // @Effect()
  // getInfo(id: string) {
  //   return this.reserveApi.getInfo(id).pipe(
  //     tap(res => {
  //       console.log(res)
  //       this.infoAuth$.commit(() => res.auth)
  //       this.reserveInfo$.commit(() => res.info)
  //       this.reserveList$.commit(() => res.list)
  //     })
  //   )
  // }
  /**
   * 补课回显
   */
  courseInfo(id: string) {
    return this.memberApi.courseInfo(id)
  }
  /**
   * 查看补课
   */
  message(id: string) {
    return this.memberApi.msg(id)
  }
  init(id: string, params: any) {
    return forkJoin(
      this.getMemberReserve(id, params),
      this.getMemberEntrance(id, { size: 20, page: 1 })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id, {
      reserve_type: 1,
      size: 20,
      page: 1
    })
  }
}
