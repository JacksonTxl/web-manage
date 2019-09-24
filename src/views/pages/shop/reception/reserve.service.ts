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

  constructor(
    private userService: UserService,
    private api: ReserveApi,
    private msg: MessageService
  ) {}

  @Effect()
  getList(params: GetListInput) {
    return this.api.getList(params).pipe(
      tap((res: any) => {
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
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
