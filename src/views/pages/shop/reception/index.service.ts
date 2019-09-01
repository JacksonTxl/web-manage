import { Injectable, RouteGuard } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import {
  FrontApi,
  GetMemberListInput,
  SetEntranceInput,
  EditEntranceCabinetInput,
  EditSellerInput,
  EditCoachInput
} from '@/api/v1/front'
import { MemberApi, EditFaceParams } from '@/api/v1/member'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class IndexService implements RouteGuard {
  loading$ = new State({})
  workNoteList$ = new State([])
  workNoteDoneList$ = new State([])
  memberListAction$: Action<any>
  memberList$ = new State([])
  summaryInfo$ = new State({})
  sellerList$ = new State([])
  coachList$ = new State([])
  entranceOptionList$ = new State([])
  cabinetList$ = new State([])
  auth$ = this.authService.authMap$({
    today_order: 'shop:front_end:module|today_order',
    today_reserve: 'shop:front_end:module|today_reserve',
    today_team_course: 'shop:front_end:module|today_team_course',
    today_revenue: 'shop:front_end:module|today_income',
    today_entry: 'shop:front_end:module|today_check_in',
    orderPage: 'shop:front_end:module|order',
    reservePage: 'shop:front_end:module|reserve_page',
    checkInPage: 'shop:front_end:module|check_in_page',
    temporaryPage: 'shop:front_end:module|temporary_page',
    schedulePage: 'shop:front_end:module|schedule_page',
    cabinetPage: 'shop:front_end:module|cabinet_page',
    addVisit: 'shop:reserve:visit_reserve|add',
    checkin: 'shop:front_end:check_in_out|checkin',
    checkout: 'shop:front_end:check_in_out|checkout',
    batchCheckout: 'shop:front_end:check_in_out|batch_checkout',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
    editFace: 'brand_shop:iot:face|edit',
    addTodo: 'shop:front_end:todo|add',
    delTeamCourse: 'shop:reserve:team_course_reserve|del',
    delPersonalCourse: 'shop:reserve:personal_course_reserve|del',
    delPersonalTeamCourse: 'shop:reserve:personal_team_course_reserve|del',
    checkinTeamCourse: 'shop:reserve:team_course_reserve|checkin',
    checkinPersonalCourse: 'shop:reserve:personal_course_reserve|checkin',
    checkinPersonalTeamCourse:
      'shop:reserve:personal_team_course_reserve|checkin',
    delVisit: 'shop:reserve:visit_reserve|del',
    checkinVisit: 'shop:reserve:visit_reserve|checkin',
    export: 'shop:front_end:check_in_out|export'
  })
  constructor(
    private authService: AuthService,
    private frontApi: FrontApi,
    private memberApi: MemberApi
  ) {
    this.memberListAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((query: GetMemberListInput) =>
          this.getMemberList(query).pipe(catchError(() => EMPTY))
        ),
        tap(res => {
          this.memberList$.commit(() => res.list)
        })
      )
    })
  }
  @Effect()
  getMemberList(query: GetMemberListInput) {
    return this.frontApi.getMemberList(query)
  }
  setMemberList(list: any) {
    this.memberList$.commit(() => list)
  }
  // 完成待办
  setWorkNote(id: string) {
    return this.frontApi.setWorkNote(id)
  }
  // 获取待办列表
  @Effect()
  getWorkNoteList() {
    return this.frontApi.getWorkNoteList().pipe(
      tap((res: any) => {
        this.workNoteList$.commit(() => res.list)
      })
    )
  }
  // 获取已完成待办列表
  @Effect()
  getWorkNoteDoneList() {
    return this.frontApi.getWorkNoteDoneList().pipe(
      tap((res: any) => {
        this.workNoteDoneList$.commit(() => res.list)
      })
    )
  }
  // 获取头部统计信息
  @Effect()
  getEntranceSummary() {
    return this.frontApi.getEntranceSummary().pipe(
      tap((res: any) => {
        Object.keys(res.info).forEach(i => {
          res.info[i].stChart = []
          res.info[i].chart.forEach((o: any) => {
            res.info[i].stChart.push({
              name: o.date,
              value: o.num
            })
          })
        })
        this.summaryInfo$.commit(() => res.info)
      })
    )
  }
  // 获取销售列表
  @Effect()
  getSellerList() {
    return this.frontApi.getSellerList().pipe(
      tap((res: any) => {
        this.sellerList$.commit(() => res.list)
      })
    )
  }
  // 获取销售列表
  @Effect()
  getCoachList() {
    return this.frontApi.getCoachList().pipe(
      tap((res: any) => {
        this.coachList$.commit(() => res.list)
      })
    )
  }
  // 获取会员详情
  @Effect()
  getMemberInfo(id: string) {
    return this.frontApi.getMemberInfo(id)
  }
  // 会员入场
  @Effect()
  setEntrance(params: SetEntranceInput) {
    return this.frontApi.setEntrance(params)
  }
  // 获取入场凭证列表
  @Effect()
  getEntranceOptionList(id: string) {
    return this.frontApi.getEntranceOptionList(id).pipe(
      tap((res: any) => {
        this.entranceOptionList$.commit(() => res.list)
      })
    )
  }
  resetEntranceOptionList() {
    this.entranceOptionList$.commit(() => [])
  }
  // 获取储物柜列表
  @Effect()
  getCabinetList(id: string) {
    return this.frontApi.getCabinetList(id).pipe(
      tap((res: any) => {
        this.cabinetList$.commit(() => res.list)
      })
    )
  }
  resetCabinetList() {
    this.cabinetList$.commit(() => [])
  }
  // 修改入场会员储物柜
  editEntranceCabinet(params: EditEntranceCabinetInput) {
    return this.frontApi.editEntranceCabinet(params)
  }
  // 离场
  @Effect()
  setEntranceLeave(id: string) {
    return this.frontApi.setEntranceLeave(id)
  }
  // 修改跟进销售
  @Effect()
  editSeller(params: EditSellerInput) {
    return this.frontApi.editSeller(params)
  }
  // 修改跟进教练
  @Effect()
  editCoach(params: EditCoachInput) {
    return this.frontApi.editCoach(params)
  }
  // 修改人脸图片
  @Effect()
  editFace(id: number, params: EditFaceParams) {
    return this.memberApi.updateUserFace(id, params)
  }
  init() {
    return forkJoin(
      this.getWorkNoteList(),
      this.getSellerList(),
      this.getCoachList(),
      this.getWorkNoteDoneList(),
      this.getEntranceSummary()
    )
  }
  beforeEach() {
    return this.init()
  }
}
