import { ReserveApi, GetListInput } from './../../../../api/v1/front/reserve'
import { UserService } from '@/services/user.service'
import { RouteGuard, ServiceRoute, Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state/src'
import { tap, map } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import { MessageService } from '@/services/message.service'
import { cloneDeep } from 'lodash-es'

@Injectable()
export class ReserveService implements RouteGuard {
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
    private msg: MessageService
  ) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => this.mapList(res.list, res.auth_map))
        this.page$.commit(() => res.page)
      })
    )
  }
  private mapList(list: any, authMap: any) {
    return list.map((item: any) => {
      for (let key in item.auth) {
        if (item.auth[key] === 1) {
          if (authMap.cancel.includes(key)) {
            item.cancel = 1
          }
          if (authMap.checkin.includes(key) || authMap.visit.includes(key)) {
            item.checkin = 1
          }
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
  init(query: any) {
    return forkJoin([this.getList(query)])
  }
  beforeEach(to: ServiceRoute) {
    console.log(to.meta.query)
    return this.init(to.meta.query)
  }
}
