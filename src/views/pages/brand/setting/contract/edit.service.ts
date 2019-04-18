import { Injectable, RouteGuard, ServiceRoute } from 'vue-service-app'
import { ContractApi, ContractInput } from '@/api/v1/setting/contract'
import { forkJoin } from 'rxjs'
import { tap, pluck, map } from 'rxjs/operators'
import { State, log, Computed, Effect } from 'rx-state/src'
import { Store } from '@/services/store'
import { RouteService } from '@/services/route.service'
import { SN_GENERATE_RULE } from '@/constants/enums/contract'
import { LayoutBrandService } from '@/services/layouts/layout-brand.service'

interface EditState {
  info: any
  lawContent: string
  codeRules: any[]
  codeDemo: string
}
@Injectable()
export class EditService extends Store<EditState> implements RouteGuard {
  state$: State<EditState>
  info$: Computed<any>
  lawContent$: Computed<string>
  codeRules$: Computed<any[]>
  codeDemo$: Computed<string>
  constructor(
    private contractApi: ContractApi,
    private route: RouteService,
    private layoutBrand: LayoutBrandService
  ) {
    super()
    this.state$ = new State({
      info: {},
      lawContent: '',
      codeRules: [],
      codeDemo: ''
    })
    this.info$ = new Computed(
      this.state$.pipe(
        pluck('info'),
        log('contract/info')
      )
    )
    this.lawContent$ = new Computed(
      this.state$.pipe(
        pluck('lawContent'),
        log('contract/lawContent')
      )
    )
    this.codeRules$ = new Computed(
      this.state$.pipe(
        pluck('codeRules'),
        log('contract/codeRules')
      )
    )
    this.codeDemo$ = new Computed(
      this.state$.pipe(
        pluck('codeDemo'),
        log('contract/codeDemo')
      )
    )
  }
  SET_CODE(ruleList: any[], codeDemo: string) {
    this.state$.commit(state => {
      state.codeDemo = codeDemo
      state.codeRules = ruleList.map(rule => {
        if (rule.sn_generate_rule === SN_GENERATE_RULE.RANDOM) {
          rule._value = 'RANDOM'
        }
        if (rule.sn_generate_rule === SN_GENERATE_RULE.FIXED) {
          rule._value = rule.sn_generate_value
        }
        return rule
      })
    })
  }
  @Effect()
  getInfo() {
    const id = this.route.query$.snapshot().id
    return this.contractApi.getInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.info = res.info
        })
      })
    )
  }
  @Effect()
  getCodeInfo() {
    const id = this.route.query$.snapshot().id
    return this.contractApi.getCodeInfo(id).pipe(
      tap(res => {
        this.SET_CODE(res.list, res.code.rand_code)
      })
    )
  }
  @Effect()
  getConstitutionInfo() {
    const id = this.route.query$.snapshot().id
    return this.contractApi.getConstitutionInfo(id).pipe(
      tap(res => {
        this.state$.commit(state => {
          state.lawContent = res.info.brand_law_content || ''
        })
      })
    )
  }
  @Effect()
  updateContract(data: ContractInput) {
    return this.contractApi.update(data)
  }
  @Effect()
  init() {
    return forkJoin(
      this.getInfo(),
      this.getConstitutionInfo(),
      this.getCodeInfo()
    )
  }
  initPageBreadcrumbs() {
    this.layoutBrand.SET_BREADCRUMBS([
      {
        label: '合同模版列表',
        route: { name: 'brand-setting-contract-list' }
      },
      {
        label: `合同预览`,
        route: { name: 'brand-setting-contract-edit' }
      }
    ])
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.init().subscribe(
      () => {
        this.initPageBreadcrumbs()
        next()
      },
      () => next()
    )
  }
}
