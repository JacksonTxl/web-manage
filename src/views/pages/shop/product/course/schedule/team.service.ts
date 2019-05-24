import { PostScheduleInput, GetScheduleListQuery, ScheduleShopReserveInput, GetMemberInput, ConsumeQuery, PostScheduleCopyInput, UnUsedSeatQuery } from './../../../../../../api/v1/course/team/schedule'
import { TeamScheduleApi } from '@/api/v1/course/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap, debounce } from 'rxjs/operators'
import { forkJoin, timer } from 'rxjs'

export interface ScheduleCourse {
  scheduleTeamCourseList?: any[],
  courseOptions: any[],
  coachOptions: any[],
  courtOptions: any[],
  unUsedSeatOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class TeamService implements RouteGuard {
  state$: State<ScheduleCourse>
  scheduleTeamCourseList$: Computed<any>
  courseOptions$: Computed<any[]>
  coachOptions$: Computed<any[]>
  courtOptions$: Computed<any[]>
  unUsedSeatOptions$: Computed<any[]>
  consumeOptions$: Computed<any[]>

  constructor(private TeamScheduleApi: TeamScheduleApi) {
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
  protected SET_OPTIONS(options: ScheduleCourse) {
    this.state$.commit(state => {
      return { ...state, ...options }
    })
  }
  @Effect()
  postSchedule(params: PostScheduleInput) {
    return this.TeamScheduleApi.postSchedule(params).pipe(switchMap(state => {
      return this.getScheduleList({})
    }))
  }

  getScheduleInEdit(id: string) {
    return this.TeamScheduleApi.getScheduleInEdit(id)
  }

  putSchedule(id: string, params: any) {
    return this.TeamScheduleApi.putSchedule(id, params)
  }

  getScheduleById(id: string) {
    return this.TeamScheduleApi.getScheduleById(id)
  }

  postScheduleCopy(params: PostScheduleCopyInput) {
    return this.TeamScheduleApi.postScheduleCopy(params).pipe(switchMap(state => {
      return this.getScheduleList({})
    }))
  }
  postScheduleShopReserve(params: ScheduleShopReserveInput) {
    return this.TeamScheduleApi.postScheduleShopReserve(params)
  }
  getMemberByMemberName(query: GetMemberInput) {
    return this.TeamScheduleApi.getMemberByMemberName(query)
  }

  getScheduleCourseList() {
    return this.TeamScheduleApi.getScheduleCourseList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courseOptions = res.list
      })
    }))
  }
  getScheduleCoachList() {
    return this.TeamScheduleApi.getScheduleCoachList().pipe(tap(res => {
      this.state$.commit(state => {
        state.coachOptions = res.list
      })
    }))
  }
  getScheduleCourtList() {
    return this.TeamScheduleApi.getScheduleCourtList().pipe(tap(res => {
      this.state$.commit(state => {
        state.courtOptions = res.list
      })
    }))
  }

  getUnusedSeat(query: UnUsedSeatQuery) {
    return this.TeamScheduleApi.getUnusedSeat(query).pipe(tap(res => {
      this.state$.commit(state => {
        state.unUsedSeatOptions = res.list.map((item: any) => { return { id: item, name: item } })
      })
    }))
  }
  getScheduleConsume(query: ConsumeQuery) {
    return this.TeamScheduleApi.getScheduleConsume(query).pipe(
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
    return forkJoin(this.getScheduleCoachList(), this.getScheduleCourseList(), this.getScheduleCourtList())
  }
  init(query: any) {
    return forkJoin(this.getScheduleList(query), this.initOptions())
  }
  @Effect()
  getScheduleList(query: GetScheduleListQuery) {
    return this.TeamScheduleApi.getList(query).pipe(
      tap(res => {
        this.SET_SCHEDULE_TEAM_LIST(res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.getScheduleList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
