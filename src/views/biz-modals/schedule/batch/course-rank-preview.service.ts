import {
  TeamScheduleScheduleApi,
  AddCourseQuery
} from '@/api/v1/schedule/team/schedule'
import { PersonalTeamScheduleScheduleApi } from '@/api/v1/schedule/personal-team/schedule'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { from } from 'rxjs'

@Injectable()
export class CourseRankPreviewService {
  loading$ = new State({})
  constructor(
    private teamApi: TeamScheduleScheduleApi,
    private smallApi: PersonalTeamScheduleScheduleApi
  ) {}
  /**
   * 校验排课
   */
  @Effect()
  validTeamBatch(params: AddCourseQuery) {
    return this.teamApi.validTeamBatch({ course_schedule: params })
  }
  /**
   * 排课
   */
  teamBatch(params: AddCourseQuery) {
    return this.teamApi.teamBatch({ course_schedule: params })
  }
  @Effect()
  validSmallBatch(params: AddCourseQuery) {
    return this.smallApi.validSmallBatch({ course_schedule: params })
  }
  /**
   * 排课
   */
  smallBatch(params: AddCourseQuery) {
    return this.smallApi.smallBatch({ course_schedule: params })
  }
}
