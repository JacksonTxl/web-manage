import { Injectable } from 'vue-service-app'
import { Effect } from 'rx-state'
import { Store } from '@/services/store'
import { SkillfulApi, UpdateSkillfulInput } from '@/api/v1/setting/skillful'

interface EditState {
}
@Injectable()
export class EditService extends Store<EditState> {
  constructor(protected skillfulApi: SkillfulApi) {
    super()
  }
  @Effect()
  updateSkillful(params: UpdateSkillfulInput) {
    return this.skillfulApi.updateSkillful(params)
  }
}
