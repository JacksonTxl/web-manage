import { MemberAPi, AddUserParams } from '../../../api/v1/member'
import { Injectable } from 'vue-service-app'

@Injectable()
export class AddUserService {
  constructor(protected memberapi: MemberAPi) {}
  // 提交添加用户
  addUser(params: AddUserParams) {
    return this.memberapi.addUser(params)
  }
}
