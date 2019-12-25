import {
  Injectable,
  Controller,
  ServiceRoute,
  ServiceRouter
} from 'vue-service-app'
import { ContractApi, ContractInput } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap } from 'rxjs/operators'
import { State, Effect } from 'rx-state'
import { SN_GENERATE_RULE } from '@/constants/setting/contract'

@Injectable()
export class EditService implements Controller {
  info$ = new State({})
  codeRules$ = new State([])
  codeDemo$ = new State('')
  lawContent$ = new State('')
  loading$ = new State({})
  constructor(
    private contractApi: ContractApi,
    private router: ServiceRouter
  ) {}
  SET_CODE(ruleList: any[], codeDemo: string) {
    this.codeDemo$.commit(() => codeDemo)
    const finalRuleList = ruleList.map(rule => {
      if (rule.sn_generate_rule === SN_GENERATE_RULE.RANDOM) {
        rule._value = 'RANDOM'
      }
      if (rule.sn_generate_rule === SN_GENERATE_RULE.FIXED) {
        rule._value = rule.sn_generate_value
      }
      return rule
    })
    this.codeRules$.commit(() => finalRuleList)
  }
  @Effect()
  getInfo() {
    const id = this.router.to.meta.query.id
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.info$.commit(() => res.info)
      })
    )
  }
  @Effect()
  getCodeInfo() {
    const id = this.router.to.meta.query.id
    return this.contractApi.getCodeInfo(id).pipe(
      tap(res => {
        this.SET_CODE(res.list, res.code.rand_code)
      })
    )
  }
  @Effect()
  getConstitutionInfo() {
    const id = this.router.to.meta.query.id
    return this.contractApi.getConstitutionInfo(id).pipe(
      tap(res => {
        this.lawContent$.commit(() => res.info.brand_law_content || '')
      })
    )
  }
  @Effect()
  updateContract(data: ContractInput) {
    return this.contractApi.update(data)
  }
  @Effect()
  init() {
    return forkJoin(this.getInfo(), this.getConstitutionInfo())
  }
  beforeEach(to: ServiceRoute) {
    return this.init()
  }
}
