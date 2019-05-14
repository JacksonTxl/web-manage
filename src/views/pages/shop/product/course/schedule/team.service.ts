import { GetScheduleTeamListQuery } from './../../../../../../api/v1/course/team/schedule'
import { ScheduleApi } from '@/api/v1/course/team/schedule'
import { RouteGuard, Injectable, ServiceRoute } from 'vue-service-app'
import { State, Effect, Computed } from 'rx-state/src'
import { tap, pluck } from 'rxjs/operators'

export interface ScheduleTeamCourse {
  scheduleTeamCourseList: any[]
}
@Injectable()
export class TeamService implements RouteGuard {
  state$: State<ScheduleTeamCourse>
  scheduleTeamCourseList$: Computed<any>
  constructor(private scheduleApi: ScheduleApi) {
    this.state$ = new State({
      scheduleTeamCourseList: []
    })
    this.scheduleTeamCourseList$ = new Computed(this.state$.pipe(pluck('scheduleTeamCourseList')))
  }
  protected SET_SCHEDULE_TEAM_LIST(list: any[]) {
    this.state$.commit(state => {
      state.scheduleTeamCourseList = list
    })
  }
  @Effect()
  getScheduleTeamList(query: GetScheduleTeamListQuery) {
    return this.scheduleApi.getScheduleTeamList(query).pipe(
      tap(res => {
        this.SET_SCHEDULE_TEAM_LIST(res.list)
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, form: ServiceRoute, next: any) {
    this.getScheduleTeamList(to.query).subscribe(() => {
      next()
    })
  }
}
