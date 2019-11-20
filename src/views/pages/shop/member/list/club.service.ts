import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { MemberApi, CoachParams, CoachQuery, SaleQuery } from '@/api/v1/member'
import { AuthService } from '@/services/auth.service'
import { forkJoin } from 'rxjs'

@Injectable()
export class ClubService implements Controller {
  // 业务状态
  state$ = new State({})
  loading$ = new State({})
  memberListInfo$: Computed<string>
  list$ = new State({})
  page$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'shop:member:member|add',
    import: 'shop:member:member|import',
    tag: 'shop:member:member|tag',
    bindCoach: 'shop:member:member|bind_coach',
    bindSalesman: 'shop:member:member|bind_salesman',
    export: 'shop:member:member|export',
    sale: 'shop:member:member|batch_unbind_saleman',
    coach: 'shop:member:member|batch_unbind_coach'
  })
  constructor(private memberApi: MemberApi, private authService: AuthService) {
    this.state$ = new State({
      memberListInfo: {}
    })
    this.memberListInfo$ = new Computed(
      this.state$.pipe(pluck('memberListInfo'))
    )
  }
  @Effect()
  getListInfo(paramsObj: any) {
    return this.memberApi.getClubMember(paramsObj).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.list$.commit(() => res.list)
        this.page$.commit(() => res.page)
      })
    )
  }
  removeWechatBind(id: number) {
    return this.memberApi.removeWechatBind(id)
  }
  getMemberSourceRegisters() {
    return this.memberApi.getMemberSourceRegisters()
  }
  getSaleList(query: any) {
    return this.memberApi.getSaleList(query)
  }
  getCoachList(query: any) {
    return this.memberApi.getCoachList(query)
  }
  getCrmRule() {
    return this.memberApi.getCrmRule()
  }
  dropCoachSea(params: any) {
    return this.memberApi.dropCoachSea(params)
  }
  dropSalerSea(params: any) {
    return this.memberApi.dropSalerSea(params)
  }
  init(query: any) {
    return forkJoin(this.getListInfo(query))
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query)
  }
}
