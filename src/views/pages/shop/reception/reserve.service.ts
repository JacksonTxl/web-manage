import { ReserveApi, GetListInput } from './../../../../api/v1/front/reserve'
import { UserService } from '@/services/user.service'
import { Controller, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class ReserveService implements Controller {
  loading$ = new State({})
  page$ = new State({})
  list$ = new State([])
  reserveType$ = this.userService.getOptions$('front.reserve_type').pipe(
    map((list: any) => {
      return [{ value: -1, label: '全部' }, ...cloneDeep(list)]
    })
  )
  // courseCancel$ = new

  constructor(
    private userService: UserService,
    private api: ReserveApi,
    private msg: MessageService,
    private authService: AuthService
  ) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getList(params).pipe(
      tap((res: any) => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  /**
   * TODO: 聚合权限判断 私教课，私教小团课， 团课权限判断，最好后端优化
   */
  private mapList(list: any, authMap: any) {
    return list.map((item: any) => {
      for (let key in item.auth) {
        if (item.auth[key] === 1) {
          key.includes('del') && (item.cancel = authMap.cancel.includes(key))
          key.includes('checkin') &&
            (item.checkin =
              authMap.checkin.includes(key) || authMap.visit.includes(key))
        }
      }
      return item
    })
  }
  confirmVisitReserve(id: number) {
    return this.api.confirmVisitReserve(id).pipe(
      tap(res => {
        this.msg.success({ content: '确认到访成功' })
      })
    )
  }
  cancelVisitReserve(id: number) {
    return this.api.cancelVisitReserve(id).pipe(
      tap(res => {
        this.msg.success({ content: '取消到访预约成功' })
      })
    )
  }
  cancelCourseReserve(params: any) {
    return this.api.cancelCourseReserve(params).pipe(
      tap(res => {
        this.msg.success({ content: '取消成功' })
      })
    )
  }
  confirmCourseReserve(params: any) {
    return this.api.confirmCourseReserve(params).pipe(
      tap(res => {
        this.msg.success({ content: '签到成功' })
      })
    )
  }
  // onPrint(params: any) {
  //   return this.api.onPrint(params).pipe(
  //     tap(res => {
  //       this.msg.success({ content: '打印成功' })
  //     })
  //   )
  // }
  init(query: any) {
    return forkJoin([this.getList(query)])
  }
  beforeEach(to: ServiceRoute) {
    console.log(to.meta.query)
    return this.init(to.meta.query)
  }
}
