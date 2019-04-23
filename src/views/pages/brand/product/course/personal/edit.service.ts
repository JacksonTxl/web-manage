import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { PersonalApi, GetPersonalBrandInfoInput, SetPersonalBrandInput } from '@/api/v1/course/personal'

interface EditState {
  info: Object
}
@Injectable()
export class EditService extends Store<EditState> {
  state$: State<EditState>
  info$: Computed<Object>
  constructor(protected personalApi: PersonalApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('info')))
  }
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.personalApi.getPersonalBrandInfo(query)
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute, next: any) {
    const course_id = to.meta.query.id || to.query.courseId
    this.getPersonalBrandInfo({ course_id }).subscribe((res) => {
      this.state$.commit(state => {
        if (course_id) {
          res.course_id = course_id
        }
        state.info = res
      })
      next()
    }, () => {
      next(false)
    })
  }
}
