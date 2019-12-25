import { Injectable, ServiceRoute, Controller } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  SkillfulApi,
  GetSkillfulListInput,
  DeleteSkillfulInput
} from '@/api/v1/setting/skillful'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class SkillfulService implements Controller {
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
