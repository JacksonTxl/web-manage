import { TeamScheduleScheduleApi } from '@/api/v1/schedule/team/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class AddEditCourseService {
  loading$ = new State({})
  constructor(private teamApi: TeamScheduleScheduleApi) {}
  /**
   * 获取团课排期信息
   */
  getTeamInfo(id: number) {
    return this.teamApi.getTeamInfo(id)
  }
}
