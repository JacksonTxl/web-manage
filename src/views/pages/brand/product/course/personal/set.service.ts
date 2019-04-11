import { Injectable } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck } from 'rxjs/operators'
import { Store } from '@/services/store'
import { PersonalApi, GetPersonalBrandInput, SetPersonalBrandInput } from '@/api/v1/course/personal'

interface SetState {
  formData: Object
}
@Injectable()
export class SetService extends Store<SetState> {
  state$: State<SetState>
  formData$: Computed<Object>
  constructor(protected personalApi: PersonalApi) {
    super()
    this.state$ = new State({
      formData: {}
    })
    this.formData$ = new Computed(this.state$.pipe(pluck('formData')))
  }
  getPersonalBrandInfo(query: GetPersonalBrandInput) {
    return this.personalApi.getPersonalBrandInfo(query)
  }
  @Effect()
  addPersonalBrand(params: SetPersonalBrandInput) {
    return this.personalApi.addPersonalBrand(params)
  }
  protected SET_PERSONAL_BRND(data: SetState) {
    this.state$.commit(state => {
      state.formData = data
    })
  }
}
