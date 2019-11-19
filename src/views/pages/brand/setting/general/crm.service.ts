import { Injectable } from 'vue-service-app'
import { MemberApi, CoachParams, CoachQuery, SaleQuery } from '@/api/v1/member'
import { UserService } from '@/services/user.service'

@Injectable()
export class CrmService {
  constructor(private memberApi: MemberApi, private userService: UserService) {}
  courseType$ = this.userService.getOptions$('member.course_consume_type')
  userUntied$ = this.userService.getOptions$('setting.crm_rules_user_untied')

  getCrmRule() {
    return this.memberApi.getCrmRule()
  }
  SetCrmRule(params: any) {
    return this.memberApi.getCrmRule()
  }
  setCrmRule(params: any) {
    return this.memberApi.setCrmRule(params)
  }
}
