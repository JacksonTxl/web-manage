import { Injectable, ServiceRoute } from 'vue-service-app'
import { State } from 'rx-state'
import { tap } from 'rxjs/operators'
import {
  CoachLevelApi,
  GetCoachLevelListInput,
  DeleteCoachLevelInput
} from '@/api/v1/setting/coach/level'
import { AuthService } from '@/services/auth.service'

@Injectable()
export class CoachLevelService {
  resData$ = new State({})
  auth$ = this.authService.authMap$({
    add: 'brand:setting:coach_level|add',
    get: 'brand:setting:coach_level|list'
  })
  constructor(
    private coachLevelApi: CoachLevelApi,
    private authService: AuthService
  ) {}
  getCoachLevelList(query: GetCoachLevelListInput) {
    return this.coachLevelApi.getCoachLevelList(query).pipe(
      tap((res: any) => {
        this.resData$.commit(() => res)
      })
    )
  }
  deleteCoachLevel(params: DeleteCoachLevelInput) {
    return this.coachLevelApi.deleteCoachLevel(params)
  }
  beforeEach(to: ServiceRoute) {
    return this.getCoachLevelList({ page: to.meta.query.page, size: 20 })
  }
}
