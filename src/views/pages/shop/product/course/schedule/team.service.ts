import { PostInput, GetListQuery, ShopReserveInput, GetMemberInput, ConsumeQuery, PostCopyInput, UnUsedSeatQuery } from './../../../../../../api/v1/course/team/schedule'
import { ScheduleApi } from '@/api/v1/course/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck, switchMap, debounce } from 'rxjs/operators'
import { forkJoin, timer } from 'rxjs'

export interface Course {
  scheduleTeamCourseList?: any[],
  courseOptions: any[],
  coachOptions: any[],
  courtOptions: any[],
  unUsedSeatOptions: any[],
  consumeOptions: any[]
}
@Injectable()
export class TeamService implements RouteGuard {
  state$: State<Course>
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
  protected SET_OPTIONS(options: Course) {
    this.state$.commit(state => {
      return { ...state, ...options }
    })
  }
  @Effect()
  post(params: PostInput) {
    return this.scheduleApi.post(params).pipe(switchMap(state => {
      return this.getList({})
    }))
  }

  getInEdit(id: string) {
    return this.scheduleApi.getInEdit(id)
  }

  put(id: string, params: any) {
    return this.scheduleApi.put(id, params)
  }

  getById(id: string) {
    return this.scheduleApi.getById(id)
  }
  postCopy(params: PostCopyInput) {
    return this.scheduleApi.postCopy(params).pipe(switchMap(state => {
      return this.getList({})
    }))
  }
  postShopBatch(params: any) {
    return this.scheduleApi.postShopBatch(params).pipe(switchMap(state => {
      return this.getList({})
    }))
  }
  postShopReserve(params: ShopReserveInput) {
    return this.scheduleApi.postShopReserve(params)
  }
  getMemberByMemberName(query: GetMemberInput) {
    return this.scheduleApi.getMemberByMemberName(query)
  }

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
  getCourtList() {
    return this.scheduleApi.getCourtList().pipe(tap(res => {
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
  getConsume(query: ConsumeQuery) {
    return this.scheduleApi.getConsume(query).pipe(
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
    return forkJoin(this.getCoachList(), this.getCourseList(), this.getCourtList())
  }
  init(query: any) {
    return forkJoin(this.getList(query), this.initOptions())
  }
  @Effect()
  getList(query: GetListQuery) {
    return this.scheduleApi.getList(query).pipe(
      tap(res => {
        this.SET_SCHEDULE_TEAM_LIST(res.list)
      })
    )
  }
  beforeEach(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.getList(to.query).subscribe(() => {
      next()
    })
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.initOptions().subscribe(() => {
      next()
    })
  }
}
