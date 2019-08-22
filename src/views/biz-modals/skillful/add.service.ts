import { Injectable } from 'vue-service-app'
import { Effect, State } from 'rx-state'
import { SkillfulApi, AddSkillfulInput } from '@/api/v1/setting/skillful'

interface AddState {}
@Injectable()
export class AddService {
  loading$ = new State({})
  constructor(protected skillfulApi: SkillfulApi) {}
  @Effect()
  addSkillful(params: AddSkillfulInput) {
    return this.skillfulApi.addSkillful(params)
  }
}
