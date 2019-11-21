import { Injectable, Controller, ServiceRoute } from 'vue-service-app'
import { State, Effect } from 'rx-state'
// import { AuthService } from '@/services/auth.service'
import { GroupBuyApi } from '@/api/v1/marketing/group_buy'
import { tap } from 'rxjs/operators'
import { anyAll } from '@/operators'

@Injectable()
export class EditPersonalService implements Controller {
  info$ = new State({})
  coach$ = new State({})
  constructor(private groupBuyApi: GroupBuyApi) {}
  getCoachList(params: { id: number }) {
    return this.groupBuyApi.getCoachList(params).pipe(
      tap((res: any) => {
        console.log(res)
        this.coach$.commit(() => res.list)
      })
    )
  }
  @Effect()
  init(params: any) {
    return anyAll(this.getCoachList(params))
  }
  beforeRouteEnter(to: ServiceRoute, from: ServiceRoute) {
    return this.init(to.meta.query.id)
  }
}
