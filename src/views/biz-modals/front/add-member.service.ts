import { UserService } from '@/services/user.service'
import { Injectable } from 'vue-service-app'
import { State, Effect } from 'rx-state'
import { MemberApi, AddUserParams } from '@/api/v1/member'

@Injectable()
export class AddMemberService {
  loading$ = new State({})
  parent_types$ = this.userService.getOptions$('small_course.parent_type')
  constructor(private memberApi: MemberApi, private userService: UserService) {}
  @Effect()
  addMember(params: AddUserParams) {
    return this.memberApi.addUser(params)
  }
}
