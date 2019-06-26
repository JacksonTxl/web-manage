import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { State, Effect, Action } from 'rx-state/src'
import { FrontApi, GetMemberListInput } from '@/api/v1/front'
import { tap, debounceTime, switchMap, catchError } from 'rxjs/operators'
import { forkJoin, EMPTY } from 'rxjs'

@Injectable()
export class ReceptionService implements RouteGuard {
  loading$ = new State({})
  workNoteList$ = new State([])
  workNoteDoneList$ = new State([])
  memberListAction$: Action<any>
  memberList$ = new State([])
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
  init() {
    return forkJoin(this.getWorkNoteList(), this.getWorkNoteDoneList())
  }
  beforeEach(to:ServiceRoute, from:ServiceRoute, next:()=>{}) {
    this.init().subscribe(() => {
      next()
    })
  }
}
