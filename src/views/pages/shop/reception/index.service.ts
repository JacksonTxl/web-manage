import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { FrontApi, GetMemberListInput, SetEntranceInput, EditEntranceCabinetInput } from '@/api/v1/front'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'

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
  constructor(private frontApi:FrontApi) {
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
  setEntranceLeave(id:string) {
    return this.frontApi.setEntranceLeave(id)
  }
  init() {
    return forkJoin(
      this.getWorkNoteList(),
      this.getSellerList(),
      this.getCoachList(),
      this.getWorkNoteDoneList(),
      this.getEntranceSummary())
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.init().subscribe(() => {
      next()
    })
  }
}
