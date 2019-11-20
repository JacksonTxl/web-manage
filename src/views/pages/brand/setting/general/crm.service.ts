import { Injectable } from 'vue-service-app'
import { MemberApi, CoachParams, CoachQuery, SaleQuery } from '@/api/v1/member'
import { UserService } from '@/services/user.service'
import { State, Effect } from 'rx-state'
import { tap } from 'rxjs/operators'

@Injectable()
export class CrmService {
  crmRule$ = new State({
    sales_is_limit: 0,
    coach_is_limit: 0,
    coach_is_protect: 0,
    sales_is_protect: 0,
    coach_untie_condition: [],
    sales_is_protect_limit: 0,
    sales_follow_rule: 1,
    coach_is_protect_limit: 0,
    coach_follow_rule: 1
  })
  loading$ = new State({})
  constructor(private memberApi: MemberApi, private userService: UserService) {}
  courseType$ = this.userService.getOptions$('member.course_consume_type')
  userUntied$ = this.userService.getOptions$('setting.crm_rules_user_untied')

  getCrmRule() {
    return this.memberApi.getCrmRule().pipe(
      tap((res: any) => {
        this.crmRule$.commit(() => res)
      })
    )
  }
  @Effect()
  setCrmRule(params: any) {
    return this.memberApi.setCrmRule(params)
  }
  beforeEach() {
    return this.getCrmRule()
  }
}
