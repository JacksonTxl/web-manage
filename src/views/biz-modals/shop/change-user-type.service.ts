import { Injectable } from 'vue-service-app'
import { MemberApi } from '@/api/v1/member'
import { State } from 'rx-state/src'
import { UserService } from '@/services/user.service'

@Injectable()
export class ChangeUserTypeService {
  loading$ = new State({})
  constructor(private cardsApi: MemberApi, private userService: UserService) {}
  minorsType$ = this.userService.getOptions$('small_course.minors_type')
  parentType$ = this.userService.getOptions$('small_course.parent_type')
  changeUserType(params: any) {
    return this.cardsApi.changeUserType(params)
  }
}
