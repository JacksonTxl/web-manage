import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state'
import { FrontApi, GetMemberListInput, SetEntranceInput, EditEntranceCabinetInput, EditSellerInput, EditCoachInput } from '@/api/v1/front'
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
  auth$ = new State({
    today_order: this.authService.can('shop:front_end:module|today_order'),
    today_reserve: this.authService.can('shop:front_end:module|today_reserve'),
    today_team_course: this.authService.can('shop:front_end:module|today_team_course'),
    today_revenue: this.authService.can('shop:front_end:module|today_income'),
    today_entry: this.authService.can('shop:front_end:module|today_check_in'),
    orderPage: this.authService.can('shop:front_end:module|order'),
    reservePage: this.authService.can('shop:front_end:module|reserve_page'),
    checkInPage: this.authService.can('shop:front_end:module|check_in_page'),
    temporaryPage: this.authService.can('shop:front_end:module|temporary_page'),
    schedulePage: this.authService.can('shop:front_end:module|schedule_page'),
    cabinetPage: this.authService.can('shop:front_end:module|cabinet_page'),
    addVisit: this.authService.can('shop:reserve:visit_reserve|add'),
    checkin: this.authService.can('shop:front_end:check_in_out|checkin'),
    checkout: this.authService.can('shop:front_end:check_in_out|checkout'),
    batchCheckout: this.authService.can('shop:front_end:check_in_out|batch_checkout'),
    bindCoach: this.authService.can('shop:member:member|bind_coach'),
    bindSalesman: this.authService.can('shop:member:member|bind_salesman'),
    editFace: this.authService.can('brand_shop:iot:face|edit'),
    addTodo: this.authService.can('shop:front_end:todo|add'),
    delTeamCourse: this.authService.can('shop:reserve:team_course_reserve|del'),
    delPersonalCourse: this.authService.can('shop:reserve:personal_course_reserve|del'),
    delPersonalTeamCourse: this.authService.can('shop:reserve:personal_team_course_reserve|del'),
    checkinTeamCourse: this.authService.can('shop:reserve:team_course_reserve|checkin'),
    checkinPersonalCourse: this.authService.can('shop:reserve:personal_course_reserve|checkin'),
    checkinPersonalTeamCourse: this.authService.can('shop:reserve:personal_team_course_reserve|checkin'),
    delVisit: this.authService.can('shop:reserve:visit_reserve|del'),
    checkinVisit: this.authService.can('shop:reserve:visit_reserve|checkin'),
    export: this.authService.can('shop:front_end:check_in_out|export')
  })
  constructor(private authService: AuthService, private frontApi:FrontApi, private memberApi:MemberApi) {
    this.memberListAction$ = new Action(data$ => {
      return data$.pipe(
        debounceTime(200),
        switchMap((query:GetMemberListInput) => this.getMemberList(query).pipe(catchError(() => EMPTY))),
        tap(res => {
          this.memberList$.commit(() => res.list)
        })
      )
    })
  }
  @Effect()
  getMemberList(query:GetMemberListInput) {
    return this.frontApi.getMemberList(query)
  }
  setMemberList(list:any) {
    this.memberList$.commit(() => list)
  }
  // 完成待办
  setWorkNote(id:string) {
    return this.frontApi.setWorkNote(id)
  }
  // 获取待办列表
  @Effect()
  getWorkNoteList() {
    return this.frontApi.getWorkNoteList().pipe(tap((res:any) => {
      this.workNoteList$.commit(() => res.list)
    }))
  }
  // 获取已完成待办列表
  @Effect()
  getWorkNoteDoneList() {
    return this.frontApi.getWorkNoteDoneList().pipe(tap((res:any) => {
      this.workNoteDoneList$.commit(() => res.list)
    }))
  }
  // 获取头部统计信息
  @Effect()
  getEntranceSummary() {
    return this.frontApi.getEntranceSummary().pipe(tap((res:any) => {
      Object.keys(res.info).forEach(i => {
        res.info[i].stChart = []
        res.info[i].chart.forEach((o:any) => {
          res.info[i].stChart.push({
            name: o.date,
            value: o.num
          })
        })
      })
      this.summaryInfo$.commit(() => res.info)
    }))
  }
  // 获取销售列表
  @Effect()
  getSellerList() {
    return this.frontApi.getSellerList().pipe(tap((res:any) => {
      this.sellerList$.commit(() => res.list)
    }))
  }
  // 获取销售列表
  @Effect()
  getCoachList() {
    return this.frontApi.getCoachList().pipe(tap((res:any) => {
      this.coachList$.commit(() => res.list)
    }))
  }
  // 获取会员详情
  @Effect()
  getMemberInfo(id:string) {
    return this.frontApi.getMemberInfo(id)
  }
  // 会员入场
  @Effect()
  setEntrance(params: SetEntranceInput) {
    return this.frontApi.setEntrance(params)
  }
  // 获取入场凭证列表
  @Effect()
  getEntranceOptionList(id:string) {
    return this.frontApi.getEntranceOptionList(id).pipe(tap((res:any) => {
      this.entranceOptionList$.commit(() => res.list)
    }))
  }
  resetEntranceOptionList() {
    this.entranceOptionList$.commit(() => [])
  }
  // 获取储物柜列表
  @Effect()
  getCabinetList(id:string) {
    return this.frontApi.getCabinetList(id).pipe(tap((res:any) => {
      this.cabinetList$.commit(() => res.list)
    }))
  }
  resetCabinetList() {
    this.cabinetList$.commit(() => [])
  }
  // 修改入场会员储物柜
  editEntranceCabinet(params:EditEntranceCabinetInput) {
    return this.frontApi.editEntranceCabinet(params)
  }
  // 离场
  @Effect()
  setEntranceLeave(id:string) {
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
      this.getEntranceSummary())
  }
  beforeEach() {
    return this.init()
  }
}
