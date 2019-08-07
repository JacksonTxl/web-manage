import { Injectable, ServiceRoute } from 'vue-service-app'
import { State, Computed, Effect } from 'rx-state'
import { pluck, tap } from 'rxjs/operators'
import { Store } from '@/services/store'
import {
  SkillfulApi,
  GetSkillfulListInput,
  DeleteSkillfulInput
} from '@/api/v1/setting/skillful'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SkillfulService {
  resData$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand_shop:coach:good_at|add'
  })
  constructor(
    private skillfulApi: SkillfulApi,
    private authService: AuthService
  ) {}
  getSkillfulList(query: GetSkillfulListInput) {
    return this.skillfulApi.getSkillfulList(query).pipe(
      tap(res => {
        res = this.authService.filter(res)
        this.resData$.commit(() => res)
      })
    )
  }
  deleteSkillful(params: DeleteSkillfulInput) {
    return this.skillfulApi.deleteSkillful(params)
  }
  beforeEach(to: ServiceRoute, from: ServiceRoute) {
    return this.getSkillfulList({ page: to.meta.query.page, size: 100 })
  }
}
