import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { SkillfulApi, UpdateSkillfulInput } from '@/api/v1/setting/skillful'

@Injectable()
export class EditService {
  loading$ = new State({})
  constructor(private skillfulApi: SkillfulApi) {}
  @Effect()
  updateSkillful(params: UpdateSkillfulInput) {
    return this.skillfulApi.updateSkillful(params)
  }
}
