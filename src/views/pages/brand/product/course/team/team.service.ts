import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'

import { TeamApi, GetTeamCourseDetailQuery, GetTrainPurposeQuery, GetTeamCourseTypeQuery } from '@/api/v1/course/team'

interface SetState { // 注解formData类型
    formData : Object
}
@Injectable()
export class TeamService extends Store<SetState> {
  state$: State<SetState>
  formData$: Computed<Object>

  constructor(protected teamApi : TeamApi) {
    super() // bind this

    this.state$ = new State({
      formData: {}
    })

    this.formData$ = new Computed(this.state$.pipe(pluck('formData')))
  }

  getDetail(query: any) {
    return this.teamApi.getTeamCourseDetail(query)
  }
  @Effect()
  getTrainPurpose(query: GetTrainPurposeQuery) {
    return this.teamApi.getTrainPurpose(query)
  }
  @Effect()
  getTeamCourseType(query: GetTeamCourseTypeQuery) {
    return this.teamApi.getTrainPurpose(query)
  }

  protected SET_PERSONAL_BRND(data: SetState) {
    this.state$.commit(state => {
      state.formData = data
    })
  }
}
