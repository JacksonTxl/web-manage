import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { PersonalApi, GetPersonalBrandInfoInput, SetPersonalBrandInput } from '@/api/v1/course/personal'

interface SetState {
  info: Object
}
@Injectable()
export class SetService extends Store<SetState> {
  state$: State<SetState>
  info$: Computed<Object>
  constructor(protected personalApi: PersonalApi) {
    super()
    this.state$ = new State({
      info: {}
    })
    this.info$ = new Computed(this.state$.pipe(pluck('formData')))
  }
  getPersonalBrandInfo(query: GetPersonalBrandInfoInput) {
    return this.personalApi.getPersonalBrandInfo(query).pipe(
      tap(res => {
        this.SET_PERSONAL_BRND(res)
      })
    )
  }
  @Effect()
  addPersonalBrand(params: SetPersonalBrandInput) {
    return this.personalApi.addPersonalBrand(params)
  }
  protected SET_PERSONAL_BRND(data: SetState) {
    this.state$.commit(state => {
      state.info = data
    })
  }
}
