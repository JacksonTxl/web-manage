
import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  BrandTeamCourseApi,
  GetUpdateInfoInput
} from '@/api/v1/course/team/brand'
interface SetState {
  info: Object
}
@Injectable()
export class EditService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<Object>
  constructor(private courseApi: BrandTeamCourseApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getUpdateInfo(query: GetUpdateInfoInput) {
    return this.courseApi.getUpdateInfo(query).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
        })
      })
    )
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    const query = {
      course_id: to.meta.query.id
    }
    return this.getUpdateInfo(query)
  }
}
