import { UpdateInput } from './../../../../../../../api/v1/schedule/personal/reserve'

import { Injectable } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state'
import { tap, pluck, switchMap } from 'rxjs/operators'
import { PersonalReserveApi, AddInput, GetListQuery } from '@/api/v1/schedule/personal/reserve'
import { AuthService } from '@/services/auth.service'
import { MessageService } from '@/services/message.service'
export interface SetState {
  reserveInfo: any
  reserveList: any[]
  reserveTable: any[]
  reserveUpdateInfo: any[],
  reserveListTable: any[]
}
@Injectable()
export class PersonalScheduleReserveService {
  // loading
  loading$ = new State({})
  // 业务状态
  list$ = new State([])
  page$ = new State({})
  state$: State<SetState>
  reserveInfo$: Computed<any>
  reserveTable$: Computed<any>
  reserveList$: Computed<any>
  reserveUpdateInfo$: Computed<any>
  reserveListTable$: Computed<any>
  auth$: Computed<any>
  constructor(private reserveApi: PersonalReserveApi,
    private authService: AuthService,
    private msg: MessageService) {
    this.state$ = new State({
      auth: {
        edit: this.authService.can('shop:reserve:personal_course_reserve|edit'),
        add: this.authService.can('shop:reserve:personal_course_reserve|add'),
        cancel: this.authService.can('shop:reserve:personal_course_reserve|del'),
        checkIn: this.authService.can('shop:reserve:personal_course_reserve|checkin')
      },
      reserveUpdateInfo: {},
      reserveInfo: [],
      reserveListTable: [],
      reserveList: [],
      reserveTable: []
    })
    this.auth$ = new Computed(this.state$.pipe(pluck('auth')))
    this.reserveList$ = new Computed(this.state$.pipe(pluck('reserveList')))
    this.reserveInfo$ = new Computed(this.state$.pipe(pluck('reserveInfo')))
    this.reserveTable$ = new Computed(this.state$.pipe(pluck('reserveTable')))
    this.reserveListTable$ = new Computed(this.state$.pipe(pluck('reserveListTable')))
    this.reserveUpdateInfo$ = new Computed(this.state$.pipe(pluck('reserveUpdateInfo')))
  }
  /**
 *
 * @param params
 * 添加预约
 */
  add(params: AddInput) {
    return this.reserveApi.add(params).pipe(tap(res => {
      this.msg.success({
        content: '添加预约成功！！！'
      })
    }))
  }
  /**
   *
   * @param params
   * 团体课签到消费
   */
  check(id: string) {
    return this.reserveApi.check(id).pipe(tap(res => {
      this.msg.success({
        content: '签到成功'
      })
    }))
  }
  update(update: UpdateInput) {
    return this.reserveApi.update(update).pipe(tap(res => {
      this.msg.success({
        content: '更新预约成功'
      })
    }))
  }
  /**
   *
   * @param id
   * 获取预约详情
   */
  @Effect()
  getInfo(id: string) {
    return this.reserveApi.getInfo(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.reserveInfo = res.info
        state.reserveList = res.info.reserve
      })
    }))
  }
  getUpdateInfo(id: any) {
    return this.reserveApi.getUpdateInfo(id).pipe(tap(res => {
      this.state$.commit(state => {
        state.reserveUpdateInfo = res.info
      })
    }))
  }
  /**
   * 取消预约
   */
  del(id: string) {
    return this.reserveApi.del(id).pipe(tap(res => {
      this.msg.success({ content: '取消预约成功' })
    }))
  }
  /**
   *
   * @param params
   * 获取团体课排期列表
   */
  @Effect()
  getList(query: GetListQuery) {
    return this.reserveApi.getList(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.reserveTable = res.list.map((item: any) => {
          return { // add new event data
            title: item.course_name,
            groupId: JSON.stringify(item),
            id: item.id,
            start: `${item.start_date} ${item.start_time}`,
            end: `${item.start_date} ${item.end_time}`
          }
        })
      })
    }),
    tap(res => {
      res = this.authService.filter(res)
      this.list$.commit(() => res.list)
      this.page$.commit(() => res.page)
    }))
  }
  /**
   *
   * curd
   */
  curd(fun: any, payload: any, callback: any) {
    const that = this as any
    return that[fun](payload).pipe(switchMap(state => {
      return this.getList({})
    })).subscribe(() => {
      callback()
    })
  }
}
