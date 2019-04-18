import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { SkillfulApi, AddSkillfulInput } from '@/api/v1/setting/skillful'

interface AddState {
}
@Injectable()
export class AddService extends Store<AddState> {
  constructor(protected skillfulApi: SkillfulApi) {
    super()
  }
  @Effect()
  addSkillful(params: AddSkillfulInput) {
    return this.skillfulApi.addSkillful(params)
  }
}
