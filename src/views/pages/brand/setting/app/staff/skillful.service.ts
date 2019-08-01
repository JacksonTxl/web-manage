import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import { SkillfulApi, GetSkillfulListInput, DeleteSkillfulInput } from '@/api/v1/setting/skillful'
import {
  AuthService
} from '@/services/auth.service'
interface ListState {
  resData: object
}
@Injectable()
export class SkillfulService extends Store<ListState> {
  state$: State<ListState>
  resData$: Computed<object>
  auth$ = this.authService.authMap$({
    add: 'brand_shop:coach:good_at|add'
  })
  constructor(
    private skillfulApi: SkillfulApi,
    private authService: AuthService
  ) {
    super()
    this.state$ = new State({
      resData: {} })
    this.resData$ = new Computed(this.state$.pipe(pluck('resData')))
  }
  getSkillfulList(query: GetSkillfulListInput) {
    return this.skillfulApi.getSkillfulList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.SET_STATE(res)
      })
    )
  }
  deleteSkillful(params: DeleteSkillfulInput) {
    return this.skillfulApi.deleteSkillful(params)
  }
  protected SET_STATE(data: ListState) {
    this.state$.commit(state => {
      state.resData = data
    })
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute, next: any) {
    this.getSkillfulList({ page: to.meta.query.page, size: 100 }).subscribe(() => {
      next()
    }, () => {
      next(false)
    })
  }
}
