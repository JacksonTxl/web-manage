import { PostScheduleTeamInput, GetScheduleTeamListQuery } from './../../../api/v1/course/team/schedule'
import { CourseApi } from './../../../api/v1/setting/course'
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect, Action } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { ScheduleApi } from '@/api/v1/course/team/schedule'

@Injectable()
export class ScheduleService extends Store<any> {
  constructor(private scheduleApi: ScheduleApi) {
    super()
  }
  postScheduleTeam(params: PostScheduleTeamInput) {
    return this.scheduleApi.postScheduleTeam(params)
  }
  @Effect()
  getScheduleTeamList(query: GetScheduleTeamListQuery) {
    return this.scheduleApi.getScheduleTeamList(query)
  }
}
