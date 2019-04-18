import { Injectable } from 'vue-service-app'
import { ContractApi } from '@/api/v1/setting/contract'
import { Store } from '@/services/store'
import { Effect, getSnapshot } from 'rx-state/src'
import { SN_RULE, SN_GENERATE_RULE } from '@/constants/enums/contract'
import { RouteService } from '@/services/route.service'

interface ViewRule {
  sn_rule: number
  _value: any
  sn_pos?: number
  sn_generate_rule?: number
  sn_generate_value?: string | number
}
@Injectable()
export class CodeEditService extends Store<{}> {
  constructor(private contractApi: ContractApi, private route: RouteService) {
    super()
  }
  @Effect()
  updateCode(viewRules: ViewRule[]) {
    const rules = viewRules.map((rule, index) => {
      if (rule._value === 'RANDOM') {
        rule.sn_generate_rule = SN_GENERATE_RULE.RANDOM
        rule.sn_generate_value = ''
      } else {
        rule.sn_generate_rule = SN_GENERATE_RULE.FIXED
        rule.sn_generate_value = rule._value
      }
      rule.sn_pos = index + 1
      return rule
    })
    const query = this.route.query$.snapshot()
    return this.contractApi.updateCode({
      id: query.id,
      rules
    })
  }
}
