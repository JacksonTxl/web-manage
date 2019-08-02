import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MemberApi, AddUserParams } from '@/api/v1/member'

@Injectable()
export class AddMemberService {
  loading$ = new State({})
  constructor(private memberApi: MemberApi) {}
  @Effect()
  addMember(params: AddUserParams) {
    return this.memberApi.addUser(params)
  }
}
