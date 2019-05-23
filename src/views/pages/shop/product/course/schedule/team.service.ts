import { PostScheduleTeamInput, GetScheduleTeamListQuery, ScheduleTeamShopReserveInput, GetMemberInput, ConsumeQuery, PostScheduleTeamCopyInput, UnUsedSeatQuery } from './../../../../../../api/v1/course/team/schedule'
import { ScheduleApi } from '@/api/v1/course/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap, debounce } from 'rxjs/operators'
import { forkJoin, timer } from 'rxjs'

export interface ScheduleTeamCourse {
  scheduleTeamCourseList?: any[],
  courseOptions: any[],
  coachOptions: any[],
  courtOptions: any[],
  unUsedSeatOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class TeamService implements RouteGuard {
  state$: State<ScheduleTeamCourse>
  scheduleTeamCourseList$: Computed<any>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  unUsedSeatOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(private scheduleApi: ScheduleApi) {
    this.state$ = new State({
      scheduleTeamCourseList: [],
      courseOptions: [],
      coachOptions: [],
      unUsedSeatOptions: [],
      consumeOptions: [],
      courtOptions: []
    })
    this.consumeOptions$ = new Computed(this.state$.pipe(pluck('consumeOptions')))
    this.unUsedSeatOptions$ = new Computed(this.state$.pipe(pluck('unUsedSeatOptions')))
    this.courseOptions$ = new Computed(this.state$.pipe(pluck('courseOptions')))
    this.coachOptions$ = new Computed(this.state$.pipe(pluck('coachOptions')))
    this.courtOptions$ = new Computed(this.state$.pipe(pluck('courtOptions')))
    this.scheduleTeamCourseList$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
  }
  protected SET_SCHEDULE_TEAM_LIST(list: any[]) {
    this.state$.commit(state => {
      state.scheduleTeamCourseList = list
    })
  }
  protected SET_OPTIONS(options: ScheduleTeamCourse) {
    this.state$.commit(state => {
      return { ...state, ...options }
    })
  }
  @Effect()
  postScheduleTeam(params: PostScheduleTeamInput) {
    return this.scheduleApi.postScheduleTeam(params).pipe(switchMap(state => {
      return this.getScheduleTeamList({})
    }))
  }

  getScheduleTeamInEdit(id: string) {
    return this.scheduleApi.getScheduleTeamInEdit(id)
  }

  putScheduleTeam(id: string, params: any) {
    return this.scheduleApi.putScheduleTeam(id, params)
  }

  getScheduleTeamById(id: string) {
    return this.scheduleApi.getScheduleTeamById(id)
  }

  postScheduleTeamCopy(params: PostScheduleTeamCopyInput) {
    return this.scheduleApi.postScheduleTeamCopy(params).pipe(switchMap(state => {
      return this.getScheduleTeamList({})
    }))
  }
  postScheduleTeamShopReserve(params: ScheduleTeamShopReserveInput) {
    return this.scheduleApi.postScheduleTeamShopReserve(params)
  }
  getMemberByMemberName(query: GetMemberInput) {
    return this.scheduleApi.getMemberByMemberName(query)
  }

  getScheduleTeamCourseList() {
    return this.scheduleApi.getScheduleTeamCourseList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courseOptions = res.list
      })
    }))
  }
  getScheduleTeamCoachList() {
    return this.scheduleApi.getScheduleTeamCoachList().pipe(tap(res => {
      this.state$.commit(state => {
        state.coachOptions = res.list
      })
    }))
  }
  getScheduleTeamCourtList() {
    return this.scheduleApi.getScheduleTeamCourtList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courtOptions = res.list
      })
    }))
  }

  getUnusedSeat(query: UnUsedSeatQuery) {
    return this.scheduleApi.getUnusedSeat(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.unUsedSeatOptions = res.list.map((item: any) => { return { id: item, name: item } })
      })
    }))
  }
  getScheduleTeamConsume(query: ConsumeQuery) {
    return this.scheduleApi.getScheduleTeamConsume(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.consumeOptions = res.list.map((ele: any) => {
            ele.children = ele.children.map((item: any) => {
              item.consume_type = ele.id
              return item
            })
            return ele
          })
        })
      }))
  }

  initOptions() {
    return forkJoin(this.getScheduleTeamCoachList(), this.getScheduleTeamCourseList(), this.getScheduleTeamCourtList())
  }
  init(query: any) {
    return forkJoin(this.getScheduleTeamList(query), this.initOptions())
  }
  @Effect()
  getScheduleTeamList(query: GetScheduleTeamListQuery) {
    return this.scheduleApi.getScheduleTeamList(query).pipe(
      tap(res => {
        this.SET_SCHEDULE_TEAM_LIST(res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.getScheduleTeamList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
