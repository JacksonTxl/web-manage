import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap, debounce } from 'rxjs/operators'
import { forkJoin } from 'rxjs'
import {
  PersonalScheduleApi,
  GetScheduleListInput,
  AddInput
  // PostScheduleTeamInput,
  // GetScheduleTeamListQuery,
  // ScheduleTeamShopReserveInput,
  // GetMemberInput,
  // ConsumeQuery,
  // PostScheduleTeamCopyInput,
  // UnUsedSeatQuery
} from '@/api/v1/schedule/personal'

export interface ScheduleState {
  scheduleList: object[],
  courseOptions: object[],
  coachOptions: object[],
  // courtOptions: any[],
  // unUsedSeatOptions: any[],
  // consumeOptions: any[]
}
@Injectable()
export class PersonalTeamService implements RouteGuard {
  state$: State<ScheduleState>
  scheduleList$: Computed<object[]>
  courseOptions$: Computed<object[]>
  coachOptions$: Computed<object[]>
  // courtOptions$: Computed<any[]>
  // unUsedSeatOptions$: Computed<any[]>
  // consumeOptions$: Computed<any[]>

  constructor(private scheduleApi: PersonalScheduleApi) {
    this.state$ = new State({
      scheduleList: [],
      courseOptions: [],
      coachOptions: []
      // unUsedSeatOptions: [],
      // consumeOptions: [],
      // courtOptions: []
    })
    this.scheduleList$ = new Computed(this.state$.pipe(pluck('scheduleList')))
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    // this.consumeOptions$ = new Computed(this.state$.pipe(pluck('consumeOptions')))
    // this.unUsedSeatOptions$ = new Computed(this.state$.pipe(pluck('unUsedSeatOptions')))

    // this.courtOptions$ = new Computed(this.state$.pipe(pluck('courtOptions')))
  }
  protected SET_SCHEDULE_LIST(list: any[]) {
    this.state$.commit(state => {
      state.scheduleList = list
    })
  }
  protected SET_OPTIONS(options: ScheduleState) {
    this.state$.commit(state => {
      return { ...state, ...options }
    })
  }
  @Effect()
  addSchedule(params: AddInput) {
    return this.scheduleApi.add(params)
  }

  // getScheduleTeamInEdit(id: string) {
  //   return this.scheduleApi.getScheduleTeamInEdit(id)
  // }

  // putScheduleTeam(id: string, params: any) {
  //   return this.scheduleApi.putScheduleTeam(id, params)
  // }

  // getScheduleTeamById(id: string) {
  //   return this.scheduleApi.getScheduleTeamById(id)
  // }

  // postScheduleTeamCopy(params: PostScheduleTeamCopyInput) {
  //   return this.scheduleApi.postScheduleTeamCopy(params).pipe(switchMap(state => {
  //     return this.getScheduleTeamList({})
  //   }))
  // }
  // postScheduleTeamShopReserve(params: ScheduleTeamShopReserveInput) {
  //   return this.scheduleApi.postScheduleTeamShopReserve(params)
  // }
  // getMemberByMemberName(query: GetMemberInput) {
  //   return this.scheduleApi.getMemberByMemberName(query)
  // }

  getCourseList() {
    return this.scheduleApi.getCourseList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courseOptions = res.list
      })
    }))
  }
  getCoachList() {
    return this.scheduleApi.getCoachList().pipe(tap(res => {
      this.state$.commit(state => {
        state.coachOptions = res.list
      })
    }))
  }
  // getScheduleTeamCourtList() {
  //   return this.scheduleApi.getScheduleTeamCourtList().pipe(tap(res => {
  //     this.state$.commit(state => {
  //       state.courtOptions = res.list
  //     })
  //   }))
  // }

  // getUnusedSeat(query: UnUsedSeatQuery) {
  //   return this.scheduleApi.getUnusedSeat(query).pipe(tap(res => {
  //     this.state$.commit(state => {
  //       state.unUsedSeatOptions = res.list.map((item: any) => { return { id: item, name: item } })
  //     })
  //   }))
  // }
  // getScheduleTeamConsume(query: ConsumeQuery) {
  //   return this.scheduleApi.getScheduleTeamConsume(query).pipe(
  //     tap(res => {
  //       this.state$.commit(state => {
  //         state.consumeOptions = res.list.map((ele: any) => {
  //           ele.children = ele.children.map((item: any) => {
  //             item.consume_type = ele.id
  //             return item
  //           })
  //           return ele
  //         })
  //       })
  //     }))
  // }

  initOptions() {
    return forkJoin(
      this.getCourseList(),
      this.getCoachList()
      // this.getScheduleTeamCourtList()
    )
  }
  init(query: any) {
    return forkJoin(
      this.getScheduleList(query),
      this.initOptions()
    )
  }
  @Effect()
  getScheduleList(query: GetScheduleListInput) {
    return this.scheduleApi.getScheduleList(query).pipe(
      tap(res => {
        this.SET_SCHEDULE_LIST(res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.getScheduleList(to.meta.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
